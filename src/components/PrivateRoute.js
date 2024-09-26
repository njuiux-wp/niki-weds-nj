// src/components/PrivateRoute.js
import React from 'react';
import { useAuth } from './../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // If the user is not logged in, redirect them to the login page
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
