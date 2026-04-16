const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { loadEnvFile } = require('node:process');

loadEnvFile();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    host: process.env.HOST
});

pool.query("CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message TEXT NOT NULL)");

app.post('/api/message', (req, res) => {
    const { message } = req.body;
    pool.query("INSERT INTO messages (message) VALUES ($1)",
        [message],
        (err, result) => {
            if (err) {console.error(err); res.send(`error: ${err}`)} 
            else {res.json(result)}
        }
    )
});

app.get('/api/message', (req, res) => {
    pool.query("SELECT message from messages OFFSET floor(random() * (SELECT count(*) FROM messages)) LIMIT 1",
        (err, result) => {
            if (err) {console.error(err); res.send(`error: ${err}`)}
            else {res.json(result)}
        }
    )
});

app.listen(3000, () => console.log("Server running..."));