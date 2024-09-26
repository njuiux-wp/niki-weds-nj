import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';

const Events = () => {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">Events</h2>
                <button className="btn-icon fs-14 underline" type="button">Add</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="app-card">
                    <div>
                        <span className="title-font-m">Mehendi</span>
                        <p className="desc-font-s">06:00 PM, 5th Feb 2025</p>
                    </div>
                    <button className="btn-icon" type="button">
                        <PencilIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="app-card">
                    <div>
                        <span className="title-font-m">Lunch</span>
                        <p className="desc-font-s">12:00 PM, 6th Feb 2025</p>
                    </div>
                    <button className="btn-icon" type="button">
                        <PencilIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="app-card">
                    <div>
                        <span className="title-font-m">Haldi</span>
                        <p className="desc-font-s">04:00 PM, 6th Feb 2025</p>
                    </div>
                    <button className="btn-icon" type="button">
                        <PencilIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="app-card">
                    <div>
                        <span className="title-font-m">Dinner</span>
                        <p className="desc-font-s">08:00 PM, 6th Feb 2025</p>
                    </div>
                    <button className="btn-icon" type="button">
                        <PencilIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="app-card">
                    <div>
                        <span className="title-font-m">Dandiya</span>
                        <p className="desc-font-s">10:00 PM, 6th Feb 2025</p>
                    </div>
                    <button className="btn-icon" type="button">
                        <PencilIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Events;