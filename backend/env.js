import { loadEnvFile } from 'node:process';

if (process.env.NODE_ENV !== "prod") {
    loadEnvFile();
}