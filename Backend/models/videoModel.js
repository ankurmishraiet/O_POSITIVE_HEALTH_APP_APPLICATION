const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '', trim: true },
    youtubeUrl: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: '' },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;