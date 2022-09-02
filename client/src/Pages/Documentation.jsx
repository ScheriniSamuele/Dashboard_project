import React from 'react';
import { motion } from 'framer-motion';
import TableOfContents from '../Components/TableOfContents';
import settings from '../Images/settings.png';
import power from '../Images/power.png';
import path from '../Images/path.png';
import costs from '../Images/costs.png';
import chart30days from '../Images/chart30days.png';
import chart7days from '../Images/chart7days.png';
import chart72hours from '../Images/chart72hours.png';
import chart24hours from '../Images/chart24hours.png';
import peakdash from '../Images/peakdash.png';
import timeslotsdash from '../Images/timeslotsdash.png';
import othercontracts from '../Images/othercontracts.png';
import contractToCompare from '../Images/contract_to_compare.png';
import contractlabel from '../Images/contractlabel.png';
import contract from '../Images/contract.png';
import average from '../Images/average.png';
import compare from '../Images/contractcompare.png';
import cost from '../Images/costspage.png';

import '../Styles/Documentation.css';

const Documentation = () => {
    
    return (
        
        <motion.div className='documentation-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
        <div className="container">
        <main>
        <h2 id="dashboard-header" className='documentation-title'>Dashboard</h2>
            The dashboard page makes the user visualize infos about his consumption <br/>
            <br/>
            <h3 id="chart-header" className='documentation-subtitle'>Chart</h3>
            The user can choose three range of time the chart will show: 
            <ul>
                <li>
                    Energy consumption in the last 30 days
                    <br/><br/>
                    <img src={chart30days} className='doc-img' alt='30 days' />
                    <br/><br/>
                </li>

                <li>
                    Energy consumption in the last 7 days
                    <br/><br/>
                    <img src={chart7days} className='doc-img' alt='7 days' />
                    <br/><br/>
                </li>

                <li>
                    Energy consumption in the last 72 hours
                    <br/><br/>
                    <img src={chart72hours} className='doc-img' alt='7 days' />
                    <br/><br/>
                </li>

                <li>
                    Energy consumption in the last 24 hours
                    <br/><br/>
                    <img src={chart24hours} className='doc-img' alt='24 hours' />
                    <br/><br/>
                </li>
            </ul>
            <br/><br/>
            <hr/>
            <br/><br/>
            <h3 id="peak-header" className='documentation-subtitle'>Energy peak</h3>
            <img src={peakdash} className='small-img' alt='Energy peak' />
            <br />
            This section show the energy peak in the selected range of time and when it was
            <br/><br/>
            <hr/>
            <br/><br/>
            <h3 id="timeslots-header" className='documentation-subtitle'>Energy based on time slots</h3>
            <img src={timeslotsdash} className='medium-img' alt='Energy based on time slots' />
                <br/>
                This sections shows the energy consumption grouped by time slot
                <br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
        <h2 id='costs-header'  className='documentation-title'>Cost</h2>
            <img src={cost} className='doc-img' alt='Cost page' />
            <p className='documentation-info'>
                <br/>
                The cost page shows to the user an average cost based on his settings and on the data of the last month, it can be used to have an idea of the cost and to compare some contracts and see which is the best.<br/>
                The user can add as many contract as he wants.
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
        <h3 id="average-header" className='documentation-subtitle'>Average cost</h3>
            <img className='small-img' src={average} alt='Average cost'  />
            <p className='documentation-info'>
                It shows the average daily, monthly and annual cost based on the data of the last 30 days
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
        <h3 id="compare-header" className='documentation-subtitle'>Compare</h3>
            <img className='small-img' src={compare} alt='Compare'  />
            <p className='documentation-info'>
                The user can choose a different contract that he wants to compare with his current contract to see the difference of cost and which type of contract is cheaper.<br/>
                By clicking the compare button it will show the average costs based on the chosen contract.
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
            
        <h3 id="average-compare-header" className='documentation-subtitle'>Average cost comparation</h3>
            <img className='power-img' src={contractToCompare} alt='Average cost comparation'  />
            <p className='documentation-info'>
                    It shows to the user the average cost based on the chosen contract in the compare form it will appear after clicking the compare button for the chosen contract.
                    <br/><br/><br/>
            </p>
            <br/><br/><br/><br/><br/><br/>
        <h2 id="settings-header" className='documentation-title'>Settings</h2>
                <img src={settings} className='doc-img' alt='Settings page' />
                <p className='documentation-info'>
                    <br/>
                    The settings page is used to upload the user's settings: the daily available power, the path of the csv file, the contract's typology and the cost for each slot
                    <br/><br/><br/>
                </p>
            <hr/><br/><br/><br/>
            <h3 id="power-header" className='documentation-subtitle'>Available power input</h3>
            <br />
                <img className='power-img' src={power} alt='Daily available power'  />
                <p className='documentation-info'>
                    The user has to insert the daily available power indicated in the contract
                    <br/><br/><br/>
                </p>
            <hr/><br/><br/><br/>
            <h3 id="path-header" className='documentation-subtitle'>Path input</h3>
            <br/>
                <img className='path-img' src={path} alt='Path of the csv file' />
                <p className='documentation-info'>
                    The user has to insert the path of the csv file containing the data that will be shown
                    <br/><br/><br/>
                </p>
            <hr/><br/><br/><br/>
            <h3 id="contract-header" className='documentation-subtitle'>Contract's typology input</h3>
            <br/>
            <img className='doc-img' src={contract} alt='Contract typology' />
            <p className='documentation-info'>
                The user has to select with type of contract he has, there are three possibilities: 
            </p>
            <ul>
                        <li className='slot-list'>
                            single-slot, with an unique cost (F1)
                        </li>

                        <li className='slot-list'>
                            double-slots with two slots with different costs that will be inserted in the costs input (F1, F23)
                        </li>

                        <li className='slot-list'>
                            multi-slots with three different costs that will be inserted in the costs input (F1, F2, F3)
                        </li>
                        <br />
                    </ul> 
                    By selecting a typology and clicking the INFO button you can get more infos related to the selected typology
                    <br/><br/><br/>  
            <hr/><br/><br/><br/>   
            <h3 id="costs-header" className='documentation-subtitle'>Slot's cost input</h3>
            <img className='contract-img' src={costs} alt='Cost for each slot' />
            <p className='documentation-info'>
                The user has to insert the cost for each slot, based on the contract typology selected
                
            </p>
            <br /><br />

            <br/><br/><br/><br/><br/><br/>
            <h2 id="other-contracts-header" className='documentation-title'>Other contracts</h2>
                <img src={othercontracts} className='doc-img' alt='Other contracts page' />
                <p className='documentation-info'>
                        The other contracts page is used to add some contracts the user wants to compare with his one, the inputs are the same as the settings page
                        <br/><br/><br/>
                    </p>
                <hr/><br/><br/><br/>
                <h3 id="contract-label-header" className='documentation-subtitle'>Contract label input</h3>
                <br />
                    <img className='power-img' src={contractlabel} alt='Daily available power'  />
                    <p className='documentation-info'>
                        The user has to insert a label to identify the contract's info he wants to add (es. ENEL, EDISON...)
                        <br/><br/><br/>
                    </p>
        </main>
        <TableOfContents />
        </div>     
            
        </motion.div>
    );
};

export default Documentation;
