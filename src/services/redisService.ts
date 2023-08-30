import Redis from 'ioredis';

const redis = new Redis();

export const redisService = {
  async get(key: string) {
    try {
      const value = await redis.get(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting key ${key} from Redis:`, error);
      throw error;
    }
  },

  async set(key: string, value: any, ttlSeconds: number) {
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (error) {
      console.error(`Error setting key ${key} in Redis:`, error);
      throw error;
    }
  },

  async delete(key: string) {
    try {
      await redis.del(key);
    } catch (error) {
      console.error(`Error deleting key ${key} from Redis:`, error);
      throw error;
    }
  },
};
