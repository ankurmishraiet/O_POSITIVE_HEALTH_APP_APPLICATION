const CommunityQuestion = require("../../models/community/CommunityQuestion");
const { CATEGORIES } = require("../../models/community/CommunityQuestion");

const MAX_FEED_ANSWERS = 3;

/* ----------------------------- helpers ----------------------------- */

// Wraps handlers so errors become clean JSON responses
const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
    console.error("Community error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

// Expert answers first, then most liked, then oldest
const sortAnswers = (answers = []) =>
  [...answers].sort((a, b) => {
    if (a.isExpert !== b.isExpert) return a.isExpert ? -1 : 1;
    const likeDiff = (b.likedBy?.length || 0) - (a.likedBy?.length || 0);
    if (likeDiff) return likeDiff;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

const formatAnswer = (a, viewerId) => ({
  id: a._id,
  authorName: a.authorName,
  isExpert: a.isExpert,
  text: a.text,
  likeCount: a.likedBy.length,
  isLiked: !!viewerId && a.likedBy.includes(viewerId),
  createdAt: a.createdAt,
});

// Never leaks authorId / helpfulBy / likedBy arrays to the client
const formatQuestion = (q, viewerId, { allAnswers = false } = {}) => {
  const sorted = sortAnswers(q.answers);
  const shown = allAnswers ? sorted : sorted.slice(0, MAX_FEED_ANSWERS);

  return {
    id: q._id,
    authorName: q.authorName,
    category: q.category,
    question: q.question,
    status: q.status,
    createdAt: q.createdAt,
    helpfulCount: q.helpfulBy.length,
    isHelpful: !!viewerId && q.helpfulBy.includes(viewerId),
    isMine: !!viewerId && q.authorId === viewerId,
    answerCount: q.answers.length,
    answers: shown.map((a) => formatAnswer(a, viewerId)),
  };
};

const getPaging = (query) => ({
  page: Math.max(parseInt(query.page) || 1, 1),
  limit: Math.min(parseInt(query.limit) || 10, 30),
});

/* ------------------------------ public ------------------------------ */

// GET /api/community/questions?tab=feed|mine&category=&page=&limit=&authorId=
const getQuestions = handle(async (req, res) => {
  const { page, limit } = getPaging(req.query);
  const { tab = "feed", category, authorId } = req.query;

  let filter;

  if (tab === "mine") {
    if (!authorId) {
      return res
        .status(400)
        .json({ success: false, message: "authorId is required" });
    }
    // Own questions stay visible even while pending review
    filter = { authorId, status: { $ne: "rejected" } };
  } else {
    filter = { status: "approved" };
  }

  if (category && CATEGORIES.includes(category)) filter.category = category;

  const [docs, total] = await Promise.all([
    CommunityQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    CommunityQuestion.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: docs.map((q) => formatQuestion(q, authorId)),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// GET /api/community/questions/:id?authorId=
const getQuestionById = handle(async (req, res) => {
  const { authorId } = req.query;
  const q = await CommunityQuestion.findById(req.params.id);

  if (!q || (q.status !== "approved" && q.authorId !== authorId)) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  return res.status(200).json({
    success: true,
    data: formatQuestion(q, authorId, { allAnswers: true }),
  });
});

// POST /api/community/questions
const createQuestion = handle(async (req, res) => {
  const { authorId, authorName, category, question } = req.body;

  if (!authorId) {
    return res
      .status(400)
      .json({ success: false, message: "authorId is required" });
  }

  const text = (question || "").trim();
  if (text.length < 10 || text.length > 500) {
    return res.status(400).json({
      success: false,
      message: "Question must be between 10 and 500 characters",
    });
  }

  if (!CATEGORIES.includes(category)) {
    return res
      .status(400)
      .json({ success: false, message: "Please select a valid category" });
  }

  const q = await CommunityQuestion.create({
    authorId,
    authorName: (authorName || "").trim() || "Guest",
    category,
    question: text,
    status: process.env.COMMUNITY_MODERATION === "on" ? "pending" : "approved",
  });

  return res.status(201).json({
    success: true,
    message:
      q.status === "pending"
        ? "Your question was submitted and will appear after review."
        : "Your question has been posted.",
    data: formatQuestion(q, authorId, { allAnswers: true }),
  });
});

// POST /api/community/questions/:id/helpful   body: { authorId }
const toggleHelpful = handle(async (req, res) => {
  const { authorId } = req.body;
  if (!authorId) {
    return res
      .status(400)
      .json({ success: false, message: "authorId is required" });
  }

  const q = await CommunityQuestion.findOne({
    _id: req.params.id,
    status: "approved",
  });
  if (!q) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  if (q.helpfulBy.includes(authorId)) q.helpfulBy.pull(authorId);
  else q.helpfulBy.addToSet(authorId);

  await q.save();

  return res
    .status(200)
    .json({ success: true, data: formatQuestion(q, authorId) });
});

// POST /api/community/questions/:id/answers   body: { authorId, authorName, text }
const addAnswer = handle(async (req, res) => {
  const { authorId, authorName, text } = req.body;

  const answerText = (text || "").trim();
  if (answerText.length < 5 || answerText.length > 3000) {
    return res.status(400).json({
      success: false,
      message: "Answer must be between 5 and 3000 characters",
    });
  }

  const q = await CommunityQuestion.findOne({
    _id: req.params.id,
    status: "approved",
  });
  if (!q) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  q.answers.push({
    authorId: authorId || null,
    authorName: (authorName || "").trim() || "Guest",
    text: answerText,
    isExpert: false, // public endpoint can never create expert answers
  });

  await q.save();

  return res.status(201).json({
    success: true,
    message: "Your answer has been posted.",
    data: formatQuestion(q, authorId, { allAnswers: true }),
  });
});

// POST /api/community/questions/:id/answers/:answerId/like   body: { authorId }
const toggleAnswerLike = handle(async (req, res) => {
  const { authorId } = req.body;
  if (!authorId) {
    return res
      .status(400)
      .json({ success: false, message: "authorId is required" });
  }

  const q = await CommunityQuestion.findOne({
    _id: req.params.id,
    status: "approved",
  });
  const answer = q?.answers.id(req.params.answerId);

  if (!q || !answer) {
    return res
      .status(404)
      .json({ success: false, message: "Answer not found" });
  }

  if (answer.likedBy.includes(authorId)) answer.likedBy.pull(authorId);
  else answer.likedBy.addToSet(authorId);

  await q.save();

  return res.status(200).json({
    success: true,
    data: formatQuestion(q, authorId, { allAnswers: true }),
  });
});

/* ------------------------------- admin ------------------------------- */
// Add protectAdmin to these routes when you secure the admin API.

// GET /api/community/admin/questions?status=&search=&page=&limit=
const adminListQuestions = handle(async (req, res) => {
  const { page, limit } = getPaging(req.query);
  const { status, search } = req.query;

  const filter = {};
  if (["pending", "approved", "rejected"].includes(status)) filter.status = status;
  if (search) {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ question: regex }, { authorName: regex }, { category: regex }];
  }

  const [docs, total] = await Promise.all([
    CommunityQuestion.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    CommunityQuestion.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: docs.map((q) => formatQuestion(q, null, { allAnswers: true })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// POST /api/community/admin/questions/:id/answers   body: { text, authorName? }
const adminAddExpertAnswer = handle(async (req, res) => {
  const text = (req.body.text || "").trim();
  if (text.length < 5 || text.length > 3000) {
    return res.status(400).json({
      success: false,
      message: "Answer must be between 5 and 3000 characters",
    });
  }

  const q = await CommunityQuestion.findById(req.params.id);
  if (!q) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  q.answers.push({
    authorId: "admin",
    authorName: (req.body.authorName || "").trim() || "O Positive Health Team",
    text,
    isExpert: true,
  });

  await q.save();

  return res.status(201).json({
    success: true,
    data: formatQuestion(q, null, { allAnswers: true }),
  });
});

// PATCH /api/community/admin/questions/:id/status   body: { status }
const adminUpdateStatus = handle(async (req, res) => {
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be pending, approved or rejected",
    });
  }

  const q = await CommunityQuestion.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!q) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  return res.status(200).json({
    success: true,
    data: formatQuestion(q, null, { allAnswers: true }),
  });
});

// DELETE /api/community/admin/questions/:id
const adminDeleteQuestion = handle(async (req, res) => {
  const q = await CommunityQuestion.findByIdAndDelete(req.params.id);

  if (!q) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  return res.status(200).json({ success: true, message: "Question deleted" });
});

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  toggleHelpful,
  addAnswer,
  toggleAnswerLike,
  adminListQuestions,
  adminAddExpertAnswer,
  adminUpdateStatus,
  adminDeleteQuestion,
};