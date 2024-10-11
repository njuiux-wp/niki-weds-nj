import React from 'react';
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary elements for Chart.js
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GuestDashboard = () => {
    const data = {
        labels: ['Niki', 'Nj'],
        datasets: [
            {
                data: [250, 250],
                backgroundColor: ['#9A2143', '#f8ceda'],
            },
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false, // Show legend
                position: 'bottom', // Place legend at the bottom
                labels: {
                    color: '#000', // Legend text color
                },
            },
            tooltip: {
                enabled: true, // Enable tooltips
                callbacks: {
                    label: function (tooltipItem) {
                        return `${data.labels[tooltipItem.dataIndex]}: ${data.datasets[0].data[tooltipItem.dataIndex]} Guests`;
                    },
                },
            },
            datalabels: {
                display: true, // Show data labels directly on the pie chart
                color: (context) => {
                    // Assign colors based on the dataIndex
                    const index = context.dataIndex;
                    return index === 0 ? '#fff' : '#000'; // Example: Niki = #9A2143, Nj = #f8ceda
                },
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}`;
                },
            },
        },
        maintainAspectRatio: false, // Optional: Adjust aspect ratio
    };

    return (
        <div className="w-full">
            <div className="flex items-center mb-6">
                <h2 className="title-font-xl">Guests</h2>
            </div>
            <div className="app-card mb-8 overflow-hidden">
                <div className="flex flex-col">
                    <span className="title-font-m">Total Guests</span>
                    <span className="font-bold">500</span>
                </div>
                <Pie data={data} options={options} />
            </div>
            <div className="grid grid-cols-2 gap-4 my-3">
                <Link to={`/vendors`} className="app-card flex-col">
                    <div className="title-font-m fs-14">Niki's Guests</div>
                    <span className="font-bold">250</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
                <Link to={`/guests`} className="app-card flex-col">
                    <div className="title-font-m fs-14">Nj's Guests</div>
                    <span className="font-bold">250</span>
                    <ChevronRightIcon className="h-6 w-6 App-link" />
                </Link>
            </div>
        </div>
    );
};

export default GuestDashboard;