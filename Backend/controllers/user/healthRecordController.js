const fs = require('fs');
const path = require('path');
const HealthRecord = require('../../models/user/healthRecordModel');
const FamilyMember = require('../../models/user/familyMemberModel');

const types = ['prescription', 'report', 'insurance'];

const getRecords = async (req, res) => {
  try {
    const { member } = req.query;

    if (!member) {
      return res.status(400).json({ message: 'Member chuno' });
    }

    const records = await HealthRecord.find({ user: req.user._id, member }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addRecord = async (req, res) => {
  try {
    const { member, type, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File chuno' });
    }

    if (!types.includes(type)) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: 'Record ka type chuno' });
    }

    if (!title || !title.trim()) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: 'Title daalo' });
    }

    const owner = await FamilyMember.findOne({ _id: member, user: req.user._id });
    if (!owner) {
      fs.unlink(req.file.path, () => {});
      return res.status(404).json({ message: 'Member nahi mila' });
    }

    const record = await HealthRecord.create({
      user: req.user._id,
      member,
      type,
      title: title.trim(),
      fileUrl: '/api/uploads/' + req.file.filename,
      fileName: req.file.originalname,
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      return res.status(404).json({ message: 'Record nahi mila' });
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', path.basename(record.fileUrl));
    fs.unlink(filePath, () => {});

    res.json({ message: 'Record hata diya' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRecords, addRecord, deleteRecord };