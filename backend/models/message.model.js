import pool from '../db/postgres.js';

async function getMessageById(id) {
    const data = await pool.query("SELECT * FROM messages WHERE id = ($1)",
        [id]
    );

    console.log(data);
    
    return data.rows[0];
}

export { getMessageById }