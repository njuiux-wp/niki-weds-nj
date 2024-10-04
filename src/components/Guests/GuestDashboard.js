import React from 'react';
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const GuestDashboard = () => {
    return (
        <div className="w-full">
            <div className="app-card my-8">
                <div>
                    <span className="title-font-m">Total Guests</span>
                    <span className="font-bold">500</span>
                </div>
                <p>graph here</p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-3">
                <Link to={`/vendors`} className="app-card flex-col">
                    <div className="title-font-m fs-14">Niki's Guests</div>
                    <span className="font-bold">250</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
                <Link to={`/guests`} className="app-card flex-col">
                    <div className="title-font-m fs-14">Nj's Guests</div>
                    <span className="font-bold">250</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
            </div>
        </div>
    );
};

export default GuestDashboard;