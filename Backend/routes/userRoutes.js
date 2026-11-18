const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/user/userAuthController');
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