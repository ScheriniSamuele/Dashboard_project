import express from 'express';

import { syncFile, getLast7days, getLast30days } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.get('/last7days', getLast7days);
router.get('/last30days', getLast30days);
router.post('/syncFile', syncFile);

export default router;
