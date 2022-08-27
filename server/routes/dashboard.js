import express from 'express';

import { syncFile, getLast7days, getLast30days, getLast24h, getLast72h } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.get('/last24h', getLast24h);
router.get('/last72h', getLast72h);
router.get('/last7days', getLast7days);
router.get('/last30days', getLast30days);
router.post('/syncFile', syncFile);

export default router;
