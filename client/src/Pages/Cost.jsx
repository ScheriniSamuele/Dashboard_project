import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as yup from 'yup';

import CostColumnValues from '../Components/CostColumnValues';
import CompareContract from '../Components/compareContract';

import '../Styles/Cost.css';

const Cost = () => {
    const [contractData, setContractData] = useState({
        costs: {
            daily: '',
            monthly: '',
            annual: '',
        },
    });

    const [otherContractData, setOtherContractData] = useState({
        costs: {
            daily: 0,
            monthly: 0,
            annual: 0,
        },
    });

    const [timeSlots, setTimeSlots] = useState('single-slot');
    const [costs, setCosts] = useState([]);
    const [slots, setSlots] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const compareSchema = yup.object().shape({
        typology: yup.string().required(),
        costs: yup.array().of(yup.number()).min(1).required(),
    });

    const compare = () => {
        const query = process.env.REACT_APP_API_SERVER + 'cost/getCosts'; // Query string
        compareCosts(query);
    };

    useEffect(() => {
        const query = process.env.REACT_APP_API_SERVER + 'cost/getCosts'; // Query string
        fetchCosts(query);
    }, []);

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

    const compareCosts = async (query) => {
        const body = {
            typology: timeSlots,
            costs: costs,
        };

        try {
            await compareSchema.validate(body); // Yup validate userSettings based on schema
        } catch (error) {
            setErrorMsg(error.errors); // Errors from client side validation
            return;
        }

        const response = await axios.post(query, body).catch((err) => {
            if (err) {
                setErrorMsg(err.response.data.errorMsg); // Errors from server
            }
        });
        const data = await response.data;

        setOtherContractData({
            costs: {
                daily: data.dailyCost.toFixed(3) + ' euros',
                monthly: data.monthlyCost.toFixed(3) + ' euros',
                annual: data.annualCost.toFixed(3) + ' euros',
            },
        });
        if (data) setErrorMsg('');
        resetForm();
    };

    const resetForm = () => {
        const el = document.getElementsByClassName('text-input');
        el.value = '';
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
                    <CompareContract compareFunction={compare} slots={slots} setSlots={setSlots} timeSlots={timeSlots} setTimeSlots={setTimeSlots} costs={costs} setCosts={setCosts} />
                </div>
                <div className='cost-column'>
                    <h3 className='cost-column-title'>How much would I spend?</h3>
                    <CostColumnValues contractData={otherContractData} />
                </div>
                <span className='cost-text-bottom'>
                    <div className='settings-error-msg'>{errorMsg}</div>
                    <h3 className='cost-information-label'>based on your last 30 days data</h3>
                </span>
            </div>
        </motion.div>
    );
};

export default Cost;
