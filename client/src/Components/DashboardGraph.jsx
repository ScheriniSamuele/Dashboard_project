import React from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, Legend } from 'chart.js/auto';

const DashboardGraph = (props) => {
    const { chartData } = props;

    const options = {
        fill: true,
        spanGaps: 10,
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
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DashboardGraph;
