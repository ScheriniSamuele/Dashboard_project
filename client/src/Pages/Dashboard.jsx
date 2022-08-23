import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import axios from 'axios';
import { selectorStyles } from '../Helpers/Configurations';

import '../Styles/Dashboard.css';

import DashboardGraph from '../Components/DashboardGraph';
import PeakBox from '../Components/PeakBox';

const Dashboard = () => {
    const [timePeriod, setTimePeriod] = useState('Last 7 days');
    const [xLabels, setXlabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [peakValue, setPeakValue] = useState({});

    useEffect(() => {
        const query = process.env.REACT_APP_API_SERVER + 'dashboard/last7days'; // Query string
        fetchDashboardData(query);
    }, []);

    // Graph config
    let data = {
        labels: xLabels,
        datasets: [
            {
                data: chartData,
                borderColor: '#ffb849',
                lineTension: 0.2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, '#ffb849');
                    gradient.addColorStop(1, 'rgba(255, 184, 73,0.2)');
                    return gradient;
                },
            },
        ],
    };

    // Select config
    let options = [
        { label: 'Last 7 Days', value: 'Last 7 Days' },
        { label: 'Last 30 Days', value: 'Last 30 Days' },
    ];

    const changeTimePeriod = (parameter) => {
        setTimePeriod(parameter.value);
        switch (parameter.value) {
            case 'Last 7 Days':
                fetchDashboardData(process.env.REACT_APP_API_SERVER + 'dashboard/last7days'); // Query string
                break;
            case 'Last 30 Days':
                fetchDashboardData(process.env.REACT_APP_API_SERVER + 'dashboard/last30days');
                break;
            default:
                console.log('should never reach this value');
        }
    };

    const fetchDashboardData = (query) => {
        axios
            .get(query)
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
            .then((res) => {
                setChartData(res.data.arrayData.map((x) => x.total));
                setXlabels(res.data.arrayData.map((x) => x.data));
                setPeakValue(res.data.peak);
            });
    };

    return (
        <motion.div className='dashboard-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Dashboard</h1>
            <div className='dashboard-grid-content'>
                <div className='dashboard-box dashboard-graph-container'>
                    <div className='dashboard-graph-controls'>
                        <h2>
                            Enery Usage: <span className='dashboard-box dashboard-time-period-label'>{timePeriod}</span>
                        </h2>
                        <Select styles={selectorStyles} className='input-select' options={options} onChange={changeTimePeriod} value={{ label: timePeriod, value: timePeriod }}></Select>
                    </div>
                    {<DashboardGraph chartData={data} />}
                </div>
                <PeakBox timePeriod={timePeriod} peakValue={peakValue} />
                <div className='dashboard-box dashboard-usage'>
                    <h2>Energy usage based on Time slots: {timePeriod}</h2>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
