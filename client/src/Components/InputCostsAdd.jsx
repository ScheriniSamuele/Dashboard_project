import React, { useState, useEffect } from 'react';
//import * as chartjs from 'chart.js';

import '../Styles/Settings.css';

//TODO add cost to the costs array

const InputCostsAdd = (props) => {
    const { timeSlots, costs, setCosts } = props;
    const [slots, setSlots] = useState([]);

    const onCostChange = (e, index) => {
        costs[index] = e.target.value;
        setCosts(costs);
    };

    useEffect(() => {
        if (timeSlots === 'single-slot') {
            setSlots(['F1']);
            costs.length = 1;
        }

        if (timeSlots === 'double-slots') {
            setSlots(['F1', 'F23']);
            costs.length = 2;
        }

        if (timeSlots === 'multi-slots') {
            setSlots(['F1', 'F2', 'F3']);
            costs.length = 3;
        }
    }, [timeSlots, costs]);

    // Shows the inputs based on the number of slots selected
    const showInputs = () => {
        return slots.map((slot, index) => (
            <span key={slot} className={slots.length === 1 ? 'single-cost-input' : index === 0 ? 'first-cost-input' : 'cost-inputs'}>
                <label className='cost-labels'> {slot}: </label>
                <input className='text-input text-input-costs' name='costs' type='text' onChange={(e) => onCostChange(e, index)} />
            </span>
        ));
    };

    return (
        <div className='settings-box settings-input-cost-main'>
            <h1 className='settings-input-title'>Cost (euro / KWh)</h1>
            {slots.length ? <div>{showInputs()}</div> : null}
        </div>
    );
};

export default InputCostsAdd;
