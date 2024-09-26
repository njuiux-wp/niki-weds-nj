import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/solid';

const VendorModal = ({ isOpen, onClose, vendor, onSave, categories }) => {
  const [vendorName, setVendorName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [depositPaid, setDepositPaid] = useState(0);
  const [category, setCategory] = useState(''); // New state for category

  useEffect(() => {
    if (vendor) {
      setVendorName(vendor.name);
      setContactNumber(vendor.contact);
      setTotalAmount(vendor.totalAmount);
      setDepositPaid(vendor.depositPaid);
      setCategory(vendor.category || ''); // Set the category if editing
    } else {
      setVendorName('');
      setContactNumber('');
      setTotalAmount('');
      setDepositPaid('');
      setCategory(''); // Reset category
    }
  }, [vendor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVendor = {
      name: vendorName,
      contact: contactNumber,
      totalAmount,
      depositPaid,
      payments: [], // Initialize with empty array
      category, // Include the category here
    };
    onSave(newVendor);
    onClose();
  };

  return (
    <Modal className="vendorModal" isOpen={isOpen} onRequestClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="title-font-xl">{vendor ? 'Edit' : 'Add'} Vendor</h2>
        <button className="btn-icon" type="button" onClick={onClose}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Vendor Name</label>
          <input
            type="text"
            className="form-input"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
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
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Category</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Total Amount</label>
          <input
            type="number"
            className="form-input"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label className="desc-font-xs uppercase mb-1">Deposit Paid</label>
          <input
            type="text"
            pattern="[0-9]*"
            maxLength="6"
            onInput={(e) => e.target.value = e.target.value.slice(0, 6)} 
            className="form-input"
            value={depositPaid}
            onChange={(e) => setDepositPaid(Number(e.target.value))}
            required
          />
        </div>
        <button className="theme-btn mt-6" type="submit">{vendor ? 'Update' : 'Add'}</button>
      </form>
    </Modal>
  );
};

export default VendorModal;
