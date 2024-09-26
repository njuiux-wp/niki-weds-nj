import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';

const GuestList = () => {
  const [guests, setGuests] = useState({ NJ: [], Niki: [] });
  const [activeTab, setActiveTab] = useState('Niki');

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('http://localhost:5001/guests'); // Use the absolute URL
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
          <button className="btn-icon !text-black" type="button">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
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