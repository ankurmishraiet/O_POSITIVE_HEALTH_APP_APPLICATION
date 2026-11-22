const User = require('../../models/user/userModel');

const getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    phone: req.user.phone,
    name: req.user.name,
    email: req.user.email,
  });
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Naam daalna zaruri hai' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Sahi email daalo' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim(), email: email.trim() },
      { new: true }
    );

    res.json({
      user: { id: user._id, phone: user.phone, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };