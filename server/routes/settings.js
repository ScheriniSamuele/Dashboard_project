import express from 'express';

import { setSettings, getSettings } from '../controllers/settingsControllers.js';

const router = express.Router();

router.get('/getSettings', getSettings);
router.post('/setSettings', setSettings);

export default router;
