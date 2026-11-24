const jwt = require('jsonwebtoken');
const User = require('../models/user/userModel');

const userProtect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Login zaruri hai' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -resetCode -resetCodeExpiry -otp -otpExpiry');
    if (!user) {
      return res.status(401).json({ message: 'User nahi mila' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token galat hai ya expire ho gaya' });
  }
};

module.exports = { userProtect };