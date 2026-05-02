import './env.js'

import express from 'express';
import cors from 'cors';
import messageRouter from './routes/message.routes.js';
import cookieParser from 'cookie-parser';
import metricRouter from './routes/metric.route.js';

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/api', messageRouter);
app.use('/api', metricRouter);

// app.listen(3000, () => {console.log("Serving server 2.0 at port 3000...")});

export default app;