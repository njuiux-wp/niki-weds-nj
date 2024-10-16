import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import ProgressBar from '../widgets/ProgressBar';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary elements for Chart.js
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const BudgetTracker = () => {
  const [vendorPayments, setVendorPayments] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/vendors`);
        const vendors = response.data;

        // Group vendors by category and sum their paid and remaining amounts
        const vendorMap = vendors.reduce((acc, vendor) => {
          const category = vendor.category;

          // If the category already exists, add the amounts to it
          if (acc[category]) {
            acc[category].paid += vendor.depositPaid;
            acc[category].remaining += vendor.totalPayment - vendor.depositPaid;
            acc[category].total += vendor.totalPayment;
          } else {
            // Otherwise, create a new entry for the category
            acc[category] = {
              category,
              paid: vendor.depositPaid,
              remaining: vendor.totalPayment - vendor.depositPaid,
              total: vendor.totalPayment,
            };
          }

          return acc;
        }, {});

        // Convert the object back into an array
        const vendorPaymentData = Object.values(vendorMap);

        // Calculate total paid and remaining amounts across all categories
        const totalPaidAmount = vendorPaymentData.reduce((sum, vendor) => sum + vendor.paid, 0);
        const totalRemainingAmount = vendorPaymentData.reduce((sum, vendor) => sum + vendor.remaining, 0);

        setVendorPayments(vendorPaymentData);
        setTotalPaid(totalPaidAmount);
        setTotalRemaining(totalRemainingAmount);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendors();
  }, []);

  const data = {
    labels: ['Paid', 'Remaining'],
    datasets: [
      {
        data: [totalPaid, totalRemaining],
        backgroundColor: ['#9A2143', '#f8ceda'],
      },
    ],
  };

  // Pie chart options with data labels
  const options = {
    plugins: {
      datalabels: {
        font: {
          weight: 'bold',
          size: 16,
        },
        color: (context) => {
          // Assign colors based on the dataIndex
          const index = context.dataIndex;
          return index === 0 ? '#fff' : '#000';
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${value}`;
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <h2 className="title-font-xl">Budget Tracker</h2>
      </div>
      <Pie data={data} options={options} />
      <h3 className="mt-8 title-font-m mb-3">Vendor Payment Details</h3>
      <ul>
        {vendorPayments.map((vendor, index) => (
          <li key={index} className="mb-6">
            <div className="flex flex-col items-center justify-between">
              <span className="w-full flex items-center justify-between mb-1">
                <span className="fs-14">{vendor.category}</span>
                <span className="fs-12">Total [Rs.{vendor.total}]</span>
              </span>
              <ProgressBar total={vendor.total} paid={vendor.paid} />
              <span className="w-full flex items-center justify-between mt-1">
                <span className="fs-12 font-[500]">Paid [Rs.{vendor.paid}]</span>
                <span className="fs-12">Remaining [Rs.{vendor.remaining}]</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;