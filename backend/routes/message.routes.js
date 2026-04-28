import express from 'express';
import { handleGet } from '../controller/message.controller.js';
const router = express.Router();

router.get('/message', handleGet);

export default router;