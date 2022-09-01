import express from 'express';

import { addContract } from '../controllers/contractsControllers.js';

const router = express.Router();

router.put('/addContract', addContract);

export default router;
