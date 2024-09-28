import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../../widgets/ProgressBar';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const VendorDetail = () => {
  const { category, id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  // Use environment variable for backend URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://niki-weds-nj.onrender.com'; 

  useEffect(() => {
    axios.get(`${backendUrl}/vendors/${category}/${id}`)
      .then(response => {
        setVendor(response.data);
        setPayments(response.data.payments);
      })
      .catch(error => {
        console.error("Error fetching vendor:", error);
      });
  }, [category, id]);

  const handleDelete = () => {
    axios.delete(`${backendUrl}/vendors/${category}/${id}`)
      .then(() => navigate('/dashboard')) // Update navigation method
      .catch(error => console.error("Error deleting vendor:", error));
  };

  const handleAddPayment = () => {
    const payment = {
      paidBy: 'Client',
      paymentVia: 'Bank Transfer',
      amount: 1000,
      date: new Date().toISOString().split('T')[0],
    };

    axios.post(`${backendUrl}/vendors/${category}/${id}/payments`, payment)
      .then(response => {
        setPayments([...payments, response.data]);
        setVendor(prev => ({
          ...prev,
          depositPaid: prev.depositPaid + payment.amount,
          payments: [...prev.payments, response.data],
        }));
      })
      .catch(error => console.error("Error adding payment:", error));
  };

  if (!vendor) return <div>Loading...</div>; // Consider a loading spinner here

  const totalPayments = vendor.payments.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link className="btn-icon fs-14 underline" to="/">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <h2 className="title-font-xl ms-2">Vendor's Details</h2>
        </div>
        <button className="theme-btn !w-[30px] !h-[30px] !p-0 !flex items-center justify-center" onClick={handleDelete}>
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="app-card flex flex-col !justify-start gap-4 mb-4">
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Name:</span>
          <span className="font-bold">{vendor.name}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Phone:</span>
          <span className="font-bold">{vendor.contact}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Total Amount:</span>
          <span className="font-bold">Rs.{vendor.totalAmount}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Deposit Paid:</span>
          <span className="font-bold">Rs.{vendor.depositPaid}</span>
        </p>
        <p className="title-font-m flex flex-col w-full">
          <span className="desc-font-xs uppercase">Remaining Amount:</span>
          <span className="font-bold">Rs.{vendor.totalAmount - vendor.depositPaid}</span>
        </p>
      </div>
      <ProgressBar total={vendor.totalAmount} paid={vendor.depositPaid} />
      <div className="flex !justify-between mt-2 w-full">
        <p className="flex items-center">
          <span className="app-theme-bg-burgundy w-3 h-3 rounded-full shadow mr-2"></span>
          <span className="desc-font-xs uppercase font-bold">Paid Amount</span>
        </p>
        <p className="flex items-center">
          <span className="app-theme-bg-light-mehendi w-3 h-3 rounded-full shadow mr-2"></span>
          <span className="desc-font-xs uppercase font-bold">Total Amount</span>
        </p>
      </div>
      {/* <h3>Payments</h3> */}
      {/* <table>
        <thead>
          <tr>
            <th>Paid By</th>
            <th>Payment Via</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id || index}>
              <td>{payment.paidBy}</td>
              <td>{payment.paymentVia}</td>
              <td>${payment.amount}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* <button onClick={handleAddPayment}>Add Payment</button> */}
    </div>
  );
};

export default VendorDetail;
