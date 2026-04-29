import { getMetrics } from "../models/metric.model.js";

async function handleGet(req, res) {
    const metrics = await getMetrics();

    return res.status(200).send(metrics);
}

export { handleGet }