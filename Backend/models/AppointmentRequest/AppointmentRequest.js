const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 120 },
    email: { type: String, trim: true, lowercase: true, default: "" },
    preferredDate: { type: String, default: "Flexible" }, // Today / Tomorrow / Within a week / Flexible
    preferredTime: { type: String, default: "Any time" }, // Morning / Afternoon / Evening / Any time
    message: { type: String, trim: true, maxlength: 500, default: "" },

    // Kis cheez ke liye book kiya
    conditionId: { type: mongoose.Schema.Types.ObjectId, ref: "Condition" },
    conditionName: { type: String, default: "" },
    doctorName: { type: String, default: "" },
    hospitalName: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed", "cancelled"],
      default: "pending",
      index: true,
    },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);