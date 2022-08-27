import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import axios from 'axios';
import { selectorStyles } from '../Helpers/Configurations';
import Loader from 'react-spinners/MoonLoader';

import '../Styles/Dashboard.css';

import DashboardGraph from '../Components/DashboardGraph';
import PeakBox from '../Components/PeakBox';
import TimeSlotsBox from '../Components/TimeSlotsBox';
import BackToSettings from '../Components/BackToSettings';

const Dashboard = () => {
    const [timePeriod, setTimePeriod] = useState('Last 7 days');
    const [xLabels, setXlabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [peakValue, setPeakValue] = useState({});
    const [chartType, setChartType] = useState('bar');
    const [chartDataErr, setChartDataErr] = useState(false);
    const [loading, setLoading] = useState(true);

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
        { label: 'Last 72 Hours', value: 'Last 72 Hours' },
        { label: 'Last 7 Days', value: 'Last 7 Days' },
        { label: 'Last 30 Days', value: 'Last 30 Days' },
    ];

    // Spinner settings
    const override = {
        display: 'block',
        margin: '5rem auto',
    };

    const changeTimePeriod = (parameter) => {
        setTimePeriod(parameter.value);
        switch (parameter.value) {
            case 'Last 24 Hours':
                fetchDashboardData(process.env.REACT_APP_API_SERVER + 'dashboard/last24h');
                break;
            case 'Last 72 Hours':
                fetchDashboardData(process.env.REACT_APP_API_SERVER + 'dashboard/last72h');
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
        setLoading(true);
        const response = await axios.get(query).catch((err) => {
            if (err) {
                setChartDataErr(true);
                setLoading(false);
            }
        });
        const data = await response.data;
        if (data) setLoading(false);
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
                        loading ? <Loader speedMultiplier={0.8} loading={loading} color={'#A8A8A8'} cssOverride={override} size={100} /> : !chartDataErr ? <DashboardGraph chartData={data} chartType={chartType} /> : <BackToSettings />
                    }
                </div>
                <PeakBox timePeriod={timePeriod} peakValue={peakValue} />
                <TimeSlotsBox timePeriod={timePeriod} />
            </div>
        </motion.div>
    );
};

export default Dashboard;
