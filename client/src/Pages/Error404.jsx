import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../Styles/Error404.css';

const Error404 = () => {
    return (
        <motion.div className='container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <div className='error404'>
                <h1>Error 404 - page not found</h1>

                <Link className='link' to='/'>
                    return to main page
                </Link>
            </div>
        </motion.div>
    );
};

export default Error404;
