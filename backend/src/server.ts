import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, type Response, type NextFunction } from 'express';
import executionsRouter from './routes/executions';

async function startServer() {
  // Run migrations before starting server
  console.log('Running database migrations...');
  const runMigrations = require('../migrate');
  await runMigrations();
  console.log('✅ Migrations completed successfully.\n');

  const app = express();
  const port = process.env.PORT || 3001;
  const dbUrl = process.env.DATABASE_URL!;

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

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
  app.get('/api/workflows', (req: Request, res: Response) => {
    res.json({ 
      workflows: [],
      message: 'Workflows endpoint - ready for implementation'
    });
  });

  app.post('/api/workflows', (req: Request, res: Response) => {
    res.json({ 
      message: 'Create workflow endpoint - ready for implementation',
      body: req.body
    });
  });

  // Register executions router
  app.use('/api/executions', executionsRouter);

  // Start server
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
    console.log(`📊 Database URL: ${dbUrl}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\n🔗 API Endpoints:`);
    console.log(`   - Root: http://localhost:${port}/`);
    console.log(`   - Health: http://localhost:${port}/health`);
    console.log(`   - Workflows: http://localhost:${port}/api/workflows`);
    console.log(`   - Execute Workflow: http://localhost:${port}/api/executions/:workflowId/execute`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});