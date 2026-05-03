import 'dotenv/config';
import app from "../server.js";
import request from 'supertest';
import pool from "../db/postgres.js";
import valkey from '../db/valkey.js';

afterAll(async () => {
  await pool.end();
  await valkey.quit();
});

describe('GET /api/metric', () => {
    it('should return 200 with metrics', async () => {
        const res = await request(app).get('/api/metric');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('rate_limits');
        expect(res.body).toHaveProperty('total_letters');
    })
})