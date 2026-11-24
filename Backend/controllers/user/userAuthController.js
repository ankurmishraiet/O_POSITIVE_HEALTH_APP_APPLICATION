const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user/userModel');
const sendEmail = require('../../utils/sendEmail');

// Token banane ka chhota helper
const makeToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Password kam se kam 8 akshar ka ho, usme letter aur number dono hon
const isStrongPassword = (password) =>
  password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);

const PASSWORD_RULE_MESSAGE =
  'Password kam se kam 8 akshar ka ho, usme letter aur number dono hon';

// ---------- SIGN UP ----------
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Naam, email aur password teeno daalo' });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: PASSWORD_RULE_MESSAGE });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(400).json({ message: 'Is email se account pehle se hai' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      token: makeToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------- LOGIN ----------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email aur password daalo' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Email ya password galat hai' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Email ya password galat hai' });
    }

    res.json({
      token: makeToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------- FORGOT PASSWORD: email par OTP bhejo ----------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email daalo' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'Is email se koi account nahi mila' });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    user.resetCode = code;
    user.resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(
      user.email,
      'O Positive Health - Password reset OTP',
      'Your OTP is ' + code + '. It is valid for 10 minutes.'
    );

    res.json({ message: 'OTP aapke email par bhej diya gaya' });
  } catch (err) {
    console.log('FORGOT PASSWORD ERROR:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------- RESET PASSWORD: OTP check karke naya password ----------
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP aur naya password daalo' });
    }
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: PASSWORD_RULE_MESSAGE });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.resetCode || user.resetCode !== otp) {
      return res.status(400).json({ message: 'OTP galat hai' });
    }
    if (user.resetCodeExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expire ho gaya' });
    }

    // Naya password purane jaisa nahi hona chahiye
    if (user.password && (await bcrypt.compare(newPassword, user.password))) {
      return res.status(400).json({ message: 'Naya password purane se alag rakho' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCode = '';
    user.resetCodeExpiry = undefined;
    await user.save();

    res.json({ message: 'Password badal gaya, ab login karo' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };