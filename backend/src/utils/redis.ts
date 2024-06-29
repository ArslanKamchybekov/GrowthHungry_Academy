import { Redis } from 'ioredis';
require('dotenv').config();

const client = () => {
  if (process.env.REDIS_URL) {
    console.log('Redis connected');
    return process.env.REDIS_URL;
  }
  throw new Error('Redis URL not found');
};

export default client = new Redis(client());
