const InsuranceApplication = require("../../models/insurance/InsuranceApplicationModel");

const ALLOWED_STATUSES = ["pending", "in_review", "approved", "rejected", "contacted"];

// PUBLIC: Submit Insurance Application (from mobile app)
const createInsuranceApplication = async (req, res) => {
  try {
    const { policyHolderName, city, treatmentCondition, insuranceType, userId } =
      req.body;

    if (!policyHolderName || !city || !treatmentCondition || !insuranceType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const application = await InsuranceApplication.create({
      policyHolderName,
      city,
      treatmentCondition,
      insuranceType,
      userId: userId || null,
      // Save only the filename so the dashboard can build /uploads/<filename>
      insuranceDocument: req.file ? req.file.filename : null,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Insurance application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Insurance Application Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit insurance application",
      error: error.message,
    });
  }
};

// ADMIN: List applications (?status=pending&search=rahul&page=1&limit=20)
const getAllInsuranceApplications = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const { status, search } = req.query;

    const filter = {};
    if (status && ALLOWED_STATUSES.includes(status)) filter.status = status;
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { policyHolderName: regex },
        { city: regex },
        { treatmentCondition: regex },
      ];
    }

    const [data, total] = await Promise.all([
      InsuranceApplication.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      InsuranceApplication.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Get Insurance Applications Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch insurance applications",
    });
  }
};

// ADMIN: Get one application
const getInsuranceApplicationById = async (req, res) => {
  try {
    const application = await InsuranceApplication.findById(req.params.id);

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
const updateInsuranceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const application = await InsuranceApplication.findByIdAndUpdate(
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
  createInsuranceApplication,
  getAllInsuranceApplications,
  getInsuranceApplicationById,
  updateInsuranceStatus,
};