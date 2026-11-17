const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/user/userAuthController');
const { chat } = require('../controllers/user/chatController');

router.post('/auth/send-otp', sendOtp);
router.post('/auth/verify-otp', verifyOtp);
router.post('/chat', chat);

module.exports = router;