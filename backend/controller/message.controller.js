import { getMessageById } from "../models/message.model.js";

async function handleGet(req, res) {
    const row = await getMessageById("594b9d3e-2de4-4f4f-8650-c002af1f2a2e");

    console.log(row)

    return row;
}

export { handleGet }