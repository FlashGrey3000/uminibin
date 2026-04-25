# uminibin
Umi (海) means "sea" or "ocean."  
Ni (に) is a particle indicating direction or location  
Bin (ビンを) typically refers to a "bottle"  

Overall, the name of the project translates to ***"A bottle in the sea"***  

The basic idea of this project is to create a place where people can simulate writing letters and throwing the bottles into the sea, and fishing out a few random bottles and reading what the others wrote in their letters.  

Inspired from Hoyolab's BottleMi  

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

## To get started
1. **Clone the repo**:
```sh
git clone https://github.com/FlashGrey3000/uminibin.git
```

2. **Get the databases running**:
- Start postgres  
if on arch you can:
```sh
sudo pacman -S postgresql
sudo systemctl start postgresql
```

Create and configure the `.env` file. You can refer to `.env.example` for reference.  

*(sorry that the entire backend is in a single server.js file as of now...)*  


- Start valkey (*or redis; both work the same*)  
if on arch you can:
```sh
sudo pacman -S valkey
sudo systemctl start valkey
```

3. **Start the backend**:
```sh
cd backend
node server.js
```
4. **Start the frontend**:
```sh
cd frontend
npm run dev
```