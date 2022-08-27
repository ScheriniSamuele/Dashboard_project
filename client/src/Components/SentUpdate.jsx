import React from 'react';
import { motion } from 'framer-motion';

const SentUpdate = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }} exit={{ opacity: 0 }} className='sent-update-box'>
            <span className='sent-update-container'>Settings Updated Correctly! ✅ </span>
        </motion.div>
    );
};

export default SentUpdate;
