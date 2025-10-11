import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response, type NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import executionsRouter from './routes/executions';
import workflowsRouter from './routes/workflows';
import llmRoutes from './routes/llm';
import authRoutes from './routes/auth';
import { requireAuth, type AuthRequest } from './middleware/auth';
import { register, metricsMiddleware } from './utils/metrics';
import logger, { requestLogger } from './utils/logger';

async function startServer() {
  // Run migrations before starting server
  console.log('Running database migrations...');
  const migratePath = path.resolve(__dirname, '..', 'migrate.js');
  const runMigrations = require(migratePath);
  await runMigrations();
  console.log('✅ Migrations completed successfully.\n');

  const app = express();
  const port = process.env.PORT || 3001;
  const dbUrl = process.env.DATABASE_URL!;

  // Middleware
  app.use(helmet());
  app.use(cors());
  // Rate limiting on API paths
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP'
  });
  app.use('/api', limiter);

  // Monitoring
  app.use(metricsMiddleware);
  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'AI Workflow Platform API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/health',
        workflows: '/api/workflows',
        executions: '/api/executions/:workflowId/execute'
      }
    });
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: dbUrl ? 'configured' : 'not configured',
      redis: 'configured'
    });
  });

  // Prometheus metrics endpoint
  app.get('/metrics', async (_req: Request, res: Response) => {
    res.set('Content-Type', (register as any).contentType || 'text/plain');
    const metrics = await register.metrics();
    res.end(metrics);
  });

  // API routes
  app.use('/api/workflows', workflowsRouter);
  app.use('/api/llm', llmRoutes);

  // Register routers
  app.use('/api/auth', authRoutes);
  app.use('/api/executions', executionsRouter);

  // Example protected route
  app.get('/api/me', requireAuth, (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
  });

  // Start server
  app.listen(port, () => {
    logger.info(`🚀 Server running on http://localhost:${port}`);
    logger.info(`📊 Database URL configured: ${Boolean(dbUrl)}`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch(err => {
  logger.error('Failed to start server', { error: err?.message, stack: err?.stack });
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});