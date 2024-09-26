import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/solid';
import VendorModal from './VendorModal';
import { Link } from 'react-router-dom';

const VendorList = () => {
  const [vendorData, setVendorData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/vendors')
      .then(response => {
        setVendorData(response.data);
      })
      .catch(error => {
        console.error("Error fetching vendor data:", error.response ? error.response.data : error.message);
      });
  }, []);

  const openAddModal = () => {
    setCurrentVendor(''); // Clear vendor data for a new entry
    setIsModalOpen(true);
  };

  const editVendor = (category, vendor) => {
    setCurrentVendor({ ...vendor, category });
    setIsModalOpen(true);
  };

  const addVendor = (vendor) => {
    const vendorData = {
      name: vendor.name,
      contact: vendor.contact,
      totalAmount: vendor.totalAmount,
      depositPaid: vendor.depositPaid,
      payments: [], // Initialize with empty array if needed
    };

    axios.post(`http://localhost:5001/vendors`, { category: vendor.category, newVendor: vendorData })
      .then(response => {
        const category = vendor.category;
        setVendorData(prev => ({
          ...prev,
          [category]: [...(prev[category] || []), response.data]
        }));
        console.log("Vendor added:", response.data);
      })
      .catch(error => {
        console.error("Error adding vendor:", error.response ? error.response.data : error.message);
      });
  };

  const handleModalSave = (vendor) => {
    // Ensure the category is set properly when adding a vendor
    if (!vendor.category) {
      vendor.category = currentVendor ? currentVendor.category : ''; // Set category if available
    }

    if (currentVendor) {
      // If editing, find the old category
    const oldCategory = currentVendor.category;
      // If editing, update the vendor
      axios.put(`http://localhost:5001/vendors/${currentVendor.category}/${currentVendor.id}`, vendor)
        .then(response => {
          setVendorData(prev => ({
            ...prev,
            [currentVendor.category]: prev[currentVendor.category].map(v => v.id === currentVendor.id ? response.data : v),
          }));
        })
        .catch(error => {
          console.error("Error updating vendor:", error.response ? error.response.data : error.message);
        });
    } else {
      // Call addVendor only after ensuring the category is set
      addVendor(vendor);
    }
    setIsModalOpen(false);
    setCurrentVendor(null);
  };


  const handleDeleteVendor = (category, id) => {
    axios.delete(`http://localhost:5001/vendors/${category}/${id}`)
      .then(() => {
        setVendorData(prev => ({
          ...prev,
          [category]: prev[category].filter(v => v.id !== id),
        }));
      })
      .catch(error => {
        console.error("Error deleting vendor:", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="title-font-xl">Vendors</h2>
        <button className="btn-icon fs-14 underline" type="button" onClick={openAddModal}>Add</button>
      </div>
      {Object.keys(vendorData).map((category) => (
        <div key={category} className="mb-4">
          <div className="grid grid-cols-1 gap-4">
            {vendorData[category]?.map((vendor) => (
              <div key={`${category}-${vendor.id}`} className="app-card flex justify-between">
                <div className="flex flex-col">
                  <p className="title-font-m">{vendor.name}</p>
                  <p className="desc-font-s my-1">Phone: {vendor.contact}</p>
                  <p className="desc-font-xs uppercase">{category}</p>
                </div>
                <div className="flex">
                  <button className="btn-icon" type="button" onClick={() => editVendor(category, vendor)}>
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="btn-icon !mx-4" type="button" onClick={() => handleDeleteVendor(category, vendor.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <Link className="btn-icon" to={`/vendor/${category}/${vendor.id}`}>
                    <ChevronRightIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <VendorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} vendor={currentVendor} onSave={handleModalSave} categories={Object.keys(vendorData)} />
    </div>
  );
};

export default VendorList;