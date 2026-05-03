# uminibin
An anonymous message platform where users can "throw letters into the sea" and "fish for other's letters" randomly.  
It is built with focus on backend system design, including caching, rate limiting and scalable API design.  

## Name Origin
Umi (海) means "sea" or "ocean."  
Ni (に) is a particle indicating direction or location  
Bin (ビンを) typically refers to a "bottle"  

Overall, the name of the project translates to ***"A bottle in the sea"***  

The basic idea of this project is to create a place where people can simulate writing letters and throwing the bottles into the sea, and fishing out a few random bottles and reading what the others wrote in their letters.  

Inspired from Hoyolab's BottleMi  

## System Design
### Functional Requirements
1. Write anonymous messages
2. Retrieve random messages
3. No repeating messages

### Non Functional Requirements
1. High availability
2. Layered-game UI feel
3. Scalable backend
4. Maintainable code

## Architecture
### Storage
Each message row contains the following data:
- Message ID (32 bytes)
- Message (An Average of 150 bytes; *assumption*)  
- Time of Creation

> **Database choice**: Postgres (Source of truth)  
> **Rate limit + Cache**: Valkey 

What valkey stores?
1. Rate Limit: sessionID of each user for rate limiting  
2. Already Seen Message Cache: Maintains a Set per session ID which includes recently seen message IDs  

### Known issues in implementation
1. Postgres and Valkey must be kept in sync  
2. Since sessionID is a cookie using incognito or clearing cookies can allow easy bypass of rate limits  

### Postgres Table:
- **messages:** (message_ID UUID gen_random(), message TEXT, created_at NOW())

## API Design
### 1. POST /api/message  
write a new message  

**Body:**  

```json
{
    "message": "string"
}
```

### 2. GET /api/message  
retrieve a random message  

**Response:**  

```json
{
    "id": "uuid",
    "message": "string",
    "created_at": "datetime"
}
```

### 3. GET /api/metric  
retrieve metrics

**Response:**  

```json
{
    "rate_limits": "int",
    "total_letters": "int"
}
```

## Testing
Basic integration testing is done using jest and supertest  

To run tests:  
```sh
npm test
```

## To get started
1. **Clone the repo**:
```sh
git clone https://github.com/FlashGrey3000/uminibin.git
```

2. **Configure .env variables**:  
Create and configure the `.env` file. You can refer to `.env.example` for reference.  

3. **Start database services**:
Start postgresql and valkey  
**Arch based distros**:  
```sh
sudo pacman -S postgresql valkey

sudo systemctl start postgresql
sudo systemctl start valkey
```

> You can enable them as well so the services start again on boot  
```sh
sudo systemctl enable service_name
```


4. **Start the backend**:
```sh
cd backend
node server.js
```

5. **Start the frontend**:
```sh
cd frontend
npm run dev
```

## Misc from developer
1. UI might struggle on different screen sizes
2. No safeguard against harmful messages (*This is intentional*)
3. Anime chibi girl... (*Hey, I tried my best*)