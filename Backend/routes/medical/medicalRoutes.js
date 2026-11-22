const express = require("express");
const router = express.Router();

const {
  createMedicalLoanApplication,
  getAllMedicalLoanApplications,
  getMedicalLoanApplicationById,
  updateMedicalLoanStatus,
} = require("../../controllers/medical/medicalLoanController");

// const { protectAdmin } = require("../../middleware/authMiddleware");

// Public: mobile app submits the form
router.post("/apply", createMedicalLoanApplication);

// Admin only
router.get("/", getAllMedicalLoanApplications);
router.get("/:id", getMedicalLoanApplicationById);
router.patch("/:id/status",updateMedicalLoanStatus);

module.exports = router;