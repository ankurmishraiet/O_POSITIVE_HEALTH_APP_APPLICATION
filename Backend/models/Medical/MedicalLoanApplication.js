
const mongoose = require("mongoose");

const medicalLoanApplicationSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },

    treatmentCondition: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    applicationStatus: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },

    adminRemarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const MedicalLoanApplication = mongoose.model(
  "MedicalLoanApplication",
  medicalLoanApplicationSchema
);

module.exports = MedicalLoanApplication;
