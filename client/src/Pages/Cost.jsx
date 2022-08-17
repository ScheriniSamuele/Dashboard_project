import React from 'react';
import { motion } from 'framer-motion';

import '../Styles/Cost.css';

const Cost = () => {
    return (
        <motion.div className='cost-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Cost</h1>
        </motion.div>
    );
};

export default Cost;
