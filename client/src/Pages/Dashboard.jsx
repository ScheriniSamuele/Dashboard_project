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
    const [chartType, setChartType] = useState('bar');
    const [chartDataErr, setChartDataErr] = useState(false);

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
                    const area = context.chart.chartArea;
                    if (area) {
                        const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
                        gradient.addColorStop(1, '#ffb849');
                        gradient.addColorStop(0, '#b450f2');
                        return gradient;
                    }
                },
            },
        ],
    };

    // Select config
    let options = [
        { label: 'Last 24 Hours', value: 'Last 24 Hours' },
        { label: 'Last 7 Days', value: 'Last 7 Days' },
        { label: 'Last 30 Days', value: 'Last 30 Days' },
    ];

    const changeTimePeriod = (parameter) => {
        setTimePeriod(parameter.value);
        switch (parameter.value) {
            case 'Last 24 Hours':
                fetchDashboardData(process.env.REACT_APP_API_SERVER + 'dashboard/last24h');
                break;
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

    const fetchDashboardData = async (query) => {
        const response = await axios.get(query).catch((err) => {
            if (err) {
                setChartDataErr(true);
            }
        });

        const data = await response.data;
        setChartData(data.arrayData.map((x) => x.total));
        setXlabels(data.arrayData.map((x) => x.data));
        setPeakValue(data.peak);
        setChartType(data.graphType);
    };

    return (
        <motion.div className='dashboard-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Dashboard</h1>
            <div className='dashboard-grid-content'>
                <div className='dashboard-box dashboard-graph-container'>
                    <div className='dashboard-graph-controls'>
                        <h2>
                            Enery Usage:<span className='dashboard-box dashboard-time-period-label'>{timePeriod}</span>
                        </h2>
                        <Select styles={selectorStyles} className='input-select-dashboard' options={options} onChange={changeTimePeriod} value={{ label: timePeriod, value: timePeriod }}></Select>
                    </div>
                    {
                        // add back to settings component
                        !chartDataErr ? <DashboardGraph chartData={data} chartType={chartType} /> : 'Errore, cambia il file'
                    }
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
