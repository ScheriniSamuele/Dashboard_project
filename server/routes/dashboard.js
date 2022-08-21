import express from 'express';

import { getData, syncFile } from '../controllers/dashboardControllers.js';

const router = express.Router();

router.get('/getData', getData);
router.post('/syncFile', syncFile);

export default router;
