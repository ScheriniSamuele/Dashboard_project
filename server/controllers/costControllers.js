//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { calcTimeSlotsValues } from './dashboardControllers.js';
import moment from 'moment';
import * as fs from 'fs';
import CSVtoJSON from 'csvtojson';
import { tidy, summarize, sum, groupBy, filter, mutate, median } from '@tidyjs/tidy';

import { onlyNumbers } from '../Helpers/validation.js';

// DOTENV configuration, the filepath for User settings is stored as an Ambient Variable
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// FilePath for updating user settings
const filePath = process.env.SETTINGS_FILE;
const __dirname = dirname(fileURLToPath(import.meta.url));

const path = join(__dirname, '../', filePath);
const file = editJsonFile(path);
const inputPath = file.get('inputPath');
const maxPower = file.get('power') * 1000;

let data = [];

fs.access(inputPath, (err) => {
    if (!err) {
        CSVtoJSON()
            .fromFile(inputPath)
            .then((jsonData) => {
                data = jsonData;
            })
            .catch((err) => console.log(err));
    }
});

//------------Controllers--------------------

// @route /api/cost/getCosts
// @desc Get the user average costs
export const getCosts = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }

        let costs = null;
        let contract = null;

        // If req.body is not empty
        if (Object.keys(req.body).length !== 0) {
            costs = req.body.costs.map((el) => Number(el));
            if (!onlyNumbers(costs)) {
                res.status(400).json({ status: 'ko', errorMsg: 'Costs must be only numbers' });
                return;
            }

            contract = req.body.typology;
            // Check if costs length is OK with chosen length
            if (contract === 'single-slot' && costs.length < 1) {
                res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
                return;
            }

            if (contract === 'double-slots' && costs.length < 2) {
                res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
                return;
            }

            if (contract === 'multi-slots' && costs.length < 3) {
                res.status(400).json({ status: 'ko', errorMsg: 'Invalid costs length' });
                return;
            }
        }

        if (costs == null) {
            costs = file.get('costs');
            contract = file.get('typology');
        }

        let monthlyCost = 0;
        let dailyCost = 0;
        let annualCost = 0;

        const lastDay = data[data.length - 1].data;
        const lastDate = moment(lastDay, 'MM-DD-YY');
        const firstDate = moment(lastDate);
        firstDate.subtract(31, 'days');

        // For groupby time slots
        const lastRecord = data[data.length - 1];
        const lastDateHour = moment(lastRecord.data + '/' + lastRecord.ora, 'MM-DD-YY-hh:mm');
        const firstDateHour = moment(lastDateHour);
        firstDateHour.subtract(31, 'days');

        const sanitizedData = tidy(
            data,
            filter((record) => record.watt <= maxPower * 1.1)
        );

        // Adapter for timeSlots groupby
        const parsedData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 3) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),

            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => record.data + '00' })
        );

        const timeSlotsData = calcTimeSlotsValues(parsedData, contract);

        let flag = false;

        switch (contract) {
            case 'single-slot': {
                console.log('sono qua 1');
                console.log(timeSlotsData);

                monthlyCost = (timeSlotsData[0].total / 1000) * costs[0];
                break;
            }
            case 'double-slots': {
                console.log('sono qua 2');
                console.log(timeSlotsData);

                monthlyCost = (timeSlotsData[0].F1 / 1000) * costs[0] + (timeSlotsData[0].F23 / 1000) * costs[1];
                break;
            }
            case 'multi-slots': {
                console.log('sono qua 3');
                console.log(timeSlotsData);
                monthlyCost = (timeSlotsData[0].F1 / 1000) * costs[0] + (timeSlotsData[0].F2 / 1000) * costs[1] + (timeSlotsData[0].F3 / 1000) * costs[2];
                break;
            }
            default:
                flag = true;
                break;
        }

        if (flag === true) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }

        dailyCost = monthlyCost / 31;
        annualCost = monthlyCost * 12;

        let averageCosts = {
            dailyCost: dailyCost,
            monthlyCost: monthlyCost,
            annualCost: annualCost,
        };

        const response = averageCosts;
        console.log('res:', response);

        res.status(200).json(response);
    });
});
