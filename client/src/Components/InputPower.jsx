import React from 'react';

const InputPower = (props) => {
    const { power, setPower } = props;

    return (
        <div className='settings-input-power'>
            <label className='input-label'>Available power (daily)</label>
            <input className='text-input settings-input-power-box' type='text' name='power' value={power} onChange={(e) => setPower(e.target.value)} />
        </div>
    );
};

export default InputPower;
