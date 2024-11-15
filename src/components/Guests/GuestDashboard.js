import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import GuestModal from './GuestModal';

// Import Chart.js and register necessary components
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary elements for Chart.js
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GuestDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [totalGuests, setTotalGuests] = useState(0);
    const [guestData, setGuestData] = useState({ Niki: 0, NJ: 0 });

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nwn-backend.onrender.com';

    // Function to fetch guest counts
    const fetchGuestCounts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/guests`);
            const guests = response.data; // Assuming the response structure contains guests for both Niki and Nj
            const nikiCount = guests.filter(guest => guest.category === 'Niki').length;
            const njCount = guests.filter(guest => guest.category === 'NJ').length;

            setGuestData({ Niki: nikiCount, NJ: njCount });
            setTotalGuests(nikiCount + njCount);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    useEffect(() => {
        fetchGuestCounts(); // Call fetchGuestCounts when the component mounts
    }, [backendUrl]);

    const data = {
        labels: ['Niki', 'Nj'],
        datasets: [
            {
                data: [guestData.Niki, guestData.NJ],
                backgroundColor: ['#5a6405', '#9da53d'],
                // backgroundColor: ['#9A2143', '#f8ceda'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return `${data.labels[tooltipItem.dataIndex]}: ${data.datasets[0].data[tooltipItem.dataIndex]} Guests`;
                    },
                },
            },
            datalabels: {
                display: true,
                color: (context) => {
                    const index = context.dataIndex;
                    return index === 0 ? '#fff' : '#000';
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}`;
                },
            },
        },
        maintainAspectRatio: false,
    };

    const handleAddGuest = async (formData) => {
        try {
            await axios.post(`${backendUrl}/guests`, formData);
            setShowModal(false);
            await fetchGuestCounts(); // Refresh guest counts after adding a new guest
        } catch (error) {
            console.error('Error adding guest:', error);
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="title-font-xl">Guests</h2>
                <button onClick={() => setShowModal(true)} className="btn-icon fs-14 underline">Add</button>
            </div>
            <div className="app-card mb-8 overflow-hidden">
                <div className="flex flex-col">
                    <span className="title-font-m">Total Guests</span>
                    <span className="font-bold">{totalGuests}</span>
                </div>
                <Pie data={data} options={options} />
            </div>
            <div className="grid grid-cols-2 gap-4 my-3">
                <Link to="/guests/Niki" className="app-card flex-col">
                    <div className="title-font-m fs-14">Niki's Guests</div>
                    <span className="font-bold">{guestData.Niki}</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
                <Link to="/guests/NJ" className="app-card flex-col">
                    <div className="title-font-m fs-14">Nj's Guests</div>
                    <span className="font-bold">{guestData.NJ}</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
            </div>
            {showModal && (
                <GuestModal isEdit={false} guestData={null} isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddGuest} />
            )}
        </div>
    );
};

export default GuestDashboard;