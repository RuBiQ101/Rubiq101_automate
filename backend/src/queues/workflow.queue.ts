import { Queue } from 'bullmq';
import redisOptions from '../redis';

export const workflowQueue = new Queue('workflowQueue', {
  connection: redisOptions,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});