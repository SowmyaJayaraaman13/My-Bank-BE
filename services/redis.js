const { Redis } = require('ioredis');
let redisClient;

class RedisService {
    constructor(){
        this.connectToRedis()
    }

    connectToRedis() {
        if (!redisClient) {
            redisClient = new Redis({
                username: process.env.REDIS_SERVICE_NAME, // Render Redis name, red-xxxxxxxxxxxxxxxxxxxx
                host: process.env.REDIS_HOST,             // Render Redis hostname, REGION-redis.render.com
                password: process.env.REDIS_PASSWORD,     // Provided password
                port: process.env.REDIS_PORT || 6379,     // Connection port
                tls: true, // TLS required when externally connecting to Render Redis,
                maxRetriesPerRequest: null
              });
        }
        console.log(redisClient)
        // redisClient.connect().then(() => console.log('Redis Connected Successfull'))
        return redisClient

    }

    getClient() {
        return redisClient;
    }

    async setDataToRedis(key, value) {
        await redisClient.set(key, value);
    }

    async getDataFromRedis(key) {
        const data = await redisClient.get(key);
        return data;
    }
    async flushAllKeys() {
        await redisClient.flushAll().then(() => console.log('Keys Flushed'))
    }
}

const redisService = new RedisService();
module.exports = { 
    redisService,
    redisClient
};