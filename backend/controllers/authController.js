const otpGenerator = require('otp-generator');

// Sample data for registered users
const registeredUsers = {
    '8460175206': { name: 'Nj', otp: null },
    '7600928934': { name: 'Robin', otp: null },
    '9925718790': { name: 'Niki', otp: null },
    // Add more users as needed
};

// Generate OTP and validate phone number
const generateOTP = (req, res) => {
    const { phoneNumber } = req.body;

    if (registeredUsers[phoneNumber]) {
        const otp = otpGenerator.generate(4, { upperCase: false, specialChars: false });
        registeredUsers[phoneNumber].otp = otp;

        res.json({
            message: `Hey ${registeredUsers[phoneNumber].name}, your OTP is ${otp}`,
            otp,
            valid: true,
        });
    } else {
        res.status(400).json({
            message: 'Invalid phone number',
            valid: false,
        });
    }
};

const verifyOTP = (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (registeredUsers[phoneNumber] && registeredUsers[phoneNumber].otp === otp) {
        // Send back username along with OTP verification status
        res.json({ message: 'OTP verified successfully', valid: true, username: registeredUsers[phoneNumber].name });
    } else {
        res.status(400).json({ message: 'Invalid OTP', valid: false });
    }
};

module.exports = {
    generateOTP,
    verifyOTP,
};