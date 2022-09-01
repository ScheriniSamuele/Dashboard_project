import React from 'react';

const InputLabel = (props) => {
    const { setLabel } = props;

    return (
        <div className='settings-input-label'>
            <label className='input-label'>Contract Label: &nbsp; </label>
            <input className='text-input settings-input-label-box' type='text' name='power' onChange={(e) => setLabel(e.target.value)} />
        </div>
    );
};

export default InputLabel;
