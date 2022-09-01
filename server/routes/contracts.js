import express from 'express';

import { addContract, getContracts } from '../controllers/contractsControllers.js';

const router = express.Router();

router.get('/getContracts', getContracts);
router.put('/addContract', addContract);

export default router;
