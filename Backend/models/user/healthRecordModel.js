const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember', required: true },
    type: { type: String, enum: ['prescription', 'report', 'insurance'], required: true },
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthRecord', healthRecordSchema);