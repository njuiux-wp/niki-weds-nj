import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Location List', path: '/locations' },
    { label: 'Vendors', path: '/vendors' },
    { label: 'Budget Tracker', path: '/budget' },
    { label: 'Guest List', path: '/guests' },
    { label: 'To Do', path: '/todo' },
    { label: 'Attire', path: '/attire' },
    { label: 'Grocery List', path: '/grocery' } 
  ];

  return (
    <div className="w-full">
      <h3 className="title-font-l mb-2">Menu</h3>
      <div className="grid grid-cols-1 gap-4">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="app-card">
            <div className="title-font-m fs-14">{item.label}</div>
            <ChevronRightIcon className="h-6 w-6 App-link" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettings;