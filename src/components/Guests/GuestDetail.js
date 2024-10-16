import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import GuestModal from './GuestModal';

const GuestDetail = () => {
    const { id } = useParams(); // Extract guest ID from URL
    const [guest, setGuest] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        const fetchGuestDetail = async () => {
            try {
                const response = await axios.get(`${backendUrl}/guests/${id}`);
                setGuest(response.data);
            } catch (error) {
                console.error('Error fetching guest details:', error);
            }
        };

        fetchGuestDetail();
    }, [id, backendUrl]); // Dependency on id

    const handleEditGuest = async (formData) => {
        try {
            await axios.put(`${backendUrl}/guests/${id}`, formData);
            setShowEditModal(false);
            // Fetch the updated guest data after the edit
            const updatedGuest = await axios.get(`${backendUrl}/guests/${id}`);
            setGuest(updatedGuest.data); // Update the guest state with the new data
        } catch (error) {
            console.error('Error updating guest:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${backendUrl}/guests/${id}`);
            navigate('/guests/Niki'); // Redirect after deletion
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    if (!guest) return <div>Loading...</div>; // Handle loading state

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link className="btn-icon fs-14 underline" to="/guests/Niki">
                        <ArrowLeftIcon className="h-4 w-4" />
                    </Link>
                    <h2 className="title-font-xl ms-2">Guest's Details</h2>
                </div>
                <button onClick={handleDelete} className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="app-card flex flex-col !justify-start gap-4 mb-5">
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Name:</span>
                    <span className="font-bold">{guest.name}</span>
                </p>
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Family Members:</span>
                    <span className="font-bold">{guest.familyMembers}</span>
                </p>
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Location Name:</span>
                    <span className="font-bold">{guest.locationName}</span>
                </p>
                <p className="title-font-m flex flex-col w-full">
                    <span className="desc-font-xs uppercase">Room No:</span>
                    <span className="font-bold">{guest.roomNo}</span>
                </p>
            </div>
            <h2 className="title-font-xl fs-16 mb-4">Invite</h2>
            <div className="flex items-center w-full mt-2 mb-4">
                <div className={`flex items-center justify-center rounded-lg fs-14 ${guest.inviteStatus === 'Sent' ? 'bg-green-700 !text-white' : 'bg-white !text-black'} px-2 py-1 title-font-m font-bold mb-3 mr-3`}>
                    {guest.inviteStatus}
                </div>
            </div>
            <button onClick={() => setShowEditModal(true)} className="theme-btn">Edit</button>
            {showEditModal && (
                <GuestModal
                    isEdit={true}
                    guestData={guest}
                    isOpen={showEditModal} 
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleEditGuest}
                />
            )}
        </div>
    );
};

export default GuestDetail;