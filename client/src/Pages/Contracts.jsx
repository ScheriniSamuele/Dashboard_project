import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as yup from 'yup';
import { Icon } from '@iconify/react';

import InputLabel from '../Components/InputLabel';
import InputContractAdd from '../Components/InputContractAdd';
import InputCostsAdd from '../Components/InputCostsAdd';

//import SentUpdate from '../Components/SentUpdate';

import '../Styles/Settings.css';
import AddedContracts from '../Components/AddedContracts';

const Settings = () => {
    const [timeSlots, setTimeSlots] = useState('multi-slots');
    const [errorMsg, setErrorMsg] = useState('');
    const [costs, setCosts] = useState([]);
    const [label, setLabel] = useState('');

    const contractSchema = yup.object().shape({
        label: yup.string().required(),
        typology: yup.string().required(),
        costs: yup.array().of(yup.number()).min(1).required(),
    });

    const addContract = async (e) => {
        e.preventDefault();

        const userSettings = {
            label: label,
            typology: timeSlots,
            costs: costs,
        };

        try {
            await contractSchema.validate(userSettings); // Yup validate userSettings based on schema
        } catch (error) {
            setErrorMsg(error.errors); // Errors from client side validation
            return;
        }

        const query = process.env.REACT_APP_API_SERVER + 'contracts/addContract'; // Query string

        await axios
            .put(query, userSettings)
            .catch((err) => {
                if (err) {
                    setErrorMsg(err.response.data.errorMsg); // Errors from server
                    return;
                }
            })
            .then((res) => {
                if (res) {
                    setErrorMsg('');
                    alert('Contract added correctly');
                }
            });
    };

    const changeTimeSlots = (parameter) => {
        const chosenTimeSlots = parameter.value;
        setTimeSlots(chosenTimeSlots);
        setCosts([...costs]);
    };

    return (
        <motion.div className='settings-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            <h1 className='section-title'>Add a contract</h1>
            <InputLabel setLabel={setLabel} />
            <form className='settings-form'>    
                <InputContractAdd timeSlots={timeSlots} changeTimeSlots={changeTimeSlots} />
                <InputCostsAdd timeSlots={timeSlots} costs={costs} setCosts={setCosts} />

                <div className='settings-update-button-wrapper' onClick={addContract}>
                    <Icon icon='fluent:add-circle-24-regular' className='settings-update-button' />
                </div>
            </form>

            <div className='settings-error-msg'>{errorMsg}</div>

            <AddedContracts />
        </motion.div>
    );
};

export default Settings;