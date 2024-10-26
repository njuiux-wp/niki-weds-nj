import React from 'react';
import { Link } from 'react-router-dom';

const Placeholder = ({ iconName, title, description, linkText, linkTo }) => {
    return (
        <div className="app-card flex-col mb-4 text-center">
            {/* <img src={imgsrc} className="w-full" /> */}
            <span className="material-symbols-outlined fs-60">
                {iconName}
            </span>
            <h2 className="title-font-xl my-4">{title}</h2>
            <p className="desc-font-s mb-4">{description}</p>
            <Link to={linkTo} className="theme-btn !flex items-center justify-center">
                {linkText}
            </Link>
        </div>
    );
};

export default Placeholder;
