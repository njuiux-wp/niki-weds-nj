import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import LocationModal from './LocationModal';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Use environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://niki-weds-nj.onrender.com'; 

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

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="title-font-xl">Locations</h2>
                <button className="btn-icon fs-14 underline" type="button" onClick={openAddModal}>Add</button>
            </div>
            {locations.map((location, index) => (
                <div key={`${location.id}-${index}`} className="app-card flex justify-between mb-4">
                    <div className="flex flex-col">
                        <p className="title-font-m">{location.name}</p>
                        <p className="desc-font-s my-1">From Date: {location.fromDate}</p>
                        <p className="desc-font-xs uppercase">Total Price: Rs.{location.perDayPrice * 2}</p>
                    </div>
                    <div className="flex">
                        <Link className="btn-icon" to={`/locations/${location.id}`}>
                            <ChevronRightIcon className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            ))}
            <LocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLocationAdded={handleLocationAdded} />
        </div>
    );
};

export default LocationList;
