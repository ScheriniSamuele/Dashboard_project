//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';
import * as fs from 'fs';
import dotenv from 'dotenv';
import CSVtoJSON from 'csvtojson';
import editJsonFile from 'edit-json-file';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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

// @route /api/dashboard/getData
// @desc Get the user data for the dashboard from the csv file
export const getData = asyncHandler(async (req, res) => {
    fs.access(inputPath, (err) => {
        if (err) {
            res.status(400).json({ status: 'ko', errorMsg: 'There must be an error in the filePath, you have to change it' });
            throw new Error('Invalid path for reading');
        } else {
            const rawData = data
                .filter((x) => x.data == '11/24/21')
                .map((x) => ({ ora: x.ora.slice(0, -3), watt: x.watt }))
                //.filter((x) => x.watt > 1000)
                .filter((x) => x.watt < maxPower * 1.1);
            //console.log(allData);

            let avg = [{}];
            let sum = 0;
            let i = 0;
            let h = '';
            let j = 0;

            let gap = 100;

            while ((rawData.length / gap) * j < rawData.length) {
                for (i; i < (rawData.length / gap) * j; i++) {
                    if (rawData[i] == null) break;
                    sum += parseInt(rawData[i].watt);
                    h = rawData[i].ora;
                }
                j++;
                if (h != '') avg.push({ ora: h, watt: Math.round(sum / (rawData.length / gap)) });
                //console.log('somma: ', sum, 'ora: ', h);
                sum = 0;
            }

            const allData = avg;

            res.status(200).json(allData);
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
