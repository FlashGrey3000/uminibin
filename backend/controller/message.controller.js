import { getMessageById, insertMessage, getRandomMessageId, addGetRateExpiry, isMessageSeen, incrGetRateLimit, ttlGetRate, addMessageSeen, incrRateLimit, addRateExpiry, ttlRate, hitRateLimit, populateRedis } from "../models/message.model.js";
import { getSessionId } from "../lib/utils.js";

async function handleGetRateLimit(req, res, next) {
    const sid = getSessionId(req, res);
    const getRate = `getRate:${sid}`;
    const limit = 3;
    const ctr = await incrGetRateLimit(sid);

    if (ctr === 1) {
        await addGetRateExpiry(sid, 10);
    }

    if (ctr > limit) {
        return res.status(429).send({error: `Too many requests try again after ${await ttlGetRate(sid)} seconds`});
    }

    next();
}

async function handleGet(req, res) {
    populateRedis(); // temporary... populate redis cache on every GET request

    let attempts = 10;
    let finalId;
    const sid = getSessionId(req, res);
    while (attempts--) {
        const randId = await getRandomMessageId();
        const seen = await isMessageSeen(randId, sid);

        if (!seen) {
            finalId = randId;
            await addMessageSeen(finalId, sid);
            break;
        }
    }

    if (!finalId) {
        return res.status(404).send({error: "No new messages found..."});
    }

    const row = await getMessageById(finalId);

    return res.status(200).send(row);
}

async function handleRateLimit(req, res, next) {
    const sid = getSessionId(req, res);
    const rate = await incrRateLimit(sid);
    const limit = 1;

    if (rate === 1) {
        await addRateExpiry(sid, 60);
    }
    if (rate > limit) {
        hitRateLimit();
        return res.status(429).send({error: `Too many requests try again after ${await ttlRate(sid)} seconds`});
    }

    next();
}

async function handlePost(req, res) {
    const { message } = req.body;

    const id = await insertMessage(message);

    return res.status(201).send({id});
}

export { handleGetRateLimit, handleGet, handlePost, handleRateLimit }