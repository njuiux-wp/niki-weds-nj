// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user from local storage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse the stored user
        }
    }, []);

    const login = (username) => {
        console.log('Logging in user:', username); // Debugging line
        setUser(username);
        localStorage.setItem('user', JSON.stringify(username)); // Store username in local storage
        console.log('User stored in local storage:', localStorage.getItem('user')); // Log after storing
        navigate('/dashboard'); // Redirect after login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove username from local storage
        navigate('/'); // Redirect to login after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
