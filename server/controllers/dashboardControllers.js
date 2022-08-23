//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';
import * as fs from 'fs';
import dotenv from 'dotenv';
import CSVtoJSON from 'csvtojson';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';
import { tidy, summarize, sum, groupBy, filter, mutate, sliceMax } from '@tidyjs/tidy';

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

// @route /api/dashboard/getLast7days
// @desc Get the user data for the dashboard for the last 7 days
export const getLast7days = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            throw new Error('Invalid path for reading');
        } else {
            const lastDay = data[data.length - 1].data;

            const lastDate = moment(lastDay, 'MM-DD-YY');
            const firstDate = moment(lastDate);
            firstDate.subtract(7, 'days');

            const arrayData = tidy(
                data,
                filter((record) => record.watt <= maxPower * 1.1),
                groupBy('data', [summarize({ total: sum('watt') })]),

                mutate({ total: (record) => record.total / 24000 }),
                mutate({ data: (record) => moment(record.data, 'MM-DD-YY') }),
                filter((record) => record.data.isAfter(firstDate)),
                mutate({ data: (record) => record.data.format('DD/MM') })
            );

            const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
            res.status(200).json({ arrayData: arrayData, peak: peakValue });
        }
    });
});

// @route /api/dashboard/getLast30days
// @desc Get the user data for the dashboard for the last 30 days
export const getLast30days = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            throw new Error('Invalid path for reading');
        } else {
            const lastDay = data[data.length - 1].data;

            const lastDate = moment(lastDay, 'MM-DD-YY');
            const firstDate = moment(lastDate);
            firstDate.subtract(31, 'days');

            const arrayData = tidy(
                data,
                filter((record) => record.watt <= maxPower * 1.1),
                groupBy('data', [summarize({ total: sum('watt') })]),

                mutate({ total: (record) => record.total / 24000 }),
                mutate({ data: (record) => moment(record.data, 'MM-DD-YY') }),
                filter((record) => record.data.isAfter(firstDate)),
                mutate({ data: (record) => record.data.format('DD/MM') })
            );

            const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
            res.status(200).json({ arrayData: arrayData, peak: peakValue });
        }
    });
});

// @route /api/dashboard/syncFile
// @desc Get the user data for the dashboard from the csv file
export const syncFile = asyncHandler(async (req, res) => {
    CSVtoJSON()
        .fromFile(inputPath)
        .then((jsonData) => {
            data = jsonData;
        })
        .catch((err) => console.log(err));
});
