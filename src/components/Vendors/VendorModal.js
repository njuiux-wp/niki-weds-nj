import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';

const VendorModal = ({ isOpen, onRequestClose, editingVendor, setVendors, vendors, onUpdate }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [depositPaid, setDepositPaid] = useState('');
  const [depositDate, setDepositDate] = useState('');
  const [category, setCategory] = useState('Caterers');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    if (editingVendor) {
      setName(editingVendor.name);
      setContactNumber(editingVendor.contactNumber);
      setTotalPayment(editingVendor.totalPayment);
      setDepositPaid(editingVendor.depositPaid);
      setDepositDate(editingVendor.depositDate);
      setCategory(editingVendor.category);
    } else {
      // Reset fields for a new vendor
      setName('');
      setContactNumber('');
      setTotalPayment('');
      setDepositPaid('');
      setDepositDate('');
      setCategory('Caterers');
    }
  }, [editingVendor, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVendor = { name, contactNumber, totalPayment, depositPaid, depositDate, category };

    try {
      let response;
      if (editingVendor) {
        response = await axios.put(`${backendUrl}/vendors/${editingVendor._id}`, newVendor);
        setVendors((prevVendors) =>
          prevVendors.map((vendor) => (vendor._id === editingVendor._id ? response.data : vendor))
        );
        onUpdate(response.data); // Call the update callback
      } else {
        response = await axios.post(`${backendUrl}/vendors`, newVendor);
        setVendors((prevVendors) => [...prevVendors, response.data]);
      }
      onRequestClose();
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="vendorModal">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title-font-xl">{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</h2>
        <button className="btn-icon" onClick={onRequestClose}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Vendor Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Contact Number</label>
          <input
            type="text"
            className="form-input"
            maxLength={10}
            value={contactNumber}
            onChange={(e) => {
              const cn = e.target.value;
              // Allow only digits and respect maxLength
              if (/^\d*$/.test(cn) && cn.length <= 10) {
                setContactNumber(cn);
              }
            }}
            required
          />
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Total Payment Amount</label>
          <input
            type="text"
            className="form-input"
            maxLength={7}
            value={totalPayment}
            onChange={(e) => setTotalPayment(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="desc-font-xs uppercase mb-1">Deposit Paid Amount</label>
            <input
              type="text"
              className="form-input"
              maxLength={7}
              value={depositPaid}
              onChange={(e) => setDepositPaid(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="desc-font-xs uppercase mb-1">Deposit Date</label>
            <input
              type="date"
              className="form-input"
              value={depositDate}
              onChange={(e) => setDepositDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Category</label>
          <select
            className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Caterers">Caterers</option>
            <option value="Decorators">Decorators</option>
            <option value="Location Owner">Location Owner</option>
          </select>
        </div>
        <button type="submit" className="theme-btn">{editingVendor ? 'Update' : 'Add'}</button>
      </form>
    </Modal>
  );
};

export default VendorModal;