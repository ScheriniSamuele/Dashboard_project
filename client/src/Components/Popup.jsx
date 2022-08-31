import React, { useState, useEffect } from 'react';

//import * as chartjs from 'chart.js';
import NewlineText from './NewLineText';
import '../Styles/Popup.css';

const Popup = ({ closePopup, timeSlots }) => {
    const singleSlotDesc = 'Single-slot contracts are defined as those packages in which the energy purchased has the same cost regardless of the time of day at which it is used.\nIt is worth relying on this option if you estimate that you will consume a lot of energy during the F1 slot, when the cost of energy is highest.';
    const doubleSlotsDesc = 'The double-slots typology refers to a contract that divides the day into two main slots: the F1 and the F23 (created by combining the F2 and F3 slots).\nConsidering the distribution of average energy costs over the 24 hours of a day, this typology of contract saves money on the bill when at least 70-80% of energy consumption occurs in F23.\nF1 (Mon-Fri from 8.00 to 19.00), F23 (Mon-Fri from 7.00 to 8.00 and from 19.00 to 23.00 + Saturday from 7.00 to 23.00, not including national holidays, Mon-Sat from 23.00 to 7.00 + Sunday and holidays 24/24h).';
    const multiSlotsDesc = 'If you use most of your electricity only during the cheapest slots, a multi-slots typology is probably what is right for you.\n With a multi-slots tariff, electricity has a different cost in each of the three main slots (F1, F2, F3): in this case, therefore, electricity rates are less flexible and depend strictly on the time of use.';

    const [desc, setDesc] = useState(singleSlotDesc);

    useEffect(() => {
        if (timeSlots === 'single-slot') {
            setDesc(singleSlotDesc);
        }

        if (timeSlots === 'double-slots') {
            setDesc(doubleSlotsDesc);
        }

        if (timeSlots === 'multi-slots') {
            setDesc(multiSlotsDesc);
        }
    }, [timeSlots]);

    //TODO adding new line
    return (
        <div className='popup-background'>
            <div className='popup-container'>
                <div className='popup-button-wrapper'>
                    <button className='titleCloseBtn' onClick={() => closePopup(false)}>
                        &times;
                    </button>
                </div>
                <div className='popup-title'>
                    <h1>Info</h1>
                </div>
                <div className='popup-body'>
                    <NewlineText text={desc}/>
                </div>
            </div>
        </div>
    );
};

export default Popup;
