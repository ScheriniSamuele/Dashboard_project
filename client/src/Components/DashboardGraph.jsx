import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, Legend } from 'chart.js/auto';

const DashboardGraph = (props) => {
    const { chartData, chartType } = props;

    const renderGraph = () => {
        return chartType === 'bar' ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />;
    };

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
                    text: 'Time',
                    color: '#c9c7c7',
                },
                ticks: {
                    color: '#c9c7c7',
                    maxTicksLimit: 15,
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

    return <div className='dashboard-graph-box'>{renderGraph()}</div>;
};

export default DashboardGraph;
