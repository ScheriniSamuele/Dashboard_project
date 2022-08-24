import React from 'react';
import { motion } from 'framer-motion';
import TableOfContents from '../Components/TableOfContents';
import settings from '../Images/settings.png';
import power from '../Images/power.png';
import path from '../Images/path.png';
import costs from '../Images/costs.png';
import contract from '../Images/contract.png';
import '../Styles/Documentation.css';

const Documentation = () => {
    
    return (
        
        <motion.div className='documentation-content' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ display: 'none' }}>
        <div className="container">
        <main>
        <h2 id="settings-header" className='section-subtitle'>Settings</h2>
            <img src={settings} className='settings-img' alt='Settings page' />
            <p className='documentation-info'>
                The settings page is used to upload the user's settings: the daily available power, the path of the csv file, the contract's typology and the cost for each slot
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
            <h3 id="power-header">Available power input</h3>
            <br />
            <img className='power-img' src={power} alt='Daily available power'  />
            <p className='documentation-info'>
                The user has to insert the daily available power indicated in the contract
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
            <h3 id="path-header">Path input</h3>
            <br/>
            <img className='path-img' src={path} alt='Path of the csv file' />
            <p className='documentation-info'>
                The user has to insert the path of the csv file containing the data that will be shown
                <br/><br/><br/>
            </p>
            <hr/><br/><br/><br/>
            <h3 id="contract-header">Contract's typology input</h3>
            <br/>
            <img className='contract-img' src={contract} alt='Contract typology' />
            <p className='documentation-info'>
                The user has to select with type of contract he has, there are three possibilities: 
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
            </p>
            <hr/><br/><br/><br/>   
            <h3 id="costs-header">Slot's cost input</h3>
            <img className='contract-img' src={costs} alt='Cost for each slot' />
            <p className='documentation-info'>
                The user has to insert the cost for each slot, based on the contract typology selected
                
            </p>
            <br /><br />
        </main>
        <TableOfContents />
        </div>     
            
        </motion.div>
    );
};

export default Documentation;
