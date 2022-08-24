import React from 'react';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, Legend } from 'chart.js/auto';

const DashboardGraph = (props) => {
    const { chartData } = props;

    const options = {
        fill: true,
        spanGaps: 10,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Watt',
                    color: '#c9c7c7',
                },
                ticks: {
                    color: '#c9c7c7',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    color: '#c9c7c7',
                },
                ticks: {
                    color: '#c9c7c7',
                },
            },
        },
        animation: {
            y: {
                duration: 550,
                easing: 'easeOutSine',
            },
            x: {
                duration: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className='dashboard-graph-box'>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DashboardGraph;
