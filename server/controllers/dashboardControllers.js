//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import CSVtoJSON from 'csvtojson';

// DOTENV configuration, the filepath for User settings is stored as an Ambient Variable
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// FilePath for updating user settings
const filePath = './data/energy.csv';
const maxPower = 3300;
let data = [];

CSVtoJSON()
    .fromFile(filePath)
    .then((jsonData) => {
        data = jsonData; // imposto la variabile globale data
        //console.log(data);
    })
    .catch((err) => console.log(err));

//------------Controllers--------------------

// @route /api/dashboard/getData
// @desc Get the user data for the dashboard from the csv file
export const getData = asyncHandler(async (req, res) => {
    const allData = data
        .filter((x) => x.data == '11/26/21')
        .map((x) => x.watt)
        .filter((x) => x > 1000)
        .filter((x) => x < maxPower);
    //console.log(allData);
    res.status(200).json(allData);
});

