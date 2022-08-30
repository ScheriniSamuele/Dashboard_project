import React from 'react';

const CostColumnValues = (props) => {
    const { contractData } = props;

    return (
        <div className='cost-column-values'>
            <div className='cost-column-value'>
                <span className='cost-column-values-label'>Average Day: </span>
                <input type='text' className='cost-column-value-box' readOnly value={contractData.costs.daily} />
            </div>
            <div className='cost-column-value'>
                <span className='cost-column-values-label'>Average Month:</span>
                <input type='text' className='cost-column-value-box' readOnly value={contractData.costs.monthly} />
            </div>
            <div className='cost-column-value'>
                <span className='cost-column-values-label'>Average Year:</span>
                <input type='text' className='cost-column-value-box' readOnly value={contractData.costs.annual} />
            </div>
        </div>
    );
};

export default CostColumnValues;
