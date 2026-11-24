const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Login email + password se hoga
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    name: { type: String, default: '' },

    // Mobile number ab optional hai
    phone: { type: String },

    // Forgot password ka OTP (email par jayega)
    resetCode: { type: String, default: '' },
    resetCodeExpiry: { type: Date },

    // Purane OTP fields (abhi hataye nahi)
    otp: { type: String, default: '' },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);