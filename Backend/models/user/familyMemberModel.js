const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    relation: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['M', 'F', 'O'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FamilyMember', familyMemberSchema);