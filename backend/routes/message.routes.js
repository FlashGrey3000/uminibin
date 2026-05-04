import express from 'express';
import { handleGet, handleGetRateLimit, handlePost, handleRateLimit } from '../controller/message.controller.js';
const messageRouter = express.Router();

messageRouter.get('/message', handleGetRateLimit, handleGet);
messageRouter.post('/message', handleRateLimit, handlePost);

export default messageRouter