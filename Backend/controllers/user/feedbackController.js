const Feedback = require('../../models/user/feedbackModel');

const addFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;
    const ratingNumber = Number(rating);

    if (!ratingNumber || ratingNumber < 1 || ratingNumber > 5) {
      return res.status(400).json({ message: 'Pehle rating chuno' });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      rating: ratingNumber,
      message: message ? message.trim() : '',
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addFeedback };