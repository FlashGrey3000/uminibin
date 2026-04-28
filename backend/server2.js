import './env.js'

import express from 'express';
import cors from 'cors';
import router from './routes/message.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(3001, () => {console.log("Serving server 2 at port 3001")});