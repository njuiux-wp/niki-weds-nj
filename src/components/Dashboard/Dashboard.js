import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/solid';
import DashboardBanner from './DashboardBanner';
import { Link, useLocation } from 'react-router-dom';
import EventList from './../Events/EventList';

const Dashboard = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedLocationFromQuery = query.get('location'); // Define it here

  // Use local storage for the selected location, with a fallback to the query parameter or a default value
  const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || selectedLocationFromQuery || 'Dwarka');

  useEffect(() => {
    if (selectedLocationFromQuery) {
      setSelectedLocation(selectedLocationFromQuery);
      localStorage.setItem('selectedLocation', selectedLocationFromQuery); // Update local storage
    }
  }, [selectedLocationFromQuery]);

  return (
    <div className="w-full">
      <DashboardBanner></DashboardBanner>
      <div className="app-card my-5">
        <div>
          <span className="title-font-m">Location</span>
          <p className="desc-font-s">{selectedLocation}</p>
        </div>
        <Link to={`/locations`} state={{ fromDashboard: true }} className="btn-icon">
          <PencilIcon className="h-4 w-4" />
        </Link>
      </div>
      <EventList />
      <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
        <Link to={`/budget`} className="app-card flex-col">
          <div className="title-font-m fs-14">Budget</div>
          <ChevronRightIcon className="h-6 w-6 App-link" />
        </Link>
        <Link to={`/todo`} className="app-card flex-col">
          <div className="title-font-m fs-14">ToDo</div>
          <ChevronRightIcon className="h-6 w-6 App-link" />
        </Link>
      </div>
      {/* <p>https://dribbble.com/shots/17817743-Wedding-Planner-App-UI-Design</p>
      <p>https://dribbble.com/shots/17817834-Wedding-Planner-App-Homepage-UI-Design</p> */}
    </div>
  );
};

export default Dashboard;