import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DoughnutChart from './DoughnutChart';
import { selectorStyles } from '../Helpers/Configurations';
import { Icon } from '@iconify/react';

const InputContract = (props) => {
    const { timeSlots, changeTimeSlots, setOpenPopup } = props;

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                labels: [],
                data: [],
                backgroundColor: [],
            },
        ],
    });

    useEffect(() => {
        if (timeSlots === 'single-slot') {
            setData({
                labels: ['F1'],
                datasets: [
                    {
                        labels: ['F1'],
                        data: [1],
                        backgroundColor: ['#B098FF'],
                    },
                ],
            });
        }

        if (timeSlots === 'double-slots') {
            setData({
                labels: ['F1', 'F23'],
                datasets: [
                    {
                        labels: ['F1', 'F23'],
                        data: [1, 1.5],
                        backgroundColor: ['#B098FF', '#FCFF6F'],
                    },
                ],
            });
        }

        if (timeSlots === 'multi-slots') {
            setData({
                labels: ['F1', 'F2', 'F3'],
                datasets: [
                    {
                        labels: ['F1', 'F2', 'F3'],
                        data: [1.4, 2, 2],
                        backgroundColor: ['#B098FF', '#FCFF6F', '#F16D6D'],
                    },
                ],
            });
        }
    }, [timeSlots]);

    let options = [
        { label: 'single-slot', value: 'single-slot' },
        { label: 'double-slots', value: 'double-slots' },
        { label: 'multi-slots', value: 'multi-slots' },
    ];

    return (
        <div className='settings-box input-contract-main'>
            <div className='input-contract-select-main'>
                <h1 className='settings-input-title'>Contract type: </h1>
                <Select styles={selectorStyles} className='input-select' options={options} onChange={changeTimeSlots} value={{ label: timeSlots, value: timeSlots }}></Select>
            </div>
            <DoughnutChart chartData={data} />

            <div className='wrap'>
                <Icon
                    className='settings-icon'
                    onClick={() => {
                        setOpenPopup(true);
                    }}
                    icon='mdi:information-outline'
                />
            </div>
        </div>
    );
};

export default InputContract;
