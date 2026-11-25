// const mongoose = require('mongoose');

// const consultationSchema = new mongoose.Schema(
//   {
//     room:        { type: String, required: true, unique: true },
//     patientName: { type: String, required: true, trim: true, maxlength: 60 },
//     reason:      { type: String, default: '', maxlength: 300 },
//     status:      { type: String, enum: ['waiting', 'completed'], default: 'waiting' },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Consultation', consultationSchema);