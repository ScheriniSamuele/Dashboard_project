import React from 'react';

const PeakBox = (props) => {
    const { timePeriod, peakValue } = props;

    return (
        <div className='dashboard-box dashboard-peak'>
            <h2>{timePeriod}</h2>
            Peak found at {peakValue.data}
            <br />
            value: {peakValue.total}
        </div>
    );
};

export default PeakBox;
