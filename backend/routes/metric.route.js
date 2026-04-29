import express from 'express';
import { handleGet } from '../controller/metric.controller.js';

const metricRouter = express.Router();

metricRouter.get('/metric', handleGet);

export default metricRouter

