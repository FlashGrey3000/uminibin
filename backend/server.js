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

pool.query("CREATE TABLE tablename(hehe INT PRIMARY KEY)");

app.listen(3000, () => console.log("Server running..."));