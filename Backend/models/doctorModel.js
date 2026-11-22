const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    hospital: { type: String, default: '', trim: true },
    experience: { type: Number, default: 0 },
    fees: { type: Number, default: 0 },
    city: { type: String, default: '', trim: true },
    photo: { type: String, default: '' },
    about: { type: String, default: '' },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;