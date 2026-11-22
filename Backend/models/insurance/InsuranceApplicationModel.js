
const mongoose = require("mongoose");

const insuranceApplicationSchema = new mongoose.Schema(
  {
    policyHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    treatmentCondition: {
      type: String,
      required: true,
      trim: true,
    },

    insuranceType: {
      type: String,
      required: true,
      trim: true,
    },

    insuranceDocument: {
      type: String,
      default: null,
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

const InsuranceApplication = mongoose.model(
  "InsuranceApplication",
  insuranceApplicationSchema
);

module.exports = InsuranceApplication;
