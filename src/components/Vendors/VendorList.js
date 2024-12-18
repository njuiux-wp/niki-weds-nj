import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PhoneIcon, PencilIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/solid';
import VendorModal from './VendorModal';
import Placeholder from '../../widgets/Placeholder';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  // Use environment variable for backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await axios.get(`${backendUrl}/vendors`);
      setVendors(response.data);
    };
    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${backendUrl}/vendors/${id}`);
    setVendors(vendors.filter(vendor => vendor._id !== id));
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setModalIsOpen(true);
  };

  // Handle the update from the modal
  const handleUpdate = (updatedVendor) => {
    setVendors((prevVendors) =>
      prevVendors.map((vendor) => (vendor._id === updatedVendor._id ? updatedVendor : vendor))
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="title-font-xl">Vendors</h2>
        <button onClick={() => setModalIsOpen(true)} className="btn-icon fs-14 underline">Add</button>
      </div>
      {vendors.length === 0 ? (
        <Placeholder
          // imgsrc="./../../assets/vendors.png"
          iconName="group_search"
          title="No Vendors Found"
          description="There are no vendors listed."
          linkText="Add Vendor"
          linkTo="/vendors"
        />
      ) : (
        vendors.map(vendor => (
          <div key={vendor._id} className="app-card flex justify-between mb-4">
            <div className="flex flex-col">
              <p className="title-font-m">{vendor.name}</p>
              {/* <p className="desc-font-s my-1">Contact: {vendor.contactNumber}</p> */}
              <div className="flex items-center justify-center rounded-lg fs-14 bg-green-700 px-2 py-1 title-font-m !text-white font-bold mt-1">{vendor.category}</div>
            </div>
            <div className="flex">
              <a className="btn-icon !mr-4" href={`tel:${vendor.contactNumber}`}>
                <PhoneIcon className="h-4 w-4" />
              </a>
              <button className="btn-icon" onClick={() => handleEdit(vendor)} type="button">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button className="btn-icon !mx-4" onClick={() => handleDelete(vendor._id)} type="button">
                <TrashIcon className="h-4 w-4" />
              </button>
              <Link to={`/vendors/${vendor._id}`} className="btn-icon">
                <ChevronRightIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        ))
      )}
      <VendorModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setEditingVendor(null);
        }}
        editingVendor={editingVendor}
        setVendors={setVendors}
        vendors={vendors}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default VendorList;