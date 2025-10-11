import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: {
    service: 'ai-workflow-backend',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get?.('User-Agent'),
      userId: (req as any).user?.id || 'anonymous'
    };

    if (res.statusCode >= 400) {
      logger.warn('Request completed with error', logData);
    } else {
      logger.info('Request completed', logData);
    }
  });
  next();
};

export const workflowLogger = {
  started: (workflowId: string, userId: string, executionId: string) => {
    logger.info('Workflow execution started', {
      event: 'workflow_started',
      workflowId,
      userId,
      executionId
    });
  },
  completed: (workflowId: string, executionId: string, duration: number, status: string) => {
    logger.info('Workflow execution completed', {
      event: 'workflow_completed',
      workflowId,
      executionId,
      duration,
      status
    });
  },
  stepCompleted: (executionId: string, stepId: string, stepType: string, duration: number) => {
    logger.info('Workflow step completed', {
      event: 'step_completed',
      executionId,
      stepId,
      stepType,
      duration
    });
  },
  error: (workflowId: string, executionId: string, error: Error) => {
    logger.error('Workflow execution failed', {
      event: 'workflow_error',
      workflowId,
      executionId,
      error: error.message,
      stack: error.stack
    });
  }
};

export default logger;
