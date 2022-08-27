import React from 'react';
import { Link } from 'react-router-dom';

const BackToSettings = () => {
    return (
        <div className='back-to-settings-box'>
            <div className='back-to-settings-container'>
                <span className='back-to-settings-text'>
                    An error occured while retrieving data. <br /> Please select a different path.
                </span>
                <Link to='/Settings' className='back-to-settings-button'>
                    Go Back To Settings
                </Link>
            </div>
        </div>
    );
};

export default BackToSettings;
