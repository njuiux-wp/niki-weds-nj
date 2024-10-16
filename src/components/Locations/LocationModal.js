import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const LocationModal = ({ isOpen, onClose, onLocationAdded, initialData }) => {
    const [name, setName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [perDayPrice, setPerDayPrice] = useState(0);
    const [depositPaid, setDepositPaid] = useState(0);
    const [options, setOptions] = useState({
        chairs: false,
        beds: false,
        decorations: false,
        foods: false,
    });

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Pre-fill form for editing
                setName(initialData.name);
                setFromDate(initialData.fromDate);
                setPerDayPrice(initialData.perDayPrice);
                setDepositPaid(initialData.depositPaid);
                setOptions(initialData.options || {
                    chairs: false,
                    beds: false,
                    decorations: false,
                    foods: false,
                });
            } else {
                // Clear form for adding new location
                setName('');
                setFromDate('');
                setPerDayPrice('');
                setDepositPaid('');
                setOptions({
                    chairs: false,
                    beds: false,
                    decorations: false,
                    foods: false,
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLocation = { name, fromDate, perDayPrice, depositPaid, options };

        if (initialData) {
            // Update existing location
            axios.put(`${backendUrl}/locations/${initialData._id}`, newLocation)
                .then(response => {
                    onLocationAdded(response.data); // Update state with the edited location
                    onClose();
                })
                .catch(error => console.error(error));
        } else {
            // Add new location
            axios.post(`${backendUrl}/locations`, newLocation)
                .then(response => {
                    onLocationAdded(response.data);
                    onClose();
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <Modal className="vendorModal" isOpen={isOpen} onRequestClose={onClose}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="title-font-xl">{initialData ? 'Edit Location' : 'Add Location'}</h2>
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
                    <label className="desc-font-xs uppercase mb-1">Deposit</label>
                    <input type="number" className="form-input" value={depositPaid} onChange={(e) => setDepositPaid(Number(e.target.value))} required />
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
                <button className="theme-btn mt-6" type="submit">
                    {initialData ? 'Update Location' : 'Add Location'}
                </button>
            </form>
        </Modal>
    );
};

export default LocationModal;
