const jwt = require('jsonwebtoken');
const User = require('../../models/user/userModel');
const sendSms = require('../../utils/sendSms');

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
      return res.status(400).json({ message: 'Sahi 10 digit ka mobile number daalo' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await User.findOneAndUpdate(
      { phone },
      { otp, otpExpiry },
      { upsert: true, new: true }
    );

    await sendSms(phone, 'Your O Positive Health OTP is ' + otp);

    res.json({ message: 'OTP bhej diya gaya' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Mobile number aur OTP dono daalo' });
    }

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'OTP galat hai' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expire ho gaya' });
    }

    user.otp = '';
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: { id: user._id, phone: user.phone, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendOtp, verifyOtp };