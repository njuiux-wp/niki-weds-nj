// src/widgets/Header.js
import React from 'react';
import { useAuth } from './../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="main-headerbar">
            <h4 className="title-font-xl">Welcome {user}</h4>
            <button onClick={logout} className="theme-btn !bg-transparent App-link !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
                <span className="material-symbols-outlined">
                    mode_off_on
                </span>
            </button>
        </div>
    );
}

export default Header;
