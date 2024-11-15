import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DocumentDuplicateIcon, ClipboardIcon } from '@heroicons/react/solid'; // Import required icons
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const [storedOtp, setStoredOtp] = useState(''); // State for storing OTP
    const [error, setError] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false); // State for loader
    const navigate = useNavigate();
    const { login } = useAuth();
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setOtpMessage('');
        setError('');
        setLoading(true); // Start loader

        try {
            console.log("Backend URL:", backendUrl);
            const response = await axios.post(`${backendUrl}/auth/login`, { phoneNumber });
            setOtpMessage(response.data.message);
            setStoredOtp(response.data.otp); // Store the OTP in state
            setIsOtpSent(true); // Show OTP input after successful phone number validation
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }

        try {
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

    // Handle the "Paste OTP" functionality
    const handlePasteOtp = () => {
        if (storedOtp) {
            setOtp(storedOtp); // Automatically paste the stored OTP into the input field
        } else {
            setError('No OTP available to paste.');
        }
    };

    return (
        <div className="login-container w-full">
            <div className="flex flex-col items-center justify-center my-8">
                <img src="/niki-weds-nj/nwn.png" className="w-60 h-auto object-contain rounded-full" alt="Niki Weds Nj" />
                {/* <h1 className="title-font-xl mt-2 mb-2 !uppercase App-link">NJ & Niki</h1> */}
            </div>
            <div className="flex items-center justify-center mt-3 mb-6">
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
                    <button className={`theme-btn mt-6 ${loading ? 'opacity-60' : ''}`} type="submit" disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Get OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div className="input-group form-group">
                        <label className="desc-font-xs uppercase mb-1" htmlFor="otp">Enter OTP</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                maxLength={4}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-input"
                            />
                            <button
                                type="button"
                                onClick={handlePasteOtp}
                                className="!bg-transparent !p-0 !w-[20px] !h-[20px] absolute right-2 top-2.5 App-link !flex"
                            >
                                <ClipboardIcon className="w-5 h-5" />
                            </button>
                        </div>
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