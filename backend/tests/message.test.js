import 'dotenv/config';
import app from "../server.js";
import request from 'supertest';
import pool from "../db/postgres.js";
import valkey from '../db/valkey.js';

afterAll(async () => {
  await pool.end();
  await valkey.quit();
});

describe('GET /api/message', () => {
    it('should return 200 with proper data', async () => {
        const res = await request(app).get('/api/message');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('created_at');
    })
})