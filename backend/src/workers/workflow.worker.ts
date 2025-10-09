import { Worker, type Job } from 'bullmq';
import redisOptions from '../redis';
import { WorkflowEngine } from '../engine/WorkflowEngine';

export const workflowWorker = new Worker(
  'workflowQueue',
  async (job: Job) => {
    const { workflowId, triggerData, userId } = job.data;
    console.log(`Processing workflow ${workflowId} for user ${userId}`);

    const engine = new WorkflowEngine();
    const result = await engine.executeWorkflow(workflowId, triggerData, userId);
    return result;
  },
  {
    connection: redisOptions,
  }
);

// Optional: listen to job events
workflowWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

workflowWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

// Log when worker starts
console.log('✅ Workflow worker started and listening for jobs...');
console.log('📋 Queue: workflowQueue');
console.log('🔗 Redis: localhost:6379');

// Keep the process alive
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing worker...');
  await workflowWorker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing worker...');
  await workflowWorker.close();
  process.exit(0);
});