import pool from '../db/postgres.js';
import valkey, {METRIC_KEYS, KEYS} from '../db/valkey.js';

async function getMessageById(id) {
    const data = await pool.query("SELECT * FROM messages WHERE id = ($1)",
        [id]
    );
    
    return data.rows[0];
}

async function insertMessage(message) {
    const data = await pool.query("INSERT INTO messages (message) VALUES ($1) RETURNING id",
        [message]
    );

    await valkey.sAdd(KEYS.all_message_ids, String(data.rows[0].id));

    return String(data.rows[0].id);
}

async function getRandomMessageId() {
    const id = await valkey.sRandMember(KEYS.all_message_ids);
    
    return id;
}

async function isMessageSeen(id, sid) {
    const seen = await valkey.sIsMember(KEYS.user_seen(sid), String(id));

    return seen;
}

async function addMessageSeen(id, sid) {
    await valkey.sAdd(KEYS.user_seen(sid), String(id));
    await valkey.expire(KEYS.user_seen(sid), 3600);
}

async function incrRateLimit(sid) {
    const rate = await valkey.incr(KEYS.user_rate(sid));

    return rate;
}

async function addRateExpiry(sid, seconds) {
    await valkey.expire(KEYS.user_rate(sid), seconds);
}

async function ttlRate(sid) {
    const ttl = await valkey.ttl(KEYS.user_rate(sid));

    return ttl;
}

async function hitRateLimit() {
    const hits = await valkey.incr(METRIC_KEYS.RATE_LIMIT_COUNT);

    return hits;
}

async function populateRedis() {
    try {
        const result = await pool.query(
            "SELECT id FROM messages ORDER BY created_at DESC LIMIT 100"
        );

        await Promise.all(
            result.rows.map(row =>
                valkey.sAdd(KEYS.all_message_ids, String(row.id))
            )
        );

    } catch (err) {
        console.error(err);
    }
}

export { getMessageById, insertMessage, getRandomMessageId, isMessageSeen, addMessageSeen, incrRateLimit, addRateExpiry, ttlRate, hitRateLimit, populateRedis }