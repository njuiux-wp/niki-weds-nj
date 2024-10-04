// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import GuestList from './components/Guests/GuestList';
import VendorList from './components/Vendors/VendorList';
import VendorDetail from './components/Vendors/VendorDetail';
import BudgetTracker from './components/BudgetTracker';
import ToDo from './components/ToDo';
import Attire from './components/Attire';
import ProfileSettings from './components/ProfileSettings';
import LocationList from './components/Locations/LocationList';
import LocationDetail from './components/Locations/LocationDetail';
import Login from './components/Auth/Login';
import PrivateRoute from './components/PrivateRoute';
import GuestDashboard from './components/Guests/GuestDashboard';
import GuestDetail from './components/Guests/GuestDetail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/vendors" element={<PrivateRoute><VendorList /></PrivateRoute>} />
            <Route path="/vendor/:category/:id" element={<PrivateRoute><VendorDetail /></PrivateRoute>} />
            <Route path="/locations" element={<PrivateRoute><LocationList /></PrivateRoute>} />
            <Route path="/locations/:id" element={<PrivateRoute><LocationDetail /></PrivateRoute>} />
            <Route path="/guest-dashboard" element={<PrivateRoute><GuestDashboard /></PrivateRoute>} />
            <Route path="/guests" element={<PrivateRoute><GuestList /></PrivateRoute>} />
            <Route path="/guests-details" element={<PrivateRoute><GuestDetail /></PrivateRoute>} />
            <Route path="/budget" element={<PrivateRoute><BudgetTracker /></PrivateRoute>} />
            <Route path="/todo" element={<PrivateRoute><ToDo /></PrivateRoute>} />
            <Route path="/attire" element={<PrivateRoute><Attire /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        </Routes>
    );
};

export default AppRoutes;
