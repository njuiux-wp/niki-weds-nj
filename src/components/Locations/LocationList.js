import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';  // Import PencilIcon for edit
import LocationModal from './LocationModal';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || null);
    const [locationToEdit, setLocationToEdit] = useState(null); // For editing
    const navigate = useNavigate();
    const locationState = useLocation();
    const cameFromDashboard = locationState.state?.fromDashboard || false;

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        axios.get(`${backendUrl}/locations`)
            .then(response => setLocations(response.data))
            .catch(error => console.error(error));
    }, []);

    const openAddModal = () => {
        setIsModalOpen(true);
        setLocationToEdit(null); // Clear when adding a new location
    };

    const openEditModal = (location) => {
        setLocationToEdit(location); // Set the location to edit
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${backendUrl}/locations/${id}`);
            if (response.status === 200) {
                // Remove the deleted location from the state
                setLocations((prev) => prev.filter((loc) => loc._id !== id));
            }
        } catch (error) {
            console.error('Error deleting location:', error.response?.data || error.message);
        }
    };

    const handleLocationAdded = (newLocation) => {
        if (locationToEdit) {
            // Update existing location in the state
            setLocations((prev) => prev.map(loc => loc._id === newLocation._id ? newLocation : loc));
        } else {
            setLocations((prev) => [...prev, newLocation]);
        }
    };

    const handleLocationClick = (location) => {
        setSelectedLocation(location.name);
        localStorage.setItem('selectedLocation', location.name); // Store in local storage
        if (cameFromDashboard) {
            navigate(`/dashboard?location=${location.name}`); // Redirect back to Dashboard only if coming from Dashboard
        }
    };


    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="title-font-xl">Locations</h2>
                <button className="btn-icon fs-14 underline" type="button" onClick={openAddModal}>Add</button>
            </div>
            {locations.map((location, index) => (
                <div key={`${location._id}-${index}`} className={`app-card flex justify-between mb-4 !pb-12 relative ${selectedLocation === location.name ? 'bg-blue-100' : ''}`}>
                    <div className="flex flex-col">
                        <p className="title-font-m">{location.name}</p>
                        <p className="desc-font-s my-1">From Date: {location.fromDate}</p>
                        <p className="desc-font-xs uppercase">Total Price: Rs.{location.perDayPrice * 2}</p>
                        <p className="desc-font-xs uppercase">Deposit Paid: Rs.{location.depositPaid}</p>
                    </div>
                    <div className="flex">
                        <button className="btn-icon" onClick={() => openEditModal(location)} type="button">
                            <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="btn-icon !mx-4" onClick={() => handleDelete(location._id)} type="button">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                        <Link to={`/locations/${location._id}`} className="btn-icon">
                            <ChevronRightIcon className="h-6 w-6" />
                        </Link>
                    </div>
                    <div className="desc-font-s App-link absolute bottom-1 left-0 text-center w-full border-t pt-2 pb-1" onClick={() => handleLocationClick(location)}>
                        {selectedLocation === location.name ? 'Selected' : 'Select'}
                    </div>
                </div>
            ))}
            <LocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLocationAdded={handleLocationAdded}
                initialData={locationToEdit} // Pass location data for editing
            />
        </div>
    );
};

export default LocationList;
