const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    qualification: { type: String, default: '', trim: true }, // jaise MBBS, MD
    hospital: { type: String, default: '', trim: true },
    experience: { type: Number, default: 0 },
    fees: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 }, // 0 se 5
    city: { type: String, default: '', trim: true },
    photo: { type: String, default: '' },
    about: { type: String, default: '' },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;