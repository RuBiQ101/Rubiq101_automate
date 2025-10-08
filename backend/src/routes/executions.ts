import express, { type Request, type Response } from 'express';
import { workflowQueue } from '../queues/workflow.queue';

const router = express.Router();

router.post('/:workflowId/execute', async (req: Request, res: Response) => {
  const { workflowId } = req.params;
  const { triggerData, userId } = req.body;

  const job = await workflowQueue.add('executeWorkflow', {
    workflowId,
    triggerData,
    userId,
  });

  res.json({
    jobId: job.id,
    status: 'queued',
  });
});

export default router;