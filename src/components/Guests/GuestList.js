import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useParams, Link, useNavigate } from 'react-router-dom';

const GuestList = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
  const { activeTabParam } = useParams(); // Extract the active tab from the URL
  const [activeTab, setActiveTab] = useState(activeTabParam || 'Niki'); // Set initial active tab from the URL or default to 'Niki'

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${backendUrl}/guests`);
        const guestsData = response.data;

        // Filter guests based on the active tab
        const filteredGuests = guestsData.filter(guest => guest.category === activeTab);
        setGuests(filteredGuests);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [activeTab, backendUrl]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/guests/${newTab}`); // Update the URL when changing tabs
  };

  const renderContent = () => {
    return guests.map(guest => (
      <div key={guest._id} className="flex items-center justify-between border-b py-3">
        <span className="desc-font-s !text-black">{guest.name}</span>
        <div className="flex items-center justify-end">
          <span className="desc-font-s !font-bold !text-black max-w-[60px] mr-2">{guest.familyMembers}</span>
          <Link className="btn-icon !text-black" type="button" to={`/guests-details/${guest._id}`}>
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
            onClick={() => handleTabChange('Niki')}
          >
            <span>Niki's Guests</span>
          </button>
          <button
            className={`bottom-tab ${activeTab === 'NJ' ? 'active' : ''}`}
            onClick={() => handleTabChange('NJ')}
          >
            <span>Nj's Guests</span>
          </button>
        </div>
      </nav>
      <main className="w-full mt-3">
        {guests.length > 0 ? renderContent() : <p>No guests found for {activeTab}.</p>}
      </main>
    </div>
  );
};

export default GuestList;
