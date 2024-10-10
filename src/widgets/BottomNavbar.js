// src/widgets/BottomNavbar.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartIcon, UserGroupIcon, BriefcaseIcon, ViewGridIcon } from '@heroicons/react/solid';

const BottomNavbar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Effect to set active tab based on the current route
    useEffect(() => {
        switch (location.pathname) {
            case '/dashboard':
                setActiveTab('dashboard');
                break;
            case '/guest-dashboard':
                setActiveTab('guestlist');
                break;
            case '/vendors':
                setActiveTab('vendors');
                break;
            case '/settings':
                setActiveTab('settings');
                break;
            default:
                setActiveTab('dashboard'); // Default or fallback
        }
    }, [location.pathname, setActiveTab]);

    return (
        <nav className="bottom-navbar">
            <div className="flex justify-between">
                <button
                    className={`bottom-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('dashboard'); navigate('/dashboard'); }}
                >
                    <HeartIcon className="h-4 w-4" />
                    <span>Big Day</span>
                </button>
                <button
                    className={`bottom-tab ${activeTab === 'guestlist' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('guestlist'); navigate('/guest-dashboard'); }}
                >
                    <UserGroupIcon className="h-4 w-4" />
                    <span>Guests</span>
                </button>
                <button
                    className={`bottom-tab ${activeTab === 'vendors' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('vendors'); navigate('/vendors'); }}
                >
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>Vendors</span>
                </button>
                <button
                    className={`bottom-tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('settings'); navigate('/settings'); }}
                >
                    <ViewGridIcon className="h-4 w-4" />
                    <span>Settings</span>
                </button>
            </div>
        </nav>
    );
}

export default BottomNavbar;
