const express = require("express");
const router = express.Router();

const {
  createAppointment,
  myAppointments,
  adminList,
  adminUpdate,
  adminDelete,
} = require("../../controllers/appointments/appointmentController");

// const { protectAdmin } = require("../../middleware/authMiddleware");
const { userProtect } = require("../../middleware/userProtect");

// Public (mobile app)
router.post("/", createAppointment);

// User (login zaruri), sirf apni requests
router.get("/my", userProtect, myAppointments);

// Admin (live jaane se pehle protectAdmin lagao)
router.get("/admin/all", adminList);
router.patch("/admin/:id", adminUpdate);
router.delete("/admin/:id", adminDelete);

module.exports = router;