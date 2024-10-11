import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import LocationModal from './LocationModal';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || null);
    const navigate = useNavigate();
    const locationState = useLocation();
    const cameFromDashboard = locationState.state?.fromDashboard || false;

    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    useEffect(() => {
        axios.get(`${backendUrl}/locations`)
            .then(response => setLocations(response.data))
            .catch(error => console.error(error));
    }, []);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const handleLocationAdded = (newLocation) => {
        setLocations((prev) => [...prev, newLocation]);
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
                        <Link className="btn-icon" to={`/locations/${location._id}`}>
                            <ChevronRightIcon className="h-6 w-6" />
                        </Link>
                    </div>
                    <div className="desc-font-s App-link absolute bottom-1 left-0 text-center w-full border-t pt-2 pb-1" onClick={() => handleLocationClick(location)}>
                        {selectedLocation === location.name ? 'Selected' : 'Select'}
                    </div>
                </div>
            ))}
            <LocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLocationAdded={handleLocationAdded} />
        </div>
    );
};

export default LocationList;
