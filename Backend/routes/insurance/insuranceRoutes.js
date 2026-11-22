const express = require("express");
const router = express.Router();

const {
  createInsuranceApplication,
  getAllInsuranceApplications,
  getInsuranceApplicationById,
  updateInsuranceStatus,
} = require("../../controllers/insurance/insuranceController");

const upload = require("../../middleware/uploadMiddleware");

// const { protectAdmin } = require("../../middleware/authMiddleware");

// TEMPORARY debug logger: remove once uploads work
const logUploadRequest = (req, res, next) => {
  console.log("---- /apply request ----");
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  console.log("CONTENT-LENGTH:", req.headers["content-length"]);
  next();
};

// Public: mobile app submits the form
router.post(
  "/apply",
  logUploadRequest,
  upload.single("insuranceDocument"),
  (req, res, next) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    next();
  },
  createInsuranceApplication
);

// Admin routes (no auth for now)
router.get("/", getAllInsuranceApplications);
router.get("/:id", getInsuranceApplicationById);
router.patch("/:id/status", updateInsuranceStatus);

module.exports = router;