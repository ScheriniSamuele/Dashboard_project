import React from 'react';
import { motion } from 'framer-motion';

import '../Styles/Dashboard.css';

const Dashboard = () => {
    return (
        <motion.div className='dashboard-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Dashboard</h1>
        </motion.div>
    );
};

export default Dashboard;
