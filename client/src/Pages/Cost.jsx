import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Icon } from '@iconify/react';

import CostColumnValues from '../Components/CostColumnValues';
import CompareContract from '../Components/CompareContract';
import OtherCostColumnValues from '../Components/OtherCostColumnValues';

import '../Styles/Cost.css';

const Cost = () => {
    const [contractData, setContractData] = useState({
        costs: {
            daily: '',
            monthly: '',
            annual: '',
        },
    });

    const [otherContractLabel, setOtherContractLabel] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [contracts, setContracts] = useState([]);

    // For cotract list
    const [otherContracts, setOtherContracts] = useState([]);

    const compare = () => {
        const query = process.env.REACT_APP_API_SERVER + 'cost/getCosts'; // Query string
        compareCosts(query);
    };

    useEffect(() => {
        const query = process.env.REACT_APP_API_SERVER + 'cost/getCosts'; // Query string
        fetchCosts(query);
        const query_contract = process.env.REACT_APP_API_SERVER + 'contracts/getContracts';
        fetchContracts(query_contract);
    }, []);

    const fetchContracts = async (query) => {
        const response = await axios.get(query).catch((err) => {
            if (err) {
                console.log(err);
            }
        });
        const data = await response.data;
        console.log(data);
        setContracts(data.contracts);
    };

    const fetchCosts = async (query) => {
        const response = await axios.post(query).catch((err) => {
            if (err) {
                console.log(err);
            }
        });
        const data = await response.data;
        setContractData({
            costs: {
                daily: data.dailyCost.toFixed(3) + ' euros',
                monthly: data.monthlyCost.toFixed(3) + ' euros',
                annual: data.annualCost.toFixed(3) + ' euros',
            },
        });
    };

    const compareCosts = async () => {
        const body = {
            label: otherContractLabel,
        };

        const query = process.env.REACT_APP_API_SERVER + 'cost/getCosts'; // Query string
        const response = await axios.post(query, body).catch((err) => {
            if (err) {
                setErrorMsg(err.response.data.errorMsg);
            }
        });

        const data = await response.data;

        if (data) setErrorMsg('');

        setOtherContracts((otherContracts) => [
            ...otherContracts,
            {
                label: data.label,
                costs: {
                    daily: data.dailyCost.toFixed(3) + ' euros',
                    monthly: data.monthlyCost.toFixed(3) + ' euros',
                    annual: data.annualCost.toFixed(3) + ' euros',
                },
            },
        ]);
    };

    const removeContract = (index) => {
        setOtherContracts((contracts) => contracts.filter((_, i) => i !== index));
    };

    return (
        <motion.div className='cost-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Costs</h1>
            <div className='cost-flex-content'>
                <div className='cost-column'>
                    <h3 className='cost-column-title'>How much do I spend?</h3>
                    <CostColumnValues contractData={contractData} />
                </div>
                <div className='cost-column'>
                    <h3 className='cost-column-title'>Compare</h3>
                    <CompareContract compareFunction={compare} contracts={contracts} setOtherContractLabel={setOtherContractLabel} />
                </div>
                {otherContracts.map((comparedContract, index) => {
                    return (
                        <div className='cost-column ' key={index}>
                            <h3 className={`cost-column-title  ${index % 2 === 0 ? 'yellowText' : 'purpleText'}`}>{comparedContract.label}</h3>
                            <OtherCostColumnValues contractData={comparedContract} />
                            <div className='cost-remove-button' onClick={() => removeContract(index)}>
                                <Icon className='cost-del-icon' icon='ion:trash-bin-outline' color='white' />
                            </div>
                        </div>
                    );
                })}
            </div>
            <span className='cost-text-bottom'>
                <div className='settings-error-msg'>{errorMsg}</div>
                <h3 className='cost-information-label'>based on your last 30 days data</h3>
            </span>
        </motion.div>
    );
};

export default Cost;
