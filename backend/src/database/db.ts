import { Pool, type PoolConfig } from 'pg';
import dotenv from 'dotenv';
import logger from '../utils/logger';

// Ensure local .env takes precedence during development to avoid picking up
// unrelated system-level envs (like a different DATABASE_URL)
dotenv.config({ override: true });

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20,
  min: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
} as PoolConfig as any;

// Attach additional runtime options not present in PoolConfig typings
(poolConfig as any).acquireTimeoutMillis = 2000;
(poolConfig as any).statement_timeout = 30000;
(poolConfig as any).query_timeout = 30000;
(poolConfig as any).idle_in_transaction_session_timeout = 60000;

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  logger.info('Database: New client connected');
});

pool.on('error', (err) => {
  logger.error('Database: Unexpected error on idle client', { error: err.message });
});

export const db = {
  async query(text: string, params?: any[]) {
    const start = Date.now();
    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      if (duration > 1000) {
        logger.warn('Slow query detected', {
          query: text.substring(0, 100),
          duration: `${duration}ms`,
          rowCount: (result as any).rowCount,
        });
      }
      return result;
    } catch (error: any) {
      logger.error('Database query error', {
        query: text.substring(0, 100),
        error: error?.message,
        params: params?.length,
      });
      throw error;
    }
  },

  async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      await pool.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
};

process.on('SIGINT', async () => {
  logger.info('Database: Closing connection pool');
  await pool.end();
});

export default db;