const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialization: { type: String, trim: true },
  qualification: { type: String, trim: true },
  experience: { type: Number, default: 0 }, // years
  rating: { type: Number, default: 0 },
  image: { type: String, default: "" }, // image URL
  hospital: { type: String, trim: true },
});

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  logo: { type: String, default: "" }, // image URL
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
});

const conditionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    icon: { type: String, default: "medkit" }, // Ionicons name (fallback)
    iconUrl: { type: String, default: "" }, // optional image URL
    overview: { type: String, default: "" },
    symptoms: [{ type: String }],
    treatments: [{ type: String }],
    doctors: [doctorSchema],
    hospitals: [hospitalSchema],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Mongoose v7+ mein `next` nahi milta, isliye function bina next ke hai
conditionSchema.pre("validate", function () {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

module.exports = mongoose.model("Condition", conditionSchema);