import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const GuestList = () => {
  const [guests, setGuests] = useState({ NJ: [], Niki: [] });
  const [activeTab, setActiveTab] = useState('Niki');
  // Use environment variable for backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com'; 

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${backendUrl}/guests`); // Use the absolute URL
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const renderContent = () => {
    return guests[activeTab].map(guest => (
      <div key={guest.id} className="flex items-center justify-between border-b py-3">
        <span className="desc-font-s !text-black">{guest.name}</span>
        <div className="flex items-center justify-end">
          <span className="desc-font-s !font-bold !text-black max-w-[60px] mr-2">{guest.familyMembers}</span>
          <Link className="btn-icon !text-black" type="button" to="/guests-details">
            <ChevronRightIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full">
      <nav className="guests-navbar">
        <div className="flex justify-between">
          <button
            className={`bottom-tab ${activeTab === 'Niki' ? 'active' : ''}`}
            onClick={() => setActiveTab('Niki')}
          >
            <span>Niki's Guests</span>
          </button>
          <button
            className={`bottom-tab ${activeTab === 'NJ' ? 'active' : ''}`}
            onClick={() => setActiveTab('NJ')}
          >
            <span>Nj's Guests</span>
          </button>
        </div>
      </nav>
      <main className="w-full mt-3">
        {renderContent()}
      </main>
    </div>
  );
};

export default GuestList;