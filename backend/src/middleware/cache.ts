import { Request, Response, NextFunction } from 'express';
import { cache, cacheKeys } from '../utils/cache';
import crypto from 'crypto';

interface CacheOptions {
  ttl?: number;
  keyGenerator?: (req: Request) => string;
  condition?: (req: Request, res: Response) => boolean;
}

export function cacheMiddleware(options: CacheOptions = {}) {
  const {
    ttl = 300,
    keyGenerator = (req) => `${req.method}:${req.originalUrl}:${JSON.stringify(req.query)}`,
    condition = (req, res) => req.method === 'GET' && res.statusCode === 200,
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && !options.keyGenerator) {
      return next();
    }

    const cacheKeyBase = keyGenerator(req);
    const hash = crypto.createHash('md5').update(cacheKeyBase).digest('hex');
    const key = cacheKeys.apiResponse((req.route as any)?.path || req.path, hash);

    const cached = await cache.get(key);
    if (cached) {
      return res.json(cached);
    }

    const originalJson = res.json.bind(res) as (body: any) => Response;
    res.json = function (body: any) {
      if (condition(req, res)) {
        cache.set(key, body, ttl).catch(() => {});
      }
      return originalJson(body) as any;
    } as any;

    next();
  };
}

export const shortCache = cacheMiddleware({ ttl: 60 });
export const mediumCache = cacheMiddleware({ ttl: 300 });
export const longCache = cacheMiddleware({ ttl: 3600 });
