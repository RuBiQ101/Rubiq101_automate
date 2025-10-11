import client from 'prom-client';
import type { Request, Response, NextFunction } from 'express';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'] as const,
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'] as const
});

const workflowExecutionsTotal = new client.Counter({
  name: 'workflow_executions_total',
  help: 'Total number of workflow executions',
  labelNames: ['status', 'workflow_id'] as const
});

const workflowExecutionDuration = new client.Histogram({
  name: 'workflow_execution_duration_seconds',
  help: 'Duration of workflow executions',
  labelNames: ['workflow_id', 'status'] as const,
  buckets: [1, 5, 10, 30, 60, 300, 600, 1800]
});

const activeUsers = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users in the last 24 hours'
});

const llmRequestsTotal = new client.Counter({
  name: 'llm_requests_total',
  help: 'Total number of LLM API requests',
  labelNames: ['provider', 'model', 'status'] as const
});

const llmRequestDuration = new client.Histogram({
  name: 'llm_request_duration_seconds',
  help: 'Duration of LLM API requests',
  labelNames: ['provider', 'model'] as const,
  buckets: [0.5, 1, 2, 5, 10, 20, 30, 60]
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(workflowExecutionsTotal);
register.registerMetric(workflowExecutionDuration);
register.registerMetric(activeUsers);
register.registerMetric(llmRequestsTotal);
register.registerMetric(llmRequestDuration);

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = (req as any).route?.path || req.path;

    httpRequestDuration
      .labels(req.method, route, res.statusCode.toString())
      .observe(duration);

    httpRequestsTotal
      .labels(req.method, route, res.statusCode.toString())
      .inc();
  });
  next();
};

export const workflowMetrics = {
  executionStarted: (workflowId: string) => {
    workflowExecutionsTotal.labels('started', workflowId).inc();
  },
  executionCompleted: (workflowId: string, status: string, durationMs: number) => {
    workflowExecutionsTotal.labels(status, workflowId).inc();
    workflowExecutionDuration.labels(workflowId, status).observe(durationMs / 1000);
  }
};

export const llmMetrics = {
  requestStarted: (_provider: string, _model: string) => {
    return Date.now();
  },
  requestCompleted: (provider: string, model: string, status: string, startTime: number) => {
    const duration = (Date.now() - startTime) / 1000;
    llmRequestsTotal.labels(provider, model, status).inc();
    llmRequestDuration.labels(provider, model).observe(duration);
  }
};

export { register };
export default {
  httpRequestDuration,
  httpRequestsTotal,
  workflowExecutionsTotal,
  workflowExecutionDuration,
  activeUsers,
  llmRequestsTotal,
  llmRequestDuration
};
