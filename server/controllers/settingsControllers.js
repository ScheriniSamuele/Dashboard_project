//Simple middleware used to handle errors in async functions
import asyncHandler from 'express-async-handler';

//------------Controllers--------------------

// @route /api/settings/getSettings
// @desc ...
export const getSettings = asyncHandler(async (req, res) => {
    res.json({ message: 'GET settings' });
});

// @route /api/settings/setSettings
// @desc ...
export const setSettings = asyncHandler(async (req, res) => {
    res.json({ message: 'SET settings' });
});

//------------Helper functions--------------------
