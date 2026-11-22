const express = require("express");
const router = express.Router();

const {
  createAppointment,
  adminList,
  adminUpdate,
  adminDelete,
} = require("../../controllers/appointments/appointmentController");

// const { protectAdmin } = require("../../middleware/authMiddleware");

// Public (mobile app)
router.post("/", createAppointment);

// Admin (live jaane se pehle protectAdmin lagao)
router.get("/admin/all", adminList);
router.patch("/admin/:id", adminUpdate);
router.delete("/admin/:id", adminDelete);

module.exports = router;