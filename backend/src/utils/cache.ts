import Redis from 'ioredis';
import logger from './logger';

class CacheManager {
  private redis: Redis;
  private defaultTTL = 3600; // 1 hour

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      enableReadyCheck: false,
      maxRetriesPerRequest: null,
      reconnectOnError: () => true,
    });

    this.redis.on('connect', () => {
      logger.info('Cache: Connected to Redis');
    });

    this.redis.on('error', (err) => {
      logger.error('Cache: Redis connection error', err as any);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error: any) {
      logger.error('Cache: Get error', { key, error: error?.message });
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error: any) {
      logger.error('Cache: Set error', { key, error: error?.message });
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error: any) {
      logger.error('Cache: Delete error', { key, error: error?.message });
    }
  }

  async flush(): Promise<void> {
    try {
      await this.redis.flushall();
      logger.info('Cache: Flushed all keys');
    } catch (error: any) {
      logger.error('Cache: Flush error', { error: error?.message });
    }
  }

  async getPattern(pattern: string): Promise<string[]> {
    try {
      return await this.redis.keys(pattern);
    } catch (error: any) {
      logger.error('Cache: Pattern get error', { pattern, error: error?.message });
      return [];
    }
  }

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error: any) {
      logger.error('Cache: Pattern delete error', { pattern, error: error?.message });
    }
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = this.defaultTTL
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }
}

export const cache = new CacheManager();

export const cacheKeys = {
  user: (id: string) => `user:${id}`,
  workflow: (id: string) => `workflow:${id}`,
  workflowList: (userId: string) => `workflows:user:${userId}`,
  execution: (id: string) => `execution:${id}`,
  llmResponse: (provider: string, model: string, promptHash: string) => 
    `llm:${provider}:${model}:${promptHash}`,
  apiResponse: (endpoint: string, hash: string) => `api:${endpoint}:${hash}`,
};
