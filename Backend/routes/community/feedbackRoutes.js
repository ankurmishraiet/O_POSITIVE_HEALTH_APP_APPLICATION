const express = require("express");
const router = express.Router();

const {
  createFeedback,
} = require("../../controllers/community/feedbackController");
const {
  getAllFeedback,
  deleteFeedback,
} = require("../../controllers/admin/feedbackAdController");

// User login middleware
const { userProtect } = require("../../middleware/userProtect");

// Admin middleware: apne project me jo adminRoutes.js me use hota hai wahi import karo.
// Naam aur path example hai, apne hisaab se badlo.
const { protect } = require("../../middleware/authMiddleware");

// ---------- User ----------
// POST /api/community/feedback
router.post("/feedback", userProtect, createFeedback);

// ---------- Admin ----------
// GET    /api/community/admin/feedback?page=1&limit=10&rating=5
// DELETE /api/community/admin/feedback/:id
router.get("/admin/feedback",getAllFeedback);
router.delete("/admin/feedback/:id",deleteFeedback);

module.exports = router;