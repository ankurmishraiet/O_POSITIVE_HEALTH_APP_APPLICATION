const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    address: { type: String, default: '', trim: true },
    image: { type: String, default: '' },
    about: { type: String, default: '' },
  },
  { timestamps: true }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;