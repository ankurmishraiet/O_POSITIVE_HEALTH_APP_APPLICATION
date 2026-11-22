const FamilyMember = require('../../models/user/familyMemberModel');

const getMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, relation, age, gender } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Naam daalo' });
    }

    if (!relation) {
      return res.status(400).json({ message: 'Relation chuno' });
    }

    const ageNumber = Number(age);
    if (!ageNumber || ageNumber < 0 || ageNumber > 120) {
      return res.status(400).json({ message: 'Sahi age daalo' });
    }

    if (!['M', 'F', 'O'].includes(gender)) {
      return res.status(400).json({ message: 'Gender chuno' });
    }

    const member = await FamilyMember.create({
      user: req.user._id,
      name: name.trim(),
      relation,
      age: ageNumber,
      gender,
    });

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!member) {
      return res.status(404).json({ message: 'Member nahi mila' });
    }

    res.json({ message: 'Member hata diya' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMembers, addMember, deleteMember };