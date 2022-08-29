//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { typology_enum } from '../data/enums.js';
import { syncFile } from './dashboardControllers.js';

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
export const getCosts = asyncHandler(async (req, res) => {
    const costs = file.get('costs');
    
    console.log(costs);

    const response = file.toObject();
    res.status(200).json(response);
});