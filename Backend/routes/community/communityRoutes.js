const express = require("express");
const router = express.Router();

const {
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
} = require("../../controllers/community/communityController");

// const { protectAdmin } = require("../../middleware/authMiddleware");

// Public: used by the mobile app
router.get("/questions", getQuestions);
router.post("/questions", createQuestion);
router.get("/questions/:id", getQuestionById);
router.post("/questions/:id/helpful", toggleHelpful);
router.post("/questions/:id/answers", addAnswer);
router.post("/questions/:id/answers/:answerId/like", toggleAnswerLike);

// Admin (no auth for now. Add protectAdmin before going live)
router.get("/admin/questions", adminListQuestions);
router.post("/admin/questions/:id/answers", adminAddExpertAnswer);
router.patch("/admin/questions/:id/status", adminUpdateStatus);
router.delete("/admin/questions/:id", adminDeleteQuestion);

module.exports = router;