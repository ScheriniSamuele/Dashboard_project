import React from 'react';
import { motion } from 'framer-motion';

import '../Styles/Documentation.css';

const Documentation = () => {
    return (
        <motion.div className='documentation-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Documentation</h1>
        </motion.div>
    );
};

export default Documentation;
