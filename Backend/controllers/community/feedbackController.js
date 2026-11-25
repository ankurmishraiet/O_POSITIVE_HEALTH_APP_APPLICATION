const Feedback = require("../../models/community/Feedback");

// POST /community/feedback
exports.createFeedback = async (req, res) => {
  try {
    const rating = Number(req.body.rating);
    const message = (req.body.message || "").trim();

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Please select a rating from 1 to 5." });
    }
    if (message.length < 5) {
      return res.status(400).json({ message: "Please write at least 5 characters." });
    }

    // Name always comes from the logged-in user (token), never from the request body.
    await Feedback.create({
      user: req.user ? req.user._id : null,
      name: req.user ? req.user.name : "Guest",
      rating,
      message,
    });

    return res.status(201).json({ message: "Thank you for your feedback!" });
  } catch (err) {
    console.error("createFeedback error:", err);
    return res.status(500).json({ message: "Unable to save feedback. Please try again." });
  }
};