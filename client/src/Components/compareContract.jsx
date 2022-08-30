import React from 'react';
import { selectorStyles } from '../Helpers/Configurations';
import Select from 'react-select';

let options = [
    { label: 'single-slot', value: 'single-slot' },
    { label: 'double-slots', value: 'double-slots' },
    { label: 'multi-slots', value: 'multi-slots' },
];

const compareContract = (props) => {
    const { compareFunction, setTimeSlots, costs, setCosts, timeSlots } = props;

    const changeTimeSlots = (parameter) => {
        const chosenTimeSlots = parameter.value;
        setTimeSlots(chosenTimeSlots);
    };

    const onCostChange = (e, index) => {
        costs[index] = e.target.value;
        setCosts(costs);
    };

    const showInputs = () => {
        if (timeSlots === options[0].label) {
            return (
                <div>
                    <label className='cost-labels'> F1: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 0)} />
                </div>
            );
        } else if (timeSlots === options[1].label) {
            return (
                <div>
                    <label className='cost-labels'> F1: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 0)} />
                    <label className='cost-labels'> F23: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 1)} />
                </div>
            );
        } else if (timeSlots === options[2].label) {
            return (
                <div>
                    <label className='cost-labels'> F1: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 0)} />
                    <label className='cost-labels'> F2: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 1)} />
                    <label className='cost-labels'> F3: </label>
                    <input className='text-input ' name='costs' type='text' onChange={(e) => onCostChange(e, 2)} />
                </div>
            );
        }
    };

    return (
        <div className='cost-column-compare'>
            <Select styles={selectorStyles} className='cost-input-select' options={options} onChange={changeTimeSlots} value={{ label: timeSlots, value: timeSlots }}></Select>
            <form action='#' className='cost-input-form'>
                {showInputs()}
                <input className='cost-input-button' type='button' value='compare' onClick={compareFunction} />
            </form>
        </div>
    );
};

export default compareContract;
