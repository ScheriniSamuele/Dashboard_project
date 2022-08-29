import React from 'react';

const TimeSlotsBox = (props) => {
    const { timePeriod, timeSlotsData } = props;

    const renderTimeSlotsValues = () => {
        if (typeof timeSlotsData[0] !== 'undefined') {
            const labels = Object.keys(timeSlotsData[0]);
            const values = Object.values(timeSlotsData[0]);

            const timeSlots = {};

            labels.forEach((element, index) => {
                timeSlots[element] = values[index].toFixed(3);
            });

            return Object.keys(timeSlots).map((key, index) => {
                return (
                    <div key={index}>
                        <span className='dashboard-usage-text'>
                            <span className={key === 'F1' ? 'purpleText' : key === 'F2' ? 'yellowText' : 'redText'}>{key}</span> : {timeSlots[key]}
                        </span>
                        /Watt
                    </div>
                );
            });
        }
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
