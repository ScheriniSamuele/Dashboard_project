//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';

import * as fs from 'fs';
import dotenv from 'dotenv';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { typology_enum } from '../data/enums.js';
import { syncFile } from './dashboardControllers.js';

import { onlyNumbers } from '../Helpers/validation.js';

// DOTENV configuration, the filepath for User settings is stored as an Ambient Variable
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// FilePath for updating user settings
const filePath = process.env.SETTINGS_FILE;
const __dirname = dirname(fileURLToPath(import.meta.url));

const path = join(__dirname, '../', filePath);

const file = editJsonFile(path);

//------------Controllers--------------------

// @route /api/contracts/getContracts
// @desc Get the inserted contracts
export const getContracts = asyncHandler(async (req, res) => {
    // Check if file exists and can

    if (!fs.existsSync(path)) {
        res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
        throw new Error('Invalid path for reading');
    }

    const response = file.toObject();

    res.status(200).json(response);
});

// @route /api/contracts/addContract
// @desc Adds the contract inserted by the user
export const addContract = asyncHandler(async (req, res) => {
    const { label, typology, costs } = req.body;
    let isUnique = true;

    const contracts = file.get('contracts');

    if (contracts !== null) {
        contracts.forEach((element) => {
            if (label === element.label) {
                res.status(400).json({ status: 'ko', errorMsg: 'Contract label must be unique' });
                throw new Error('Contract label must be unique');
            }
        });
    }

    // Checks if fields are null
    if (!label || !typology || !costs) {
        res.status(400).json({ status: 'ko', errorMsg: 'Please fill all requested information' });
        throw new Error('Please add all fields');
    }

    // Check the validity of typology based on enum values
    if (!typology_enum.includes(typology)) {
        res.status(400).json({ status: 'ko', errorMsg: 'Please select a valid typology' });
        throw new Error('Selected invalid typology');
    }

    // Check if costs length is OK with chosen length
    if (typology === 'single-slot' && costs.length != 1) {
        res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
        throw new Error('Invalid input');
    }

    if (typology === 'double-slots' && costs.length != 2) {
        res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
        throw new Error('Invalid input');
    }

    if (typology === 'multi-slots' && costs.length != 3) {
        res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
        throw new Error('Invalid input');
    }

    // Check if the costs array contains inly numbers
    if (!onlyNumbers(costs)) {
        res.status(400).json({ status: 'ko', errorMsg: 'Costs must be only numbers' });
        throw new Error('Inserted costs is not an array of numbers');
    }

    const newContract = {
        label: label,
        typology: typology,
        costs: costs,
    };

    // Set new values and save them
    file.append('contracts', newContract);
    file.save();

    res.status(200).json({ message: 'ok, everything done' });
});
