const express = require('express');
const { adminLogin } = require('../controllers/auth/loginController');

const router = express.Router();

router.post('/login', adminLogin);

module.exports = router;