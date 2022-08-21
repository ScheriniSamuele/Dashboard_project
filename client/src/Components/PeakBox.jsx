import React from 'react';

const PeakBox = (props) => {
    const { timePeriod } = props;

    return (
        <div className='dashboard-box dashboard-peak'>
            <h2>{timePeriod}</h2>
        </div>
    );
};

export default PeakBox;
