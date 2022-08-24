import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as yup from 'yup';
import { Icon } from '@iconify/react';

import InputContract from '../Components/InputContract';
import InputCosts from '../Components/InputCosts';
import InputPower from '../Components/InputPower';
import InputPath from '../Components/InputPath';
import Popup from '../Components/Popup';

import '../Styles/Settings.css';

const Settings = () => {
    const [timeSlots, setTimeSlots] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [userCosts, setUserCosts] = useState([]);
    const [power, setPower] = useState('');
    const [inputPath, setInputPath] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const settingsSchema = yup.object().shape({
        power: yup
            .number()
            .test('is-decimal', 'Power must be decimal', (value) => (value + '').match(/^\d*\.{1}\d*$/))
            .required(),
        inputPath: yup.string().required(),
        typology: yup.string().required(),
        costs: yup.array().min(1).required(),
    });

    useEffect(() => {
        fetchUserSettings();
    }, []);

    const fetchUserSettings = () => {
        const query = process.env.REACT_APP_API_SERVER + 'settings/getSettings'; // Query string

        // Get
        axios
            .get(query)
            .then((response) => {
                setInputPath(response.data.inputPath);
                setPower(response.data.power);
                setUserCosts(response.data.costs);
                setTimeSlots(response.data.typology);
            })
            .catch(console.log)
            .then();
    };

    const updateUserSettings = async (e) => {
        e.preventDefault();

        const userSettings = {
            power: power,
            inputPath: inputPath,
            typology: timeSlots,
            costs: userCosts,
        };

        console.log(userSettings);

        try {
            await settingsSchema.validate(userSettings); // Yup validate userSettings based on schema
        } catch (error) {
            setErrorMsg(error.errors); // Errors from client side validation
            return;
        }

        const query = process.env.REACT_APP_API_SERVER + 'settings/setSettings'; // Query string

        await axios
            .put(query, userSettings)
            .catch((err) => {
                if (err) {
                    setErrorMsg(err.response.data.errorMsg); // Errors from server
                    return;
                }
            })
            .then((res) => {
                if(res){
                    setErrorMsg('');
                    alert('Settings uploaded correctly');
                }
            });
    };

    const changeTimeSlots = (parameter) => {
        const chosenTimeSlots = parameter.value;
        setTimeSlots(chosenTimeSlots);
        setUserCosts([...userCosts]);
    };

    return (
        <motion.div className='settings-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
            {openPopup && <Popup closePopup={() => setOpenPopup(false)} timeSlots={timeSlots} />}
            <h1 className='section-title'>Your Settings</h1>

            <form className='settings-form'>
                <InputPower power={power} setPower={setPower} />
                <InputPath inputPath={inputPath} setInputPath={setInputPath} />
                <InputContract timeSlots={timeSlots} changeTimeSlots={changeTimeSlots} setOpenPopup={setOpenPopup}></InputContract>
                <InputCosts timeSlots={timeSlots} userCosts={userCosts} setCosts={setUserCosts} />
                <div className='settings-update-button-wrapper' onClick={updateUserSettings}>
                    <Icon icon='el:upload' className='settings-update-button' />
                </div>
            </form>

            <div className='settings-error-msg'>{errorMsg}</div>
        </motion.div>
    );
};

export default Settings;
