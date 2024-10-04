import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid';


const GuestDetail = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link className="btn-icon fs-14 underline" to="/locations">
                        <ArrowLeftIcon className="h-4 w-4" />
                    </Link>
                    <h2 className="title-font-xl ms-2">Guest's Details</h2>
                </div>
                <button className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
                    <PencilIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="app-card flex flex-col !justify-start gap-4 mb-5">
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Name:</span>
                    <span className="font-bold">Verma's Family</span>
                </p>
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Location Name:</span>
                    <span className="font-bold">Ahir Samaj</span>
                </p>
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Room No:</span>
                    <span className="font-bold">103</span>
                </p>
            </div>
            <h2 className="title-font-xl fs-16 mb-4">Invite</h2>
            <div className="flex items-center w-full mt-2 mb-4">
                <div className="flex items-center justify-center rounded-lg fs-14 bg-green-700 px-2 py-1 title-font-m !text-white font-bold mb-3 mr-3">Sent</div>
                <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">Pending</div>
            </div>
        </div>
    );
};

export default GuestDetail;
