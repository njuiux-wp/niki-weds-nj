const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP } = require('../controllers/authController');

router.post('/login', generateOTP);
router.post('/verify-otp', verifyOTP); // New route for OTP verification

module.exports = router;
