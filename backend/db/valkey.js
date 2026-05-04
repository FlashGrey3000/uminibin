import { createClient } from 'redis';

const valkey = createClient({
    url: process.env.REDIS_URL 
});

valkey.on("error", (err) => {
    console.error("Redis error:", err);
});

await valkey.connect();

export default valkey;
export const METRIC_KEYS = {
    RATE_LIMIT_COUNT: "rate_limit_count"
}
export const KEYS = {
    user_post_rate: (sid) => `post_rate:${sid}`,
    user_get_rate: (sid) => `get_rate:${sid}`,
    user_seen: (sid) => `seen:${sid}`,
    all_message_ids: "all_message_ids"
}