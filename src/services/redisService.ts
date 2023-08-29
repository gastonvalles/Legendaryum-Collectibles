import Redis from 'ioredis';

const redis = new Redis();

export const redisService = {
    async get(key: string) {
        const value = await redis.get(key);
        return value !== null ? JSON.parse(value) : null;
    },

    async set(key: string, value: any, ttlSeconds: number) {
        await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    },

    async delete(key: string) {
        await redis.del(key);
    },
};
