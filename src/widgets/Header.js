// src/widgets/Header.js
import React from 'react';
import { useAuth } from './../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="main-headerbar">
            <h4 className="title-font-m">Welcome {user}</h4>
            <button onClick={logout} className="theme-btn !bg-transparent App-link !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
            </button>
        </div>
    );
}

export default Header;
