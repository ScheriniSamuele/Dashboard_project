import React from 'react';

const TimeSlotsBox = (props) => {
    const { timePeriod } = props;

    const renderTimeSlotsValues = () => {
        return <div>{timePeriod}</div>;
    };

    return (
        <div className='dashboard-box dashboard-usage'>
            <h2>
                Usage based on Time slots: <span className='dashboard-time-period-label'>{timePeriod}</span>
            </h2>
            {renderTimeSlotsValues()}
        </div>
    );
};

export default TimeSlotsBox;
