import React from 'react';

const InputPath = (props) => {
    const { inputPath, setInputPath } = props;

    return (
        <div className='settings-input-path'>
            <label className='input-label'>.csv file path</label>
            <input className='text-input settings-input-path-box' type='text' name='inputPath' value={inputPath} onChange={(e) => setInputPath(e.target.value)} />
        </div>
    );
};

export default InputPath;
