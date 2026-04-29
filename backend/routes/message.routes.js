import express from 'express';
import { handleGet, handlePost, handleRateLimit } from '../controller/message.controller.js';
const messageRouter = express.Router();

messageRouter.get('/message', handleGet);
messageRouter.post('/message', handleRateLimit, handlePost);

export default messageRouter