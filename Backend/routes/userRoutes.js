const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/user/userAuthController');
const { getProfile, updateProfile } = require('../controllers/user/userProfileController');
const { getMembers, addMember, deleteMember } = require('../controllers/user/familyController');
const {
  getAppointments,
  createAppointment,
  cancelAppointment,
} = require('../controllers/user/appointmentController');
const { addFeedback } = require('../controllers/user/feedbackController');
const { getRecords, addRecord, deleteRecord } = require('../controllers/user/healthRecordController');
const { userProtect } = require('../middleware/userProtect');
const recordUpload = require('../middleware/recordUpload');
const { chat } = require('../controllers/user/chatController');
const makeController = require('../controllers/admin/crudController');
const Doctor = require('../models/doctorModel');
const Hospital = require('../models/hospitalModel');
const Video = require('../models/videoModel');
const Article = require('../models/articleModel');
const nodePath = require('path');

router.post('/auth/send-otp', sendOtp);
router.post('/auth/verify-otp', verifyOtp);
router.post('/chat', chat);

router.get('/profile', userProtect, getProfile);
router.put('/profile', userProtect, updateProfile);

router.get('/family', userProtect, getMembers);
router.post('/family', userProtect, addMember);
router.delete('/family/:id', userProtect, deleteMember);

router.get('/appointments', userProtect, getAppointments);
router.post('/appointments', userProtect, createAppointment);
router.put('/appointments/:id/cancel', userProtect, cancelAppointment);

router.post('/feedback', userProtect, addFeedback);

router.get('/records', userProtect, getRecords);
router.post(
  '/records',
  userProtect,
  (req, res, next) => {
    recordUpload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  addRecord
);
router.delete('/records/:id', userProtect, deleteRecord);

const resources = [
  ['doctors', Doctor, 'Doctor'],
  ['hospitals', Hospital, 'Hospital'],
  ['videos', Video, 'Video'],
  ['articles', Article, 'Article'],
];

resources.forEach(([path, Model, label]) => {
  const c = makeController(Model, label);
  router.get('/' + path, c.getAll);
  router.get('/' + path + '/:id', c.getOne);
});
router.use('/uploads', express.static(nodePath.join(__dirname, '..', 'uploads')));

module.exports = router;