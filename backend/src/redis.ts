import { type RedisOptions } from 'ioredis';

function parseRedisFromUrl(url: string): Partial<RedisOptions> {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? parseInt(u.port, 10) : 6379,
      password: u.password || undefined,
    };
  } catch {
    return {};
  }
}

const fromUrl = process.env.REDIS_URL ? parseRedisFromUrl(process.env.REDIS_URL) : {};

export const redisOptions: RedisOptions = {
  host: fromUrl.host || process.env.REDIS_HOST || 'localhost',
  port: fromUrl.port || parseInt(process.env.REDIS_PORT || '6379', 10),
  password: fromUrl.password || process.env.REDIS_PASSWORD || undefined,
};

export default redisOptions;