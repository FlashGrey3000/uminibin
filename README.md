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
- User ID (16-32 bytes) (optional)
- Message (An Average of 150-200 bytes; *assumption*)

> Database choice: Postgres  

Tables include:
- messages
- users (optional)

### API Design
1. POST /api/message  
BODY: {message: Text}
2. GET /api/message  
RESPONSE: {RandomMessage: Text}