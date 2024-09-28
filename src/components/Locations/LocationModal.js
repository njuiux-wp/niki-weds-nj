import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const LocationModal = ({ isOpen, onClose, onLocationAdded }) => {
    const [name, setName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [perDayPrice, setPerDayPrice] = useState(0);
    const [options, setOptions] = useState({
        chairs: false,
        beds: false,
        decorations: false,
        foods: false,
    });
    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://niki-weds-nj.onrender.com'; 

    // Reset form data when the modal opens
    useEffect(() => {
        if (isOpen) {
            setName('');
            setFromDate('');
            setPerDayPrice('');
            setOptions({
                chairs: false,
                beds: false,
                decorations: false,
                foods: false,
            });
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLocation = { name, fromDate, perDayPrice, options };
        axios.post(`${backendUrl}/locations`, newLocation)
            .then(response => {
                onLocationAdded(response.data); // This should work if the prop is passed correctly
                onClose();
            })
            .catch(error => console.error(error));
    };

    return (
        <Modal className="vendorModal" isOpen={isOpen} onRequestClose={onClose}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">Add Location</h2>
                <button className="btn-icon" type="button" onClick={onClose}>
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Location Name</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Date</label>
                    <input type="date" className="form-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Price (Per Day)</label>
                    <input type="number" className="form-input" value={perDayPrice} onChange={(e) => setPerDayPrice(Number(e.target.value))} required />
                </div>
                <div className="form-group">
                    <label className="desc-font-xs uppercase mb-1">Features</label>
                    <div className="flex align-items gap-3">
                        <label className="flex items-center">
                            <input type="checkbox" checked={options.chairs} onChange={() => setOptions(prev => ({ ...prev, chairs: !prev.chairs }))} />
                            <label className="desc-font-xs !font-[400] ml-1">Chairs</label>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" checked={options.beds} onChange={() => setOptions(prev => ({ ...prev, beds: !prev.beds }))} />
                            <label className="desc-font-xs !font-[400] ml-1">Beds</label>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" checked={options.decorations} onChange={() => setOptions(prev => ({ ...prev, decorations: !prev.decorations }))} />
                            <label className="desc-font-xs !font-[400] ml-1">Decorations</label>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" checked={options.foods} onChange={() => setOptions(prev => ({ ...prev, foods: !prev.foods }))} />
                            <label className="desc-font-xs !font-[400] ml-1">Foods</label>
                        </label>
                    </div>
                </div>
                <button className="theme-btn mt-6" type="submit">Add Location</button>
            </form>
        </Modal>
    );
};

export default LocationModal;
