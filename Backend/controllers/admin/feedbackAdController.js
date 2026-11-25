const Feedback = require("../../models/community/Feedback");

// GET /api/admin/feedback?page=1&limit=10&rating=5
exports.getAllFeedback = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const rating = Number(req.query.rating);

    const filter = {};
    if (Number.isInteger(rating) && rating >= 1 && rating <= 5) {
      filter.rating = rating;
    }

    const [items, total, stats] = await Promise.all([
      Feedback.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Feedback.countDocuments(filter),
      Feedback.aggregate([
        { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
      ]),
    ]);

    return res.status(200).json({
      feedback: items,
      total,
      page,
      pages: Math.ceil(total / limit),
      averageRating: stats[0] ? Number(stats[0].avg.toFixed(1)) : 0,
      totalFeedback: stats[0] ? stats[0].count : 0,
    });
  } catch (err) {
    console.error("getAllFeedback error:", err);
    return res.status(500).json({ message: "Unable to load feedback." });
  }
};

// DELETE /api/admin/feedback/:id  (optional)
exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found." });
    return res.status(200).json({ message: "Feedback deleted." });
  } catch (err) {
    console.error("deleteFeedback error:", err);
    return res.status(500).json({ message: "Unable to delete feedback." });
  }
};