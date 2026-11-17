const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/user/userAuthController');

router.post('/auth/send-otp', sendOtp);
router.post('/auth/verify-otp', verifyOtp);

module.exports = router;