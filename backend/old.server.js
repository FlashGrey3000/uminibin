const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { loadEnvFile } = require('node:process');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

const valkey = createClient();

(async () => {
    await valkey.connect();
})();

loadEnvFile();

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    host: process.env.HOST
});

pool.query("CREATE TABLE IF NOT EXISTS messages (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), message TEXT NOT NULL)");
populateRedisWithLatest10kRows();

async function rateLimit(req, res, next) {
    const sid = getSessionId(req, res);
    const key = `rate:${sid}`;
    const limit = 1;
    const counter = await valkey.incr(key);
    
    if (counter === 1) {
        await valkey.expire(key, 60);
    }

    if (counter > limit) {
        const rlc = await valkey.incr('rate_limit_count');

        if (rlc === 1) {
            await valkey.expire('rate_limit_count', 60 * 60 * 24);
        }

        return res.status(429).json({
            error: "Too many requests. Please try again later",
            tryAgainIn: await valkey.ttl(key)
        })
    }

    next();
}

function getSessionId(req, res) {
    let sid = req.cookies?.sid;

    if (!sid) {
        sid = uuidv4();
        
        res.cookie("sid", {
            maxAge: 1000 * 3600
        })
    }

    return sid
}

function populateRedisWithLatest10kRows() {
    pool.query("SELECT id from messages ORDER BY created_at DESC LIMIT 10000",
        (err, result) => {
            if (err) {console.error(err); res.status(500).json({error: "Something went wrong... UwU"})}
            else {
                for (const row of result.rows) {
                    valkey.sAdd("message_id", row.id)
                }
            }
        }
    )
}

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

console.log(formatUptime(process.uptime()));

app.post('/api/message', rateLimit, (req, res) => {
    const { message } = req.body;
    pool.query("INSERT INTO messages (message) VALUES ($1) RETURNING id",
        [message],
        async (err, result) => {
            if (err) {console.error(err); res.status(500).send({error: err})} 
            else {
                await valkey.sAdd("message_id", result.rows[0].id);
                const tl = await valkey.incr('total_letters');
                if (tl === 1) {
                    await valkey.ttl('total_letters', 60 * 60 * 24);
                }
                res.status(200).json(result);
            }
        }
    )
});

app.get('/api/message', async (req, res) => {
    let attempts = 5;
    let finalId;
    const seenKey = `seen:${getSessionId(req, res)}`;
    while (attempts--) {
        const randId = await valkey.sRandMember("message_id");
        if (!randId) {
            return res.status(404).json({ error: "No messages available" });
        }
        const isSeen = await valkey.sIsMember(seenKey, randId);
        if (!isSeen) {finalId = randId; break}
    }

    if (!finalId) {
        return res.status(404).json({error: "You have seen all messages"});
    }

    const tf = await valkey.incr('total_fishes');
    if (tf === 1) {
        await valkey.expire('total_fishes', 60 * 60 * 24);
    }

    // pool.query("SELECT message from messages OFFSET floor(random() * (SELECT count(*) FROM messages)) LIMIT 1",
    pool.query("SELECT message from messages WHERE id = ($1)",
        [finalId],
        async (err, result) => {
            if (err) {console.error(err); res.status(500).send(`error: ${err}`)}
            else {await valkey.sAdd(seenKey, finalId); await valkey.expire(seenKey, 3600);res.status(200).json(result.rows[0])}
        }
    )
});

app.get('/api/metric', async (req, res) => {
    res.json({
        totalRateLimits: await valkey.get('rate_limit_count'),
        totalLetters: await valkey.get('total_letters'),
        totalFishes: await valkey.get('total_fishes'),
        umazingScore: 99999999989,
        serverUpTime: formatUptime(process.uptime())
    });
});

app.listen(3000, () => console.log("Server running..."));