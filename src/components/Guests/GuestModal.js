import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const GuestModal = ({ isEdit, guestData, onClose, onSubmit, isOpen }) => {
    const [formData, setFormData] = useState({
        name: guestData?.name || '',
        familyMembers: guestData?.familyMembers || '',
        roomNo: guestData?.roomNo || '',
        inviteStatus: guestData?.inviteStatus || 'pending',
        category: guestData?.category || 'Niki',
        locationName: guestData?.locationName || '' // New location field
    });

    const [locations, setLocations] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    // Fetch locations
    useEffect(() => {
        axios.get(`${backendUrl}/locations`)
            .then(response => setLocations(response.data))
            .catch(error => console.error(error));
    }, [backendUrl]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="vendorModal">
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">{isEdit ? 'Edit Guest' : 'Add Guest'}</h2>
                <button className="btn-icon" onClick={onClose}>
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Guest Name</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleInputChange} autocomplete="off" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="desc-font-xs uppercase mb-1">Total Family Members</label>
                        <input type="number" name="familyMembers" className="form-input" value={formData.familyMembers} onChange={handleInputChange} autocomplete="off" required />
                    </div>
                    <div className="form-group">
                        <label className="desc-font-xs uppercase mb-1">Room No</label>
                        <input type="text" name="roomNo" className="form-input" value={formData.roomNo} onChange={handleInputChange} autocomplete="off" required />
                    </div>
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Location</label>
                    <select name="locationName" className="form-input" value={formData.locationName} onChange={handleInputChange}>
                        <option value="">Select Location</option>
                        {locations.map(location => (
                            <option key={location._id} value={location.name}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Invite Status</label>
                    <select name="inviteStatus" className="form-input" value={formData.inviteStatus} onChange={handleInputChange}>
                        <option value="pending">Pending</option>
                        <option value="sent">Sent</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Guests Category</label>
                    <select name="category" className="form-input" value={formData.category} onChange={handleInputChange}>
                        <option value="Niki">Niki</option>
                        <option value="NJ">NJ</option>
                    </select>
                </div>
                <button type="submit" className="theme-btn">{isEdit ? 'Update Guest' : 'Add Guest'}</button>
            </form>
        </Modal>
    );
};

export default GuestModal;