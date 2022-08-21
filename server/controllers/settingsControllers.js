//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';

import * as fs from 'fs';
import dotenv from 'dotenv';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { typology_enum } from '../data/enums.js';

// DOTENV configuration, the filepath for User settings is stored as an Ambient Variable
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// FilePath for updating user settings
const filePath = process.env.SETTINGS_FILE;
const __dirname = dirname(fileURLToPath(import.meta.url));

const path = join(__dirname, '../', filePath);

const file = editJsonFile(path);

//------------Controllers--------------------

// @route /api/settings/getSettings
// @desc Get the user settings from the Json file
export const getSettings = asyncHandler(async (req, res) => {
    // Check if file exists and can

    if (!fs.existsSync(path)) {
        res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
        throw new Error('Invalid path for reading');
    }

    const response = file.toObject();
    res.status(200).json(response);
});

// @route /api/settings/setSettings
// @desc Sets the user settings in the Json file
export const setSettings = asyncHandler(async (req, res) => {
    const { power, inputPath, typology, costs } = req.body;

    // Checks if fields are null
    if (!power || !inputPath || !typology || !costs) {
        res.status(400).json({ status: 'ko', errorMsg: 'Please fill all requested information' });
        throw new Error('Please add all fields');
    }

    // Check if power is a number
    if (isNaN(parseInt(power))) {
        res.status(400).json({ status: 'ko', errorMsg: 'Power must be a number' });
        throw new Error('Inserted power is not a number');
    }

    // Replace windows backshlash \
    let path = inputPath.replace(/\\/g, '/');
    path = path.toLowerCase();

    // Check the validity of inputPath
    if (!/^(.+)\/([^\/]+).(txt|csv)$/.test(path)) {
        res.status(400).json({ status: 'ko', errorMsg: 'Invalid path' });
        throw new Error('Invalid path');
    }

    // Check the validity of typology based on enum values
    if (!typology_enum.includes(typology)) {
        res.status(400).json({ status: 'ko', errorMsg: 'Please select a valid typology' });
        throw new Error('Selected invalid typology');
    }

    // Check if the costs array contains inly numbers
    if (!onlyNumbers(costs)) {
        res.status(400).json({ status: 'ko', errorMsg: 'Costs must be only numbers' });
        throw new Error('Inserted costs is not an array of numbers');
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

    // Set new values and save them
    file.set('power', power);
    file.set('inputPath', inputPath);
    file.set('typology', typology);
    file.set('costs', costs);
    file.save();

    res.status(200).json({ message: 'ok, everything done' });
});

//------------Helper functions--------------------

// Checks if an array has only numbers
const onlyNumbers = (array) => {
    return array.every((elem) => !isNaN(parseInt(elem)));
};
