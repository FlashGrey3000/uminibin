import valkey, { KEYS, METRIC_KEYS } from "../db/valkey.js";

async function getMetrics() {
    const rate_limits = await valkey.get(METRIC_KEYS.RATE_LIMIT_COUNT);
    const total_letters = await valkey.sCard(KEYS.all_message_ids);
    
    const metrics = { rate_limits, total_letters }

    return metrics;
}

export { getMetrics }