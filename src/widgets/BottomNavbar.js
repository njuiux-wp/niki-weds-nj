// src/widgets/BottomNavbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, UserGroupIcon, BriefcaseIcon, ViewGridIcon } from '@heroicons/react/solid';

const BottomNavbar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();

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
