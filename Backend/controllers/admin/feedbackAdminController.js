const Feedback = require('../../models/user/feedbackModel');

const getFeedbacks = async (req, res) => {
  try {
    const items = await Feedback.find()
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    const total = items.length;
    const sum = items.reduce((acc, item) => acc + item.rating, 0);
    const average = total ? Number((sum / total).toFixed(1)) : 0;

    res.json({ total, average, items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFeedbacks };