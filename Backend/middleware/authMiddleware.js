const jwt = require('jsonwebtoken');
const Admin = require('../models/auth/authModel');

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Login zaruri hai' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Admin nahi mila' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token galat hai ya expire ho gaya' });
  }
};

module.exports = { protect };