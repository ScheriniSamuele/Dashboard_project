import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// server setup and .env variables
const app = express();
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const port = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Server up testing route
app.get('/', (req, res) => res.json({ message: 'Server up and running' }));

// Routes
import settingsRouter from './routes/settings.js';
app.use('/api/settings', settingsRouter);

import dashboardRouter from './routes/dashboard.js';
app.use('/api/dashboard', dashboardRouter);

import costRouter from './routes/costs.js';
app.use('/api/cost', costRouter)

app.listen(port, () => console.log(`app listening on port ${port}`));
