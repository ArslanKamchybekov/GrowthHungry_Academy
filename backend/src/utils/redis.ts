import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

const createRedisClient = () => {
  const redisUrl = process.env.REDIS_URL;
  
  if (!redisUrl) {
    throw new Error('REDIS_URL not found in environment variables');
  }
  
  console.log('Connecting to Redis...');
  return new Redis(redisUrl);
};

export const redis = createRedisClient();
