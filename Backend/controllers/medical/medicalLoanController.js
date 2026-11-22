const MedicalLoanApplication = require("../../models/Medical/MedicalLoanApplication");

const ALLOWED_STATUSES = ["pending", "in_review", "approved", "rejected", "contacted"];

// PUBLIC: Submit Medical Loan Application (from mobile app)
const createMedicalLoanApplication = async (req, res) => {
  try {
    const { patientName, city, monthlyIncome, treatmentCondition, userId } =
      req.body;

    if (
      !patientName ||
      !city ||
      monthlyIncome === undefined ||
      monthlyIncome === "" ||
      !treatmentCondition
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const income = Number(monthlyIncome);

    if (!Number.isFinite(income) || income < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid monthly income",
      });
    }

    const application = await MedicalLoanApplication.create({
      patientName,
      city,
      monthlyIncome: income,
      treatmentCondition,
      userId: userId || null,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Medical loan application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Medical Loan Application Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit medical loan application",
      error: error.message,
    });
  }
};

// ADMIN: List applications (?status=pending&search=rahul&page=1&limit=20)
const getAllMedicalLoanApplications = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const { status, search } = req.query;

    const filter = {};
    if (status && ALLOWED_STATUSES.includes(status)) filter.status = status;
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { patientName: regex },
        { city: regex },
        { treatmentCondition: regex },
      ];
    }

    const [data, total] = await Promise.all([
      MedicalLoanApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      MedicalLoanApplication.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Get Medical Loan Applications Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch medical loan applications",
    });
  }
};

// ADMIN: Get one application
const getMedicalLoanApplicationById = async (req, res) => {
  try {
    const application = await MedicalLoanApplication.findById(req.params.id);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    return res.status(200).json({ success: true, data: application });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid application id" });
  }
};

// ADMIN: Update status
const updateMedicalLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const application = await MedicalLoanApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    return res.status(200).json({ success: true, data: application });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid application id" });
  }
};

module.exports = {
  createMedicalLoanApplication,
  getAllMedicalLoanApplications,
  getMedicalLoanApplicationById,
  updateMedicalLoanStatus,
};