import React from 'react';

const PeakBox = (props) => {
    const { timePeriod, peakValue } = props;

    return (
        <div className='dashboard-box dashboard-peak'>
            <h2>
                Peak: <span className='dashboard-time-period-label'>{timePeriod}</span>
            </h2>
            <span>
                Value: <span className='peak-date'>{peakValue.total}</span>/Watt
            </span>
            -on-
            <span>
                Day: <span className='peak-data'>{peakValue.data}</span>
            </span>
        </div>
    );
};

export default PeakBox;
