import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/solid';


const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  // Use environment variable for backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    axios.get(`${backendUrl}/locations/${id}`)
      .then(response => setLocation(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`${backendUrl}/locations/${id}`)
      .then(() => navigate('/locations'))
      .catch(error => console.error(error));
  };

  const handleEdit = (updatedLocation) => {
    axios.put(`${backendUrl}/locations/${id}`, updatedLocation)
      .then(response => setLocation(response.data))
      .catch(error => console.error(error));
  };

  if (!location) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link className="btn-icon fs-14 underline" to="/locations">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <h2 className="title-font-xl ms-2">Location's Details</h2>
        </div>
        <button className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center" onClick={handleDelete}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-5">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Name:</span>
          <span className="font-bold">{location.name}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">From Date:</span>
          <span className="font-bold">{location.fromDate}</span>
        </p>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-5">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Price (Per Day):</span>
          <span className="font-bold">Rs.{location.perDayPrice}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Total Price:</span>
          <span className="font-bold">Rs.{location.perDayPrice * 2}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Total Price (with 50 Rooms):</span>
          <span className="font-bold">Rs.{location.perDayPrice * 2 * 50}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Deposit Paid:</span>
          <span className="font-bold">Rs.{location.depositPaid}</span>
        </p>
      </div>
      <h2 className="title-font-xl fs-16">Facilities</h2>
      <div className="flex flex-wrap items-center w-full mt-2 mb-4">
        {location.options.chairs ? (
          <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">Chairs</div>
        ) : ("")
        }
        {location.options.beds ? (
          <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">Beds</div>
        ) : ("")
        }
        {location.options.decorations ? (
          <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">Decorations</div>
        ) : ("")
        }
        {location.options.foods ? (
          <div className="flex items-center justify-center rounded-lg fs-14 bg-white px-2 py-1 title-font-m font-bold mb-3 mr-3">Foods</div>
        ) : ("")
        }
      </div>
    </div>
  );
};

export default LocationDetail;
