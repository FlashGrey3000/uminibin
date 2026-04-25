# uminibin
Umi ni bin


### Functional Requirements
1. Users must be able to write messages into letters and throw it into the sea
2. Users must be able to fish for random messages from the sea

### Non Functional Requirements
1. High availability
2. Good and fun aesthetics
3. Scalable
4. Code is easy to upgrade

### Storage
Each message contains the following data:
- Message ID (16-32 bytes)
- Message (An Average of 150-200 bytes; *assumption*)  

> Database choice: Postgres (Source of truth)  
> Rate limit + Cache: Valkey 

What valkey stores?
1. Rate Limit: sessionID of each user for rate limiting
2. Already Seen Message Cache: Maintains a Set per session ID which includes recently seen message IDs

Any issues?
1. Postgres and Valkey must be kept in sync
2. Since sessionID is a cookie using incognito or clearing cookies can allow easy bypass of rate limits

Tables include:
- messages (message_ID UUID gen_random(), message TEXT)

### API Design
1. POST /api/message  
BODY: {message: Text}
2. GET /api/message  
RESPONSE: {RandomMessage: Text}

### Non functional issues
1. UI is not well responsive
2. No safegaurd against harmful messages (*This is intentional*)
3. Anime chibi girl... (*Hey, I tried my best*)