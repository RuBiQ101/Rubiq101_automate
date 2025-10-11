import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response, type NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import executionsRouter from './routes/executions';
import workflowsRouter from './routes/workflows';
import llmRoutes from './routes/llm';
import authRoutes from './routes/auth';
import { requireAuth, type AuthRequest } from './middleware/auth';

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
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📊 Database URL: ${dbUrl}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n🔗 API Endpoints:`);
    console.log(`   - Root: http://localhost:${port}/`);
    console.log(`   - Health: http://localhost:${port}/health`);
    console.log(`   - Auth Signup: http://localhost:${port}/api/auth/signup`);
    console.log(`   - Auth Login: http://localhost:${port}/api/auth/login`);
    console.log(`   - Protected Me: http://localhost:${port}/api/me`);
    console.log(`   - Workflows: http://localhost:${port}/api/workflows`);
    console.log(`   - Execute Workflow: http://localhost:${port}/api/executions/:workflowId/execute`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});