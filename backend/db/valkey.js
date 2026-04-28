import { createClient } from 'redis';

const valkey = createClient();

(async () => await valkey.connect())()

export default valkey;