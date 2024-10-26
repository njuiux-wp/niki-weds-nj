import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const EventModal = ({ isOpen, onClose, onEventAdded, initialData }) => {
    const [name, setName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Pre-fill form for editing
                setName(initialData.name);
                setEventDate(initialData.eventDate.split('T')[0]); // Ensure date is in YYYY-MM-DD format
                setEventTime(initialData.eventTime);
            } else {
                // Clear form for adding a new event
                setName('');
                setEventDate('');
                setEventTime('');
            }
            setErrorMessage(''); // Clear any previous error message
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = { name, eventDate, eventTime };
    
        try {
            if (initialData) {
                // Update existing event
                const response = await axios.put(`${backendUrl}/events/${initialData._id}`, newEvent);
                onEventAdded(response.data); // Update state with the edited event
            } else {
                // Add new event
                const response = await axios.post(`${backendUrl}/events`, newEvent);
                onEventAdded(response.data); // Update state with the new event
            }
            onClose();
        } catch (error) {
            console.error('Error adding event:', error); // Log the error
        }
    };

    return (
        <Modal className="vendorModal" isOpen={isOpen} onRequestClose={onClose}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">{initialData ? 'Edit Event' : 'Add Event'}</h2>
                <button className="btn-icon" type="button" onClick={onClose}>
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Event Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Event Date</label>
                    <input
                        type="date"
                        className="form-input"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Event Time</label>
                    <input
                        type="time"
                        className="form-input"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        required
                    />
                </div>
                <button className="theme-btn mt-6" type="submit">
                    {initialData ? 'Update Event' : 'Add Event'}
                </button>
            </form>
        </Modal>
    );
};

export default EventModal;