import React from 'react';
import { selectorStyles } from '../Helpers/Configurations';
import Select from 'react-select';

let options = [];

const compareContract = (props) => {
    const { compareFunction, contracts, setOtherContractLabel } = props;

    options = [];
    contracts.forEach((contract) => options.push({ label: contract.label, value: contract.label }));

    const changeLabel = (parameter) => {
        console.log(parameter.value);
        const label = parameter.value;
        setOtherContractLabel(label);
    };

    return (
        <div className='cost-column-compare'>
            <Select styles={selectorStyles} className='cost-input-select' onChange={changeLabel} options={options} placeholder='Choose a contract...'></Select>
            <div className='cost-compare-text'>You will display all the costs relative to the chosen contract.</div>
            <input className='cost-input-button' type='button' value='compare' onClick={compareFunction} />
        </div>
    );
};

export default compareContract;
