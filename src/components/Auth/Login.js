import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const [error, setError] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://niki-weds-nj.onrender.com'; 

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setOtpMessage('');
        setError('');

        try {
            console.log("Backend URL:", backendUrl);
            const response = await axios.post(`${backendUrl}/auth/login`, { phoneNumber });
            setOtpMessage(response.data.message);
            setIsOtpSent(true); // Show OTP input after successful phone number validation
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }

        try {
            console.log("Backend URL:", backendUrl);
            // Simulating OTP verification
            const response = await axios.post(`${backendUrl}/auth/verify-otp`, { phoneNumber, otp });
            if (response.data.valid) {
                login(response.data.username); // Store username in context after successful login
                navigate('/dashboard');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong during OTP verification.');
        }
    };

    return (
        <div className="login-container w-full">
            <div className="flex flex-col items-center justify-center my-8">
                <img src="/niki-weds-nj/nwn.png" className="w-60 h-60 object-contain" alt="Niki Weds Nj" />
                <h1 className="title-font-xl mt-1 mb-2 !uppercase App-link">Niki Weds Nj</h1>
            </div>
            <div className="flex items-center justify-center mb-6">
                <h2 className="title-font-xl">Login</h2>
            </div>
            {!isOtpSent ? (
                <form onSubmit={handlePhoneSubmit}>
                    <div className="input-group form-group">
                        <label className="desc-font-xs uppercase mb-1" htmlFor="phoneNumber">Enter Mobile Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            maxLength={10}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="form-input"
                        />
                        {/* Display otpMessage and error below the input */}
                        {otpMessage && <p className="text-green-600 desc-font-xs mt-1 !font-[400] success-message">{otpMessage}</p>}
                        {error && <p className="text-red-700 desc-font-xs mt-1 !font-[400] error-message">{error}</p>}
                    </div>
                    <button className="theme-btn mt-6" type="submit">Get OTP</button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div className="input-group form-group">
                        <label className="desc-font-xs uppercase mb-1" htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            maxLength={4}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-input"
                        />
                        {/* Display otpMessage and error below the input */}
                        {otpMessage && <p className="text-green-600 desc-font-xs mt-1 !font-[400] success-message">{otpMessage}</p>}
                        {error && <p className="text-red-700 desc-font-xs mt-1 !font-[400] error-message">{error}</p>}
                    </div>
                    <button className="theme-btn mt-6" type="submit">Submit OTP</button>
                </form>
            )}
        </div>
    );
};

export default Login;