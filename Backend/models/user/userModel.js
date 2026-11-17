const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    otp: { type: String, default: '' },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);