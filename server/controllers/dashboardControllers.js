//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';
import * as fs from 'fs';
import dotenv from 'dotenv';
import CSVtoJSON from 'csvtojson';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';
import { tidy, summarize, sum, groupBy, filter, mutate, sliceMax, median, debug } from '@tidyjs/tidy';

// Combinations to identify the time slots from a certain data and hour
import { F1Combinations, F2Combinations, F3Combinations, F23Combinations } from '../data/enums.js';

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

// @route /api/dashboard/getLast24h
// @desc Get the user data for the dashboard for the last 24 hours
export const getLast24h = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }
        const lastRecord = data[data.length - 1];
        const lastDateHour = moment(lastRecord.data + '/' + lastRecord.ora, 'MM-DD-YY-hh:mm');
        const firstDateHour = moment(lastDateHour);
        firstDateHour.subtract(24, 'hours');

        const sanitizedData = tidy(
            data,
            filter((record) => record.watt <= maxPower * 1.1)
        );

        const arrayData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 4) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),
            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => (record.data + '0').slice(9) })
        );

        // Adapter for timeSlots groupby
        const parsedData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 3) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),
            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => record.data + '00' })
        );

        const timeSlotsData = calcTimeSlotsValues(parsedData);

        const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
        res.status(200).json({ arrayData: arrayData, peak: peakValue, timeSlotsData: timeSlotsData, graphType: 'bar' });
    });
});

// @route /api/dashboard/getLast72h
// @desc Get the user data for the dashboard for the last 72 hours
export const getLast72h = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }
        const lastRecord = data[data.length - 1];
        const lastDateHour = moment(lastRecord.data + '/' + lastRecord.ora, 'MM-DD-YY-hh:mm');
        const firstDateHour = moment(lastDateHour);
        firstDateHour.subtract(72, 'hours');
        const arrayData = tidy(
            data,
            filter((record) => record.watt <= maxPower * 1.1),
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 3) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),

            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => record.data + '00' })
        );

        const timeSlotsData = calcTimeSlotsValues(arrayData);

        const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
        res.status(200).json({ arrayData: arrayData, peak: peakValue, timeSlotsData: timeSlotsData, graphType: 'bar' });
    });
});

// @route /api/dashboard/getLast7days
// @desc Get the user data for the dashboard for the last 7 days
export const getLast7days = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }
        const lastDay = data[data.length - 1].data;

        const lastDate = moment(lastDay, 'MM-DD-YY');
        const firstDate = moment(lastDate);
        firstDate.subtract(7, 'days');

        // For groupby time slots
        const lastRecord = data[data.length - 1];
        const lastDateHour = moment(lastRecord.data + '/' + lastRecord.ora, 'MM-DD-YY-hh:mm');
        const firstDateHour = moment(lastDateHour);
        firstDateHour.subtract(7, 'days');

        const sanitizedData = tidy(
            data,
            filter((record) => record.watt <= maxPower * 1.1)
        );

        const arrayData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + record.ora.slice(0, 2) }),
            groupBy(['data'], [summarize({ median: median('watt') })]),
            mutate({ data: (record) => record.data.slice(0, 8) }),
            groupBy(['data'], [summarize({ total: sum('median') })]),
            mutate({ data: (record) => moment(record.data, 'MM-DD-YY') }),
            filter((record) => moment(record.data, 'MM-DD-YY').isAfter(firstDate)),
            mutate({ data: (record) => record.data.format('DD/MM') })
        );

        // Adapter for timeSlots groupby
        const parsedData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 3) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),

            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => record.data + '00' })
        );

        const timeSlotsData = calcTimeSlotsValues(parsedData);

        const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
        res.status(200).json({ arrayData: arrayData, peak: peakValue, timeSlotsData: timeSlotsData, graphType: 'bar' });
    });
});

// @route /api/dashboard/getLast30days
// @desc Get the user data for the dashboard for the last 30 days
export const getLast30days = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            return;
        }

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

        const arrayData = tidy(
            sanitizedData,
            filter((record) => record.watt <= maxPower * 1.1),
            mutate({ data: (record) => record.data + record.ora.slice(0, 2) }),
            groupBy(['data'], [summarize({ median: median('watt') })]),
            mutate({ data: (record) => record.data.slice(0, 8) }),
            groupBy(['data'], [summarize({ total: sum('median') })]),
            mutate({ data: (record) => moment(record.data, 'MM-DD-YY') }),
            filter((record) => moment(record.data, 'MM-DD-YY').isAfter(firstDate)),
            mutate({ data: (record) => record.data.format('DD/MM') })
        );

        // Adapter for timeSlots groupby
        const parsedData = tidy(
            sanitizedData,
            mutate({ data: (record) => record.data + '/' + record.ora.slice(0, 3) }),
            groupBy(['data'], [summarize({ total: median('watt') })]),

            filter((record) => moment(record.data, 'MM-DD-YY-hh:mm').isAfter(firstDateHour)),
            mutate({ data: (record) => record.data + '00' })
        );

        const timeSlotsData = calcTimeSlotsValues(parsedData);

        const peakValue = tidy(arrayData, sliceMax(1, 'total'), mutate({ total: (record) => Number(record.total).toFixed(3) }))[0];
        res.status(200).json({ arrayData: arrayData, peak: peakValue, timeSlotsData: timeSlotsData, graphType: 'bar' });
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

//----Helpers------

const calcTimeSlotsValues = (parsedData) => {
    dotenv.config({ silent: process.env.NODE_ENV === 'production' });
    // FilePath for updating user settings
    const filePath = process.env.SETTINGS_FILE;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = editJsonFile(path);

    const contract = file.get('typology');
    console.log(contract);

    switch (contract) {
        case 'single-slot':
            return tidy(
                parsedData,
                mutate({ ora: (record) => record.data.slice(9) }),
                mutate({ data: (record) => moment(record.data, 'MM-DD-YY').format('dddd') }),
                debug('test', { limit: 999 }),
                summarize({
                    total: sum('total'),
                })
            );
        case 'double-slots':
            return tidy(
                parsedData,
                mutate({
                    data: (record) => moment(record.data, 'MM-DD-YY').format('dddd') + '/' + record.data.slice(9),
                }),
                debug('test', { limit: 999 }),
                summarize({
                    F1: sum('total', {
                        predicate: (x) => F1Combinations.includes(x.data),
                    }),
                    F23: sum('total', {
                        predicate: (x) => F23Combinations.includes(x.data),
                    }),
                })
            );
        case 'multi-slots':
            return tidy(
                parsedData,
                //mutate({ ora: (record) => record.data.slice(9) }),
                mutate({
                    data: (record) => moment(record.data, 'MM-DD-YY').format('dddd') + '/' + record.data.slice(9),
                }),
                debug('test', { limit: 999 }),
                summarize({
                    F1: sum('total', {
                        predicate: (x) => F1Combinations.includes(x.data),
                    }),
                    F2: sum('total', {
                        predicate: (x) => F2Combinations.includes(x.data),
                    }),
                    F3: sum('total', {
                        predicate: (x) => F3Combinations.includes(x.data),
                    }),
                })
            );
        default:
            return 'error in time slots';
    }
};
