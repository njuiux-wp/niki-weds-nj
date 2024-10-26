import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/solid';
import VendorModal from './VendorModal';
import Loader from '../../widgets/Loader';

const VendorDetail = ({ vendors, setVendors }) => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`${backendUrl}/vendors/${id}`);
        setVendor(response.data);
      } catch (error) {
        console.error('Error fetching vendor:', error);
      }
    };
    fetchVendor();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/vendors/${id}`);
      setVendors((prevVendors) => prevVendors.filter(v => v.id !== id));
      navigate('/vendors');
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  if (!vendor) return <Loader />;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link className="btn-icon fs-14 underline" to="/vendors">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <h2 className="title-font-xl ms-2">Vendor Details</h2>
        </div>
        <button onClick={handleDelete} className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-5">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Name:</span>
          <span className="font-bold">{vendor.name}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Contact:</span>
          <span className="font-bold">{vendor.contactNumber}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Category:</span>
          <span className="font-bold">{vendor.category}</span>
        </p>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-5">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Total Payment:</span>
          <span className="font-bold">Rs.{vendor.totalPayment}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Deposit Paid:</span>
          <span className="font-bold">Rs.{vendor.depositPaid} on {vendor.depositDate}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Remaining Amount:</span>
          <span className="font-bold">Rs.{vendor.totalPayment - vendor.depositPaid}</span>
        </p>
      </div>
      <button onClick={() => setModalIsOpen(true)} className="theme-btn">Edit</button>
      <VendorModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        editingVendor={vendor}
        setVendors={setVendors}
        vendors={vendors}
        onUpdate={(updatedVendor) => setVendor(updatedVendor)} // Update local vendor state
      />
      {/* Transaction Table */}
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {vendor.transactions && vendor.transactions.length > 0 ? (
            vendor.transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.mode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDetail;
