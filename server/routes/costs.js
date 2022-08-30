import express from 'express';

import { getCosts } from '../controllers/costControllers.js';

const router = express.Router();

router.post('/getCosts', getCosts);

export default router;
