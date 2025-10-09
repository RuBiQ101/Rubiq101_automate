import express, { type Request, type Response } from 'express';
import { workflowQueue } from '../queues/workflow.queue';
import { requireAuth, type AuthRequest } from '../middleware/auth';
import { db } from '../database/db';

const router = express.Router();

// Existing execute endpoint (kept for compatibility). Prefer POST /api/workflows/:id/execute
router.post('/:workflowId/execute', requireAuth, async (req: AuthRequest, res: Response) => {
  const { workflowId } = req.params;
  const { triggerData } = req.body;
  const userId = req.user!.id;

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

// List executions for a workflow
router.get('/:workflowId', requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { workflowId } = req.params;

  // Verify ownership
  const wf = await db.query(
    'SELECT id FROM workflows WHERE id=$1 AND user_id=$2',
    [workflowId, userId]
  );
  if (!wf.rowCount) return res.status(404).json({ error: 'Workflow not found' });

  // Fetch executions
  const executions = await db.query(
    `SELECT id, status, started_at, completed_at, execution_time_ms
     FROM workflow_executions
     WHERE workflow_id=$1
     ORDER BY started_at DESC`,
    [workflowId]
  );

  res.json(executions.rows);
});

// Get details of a single execution (including steps)
router.get('/:workflowId/:executionId', requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { workflowId, executionId } = req.params;

  // Verify ownership
  const wf = await db.query(
    'SELECT id FROM workflows WHERE id=$1 AND user_id=$2',
    [workflowId, userId]
  );
  if (!wf.rowCount) return res.status(404).json({ error: 'Workflow not found' });

  // Fetch execution
  const execRes = await db.query(
    `SELECT id, status, input_data, output_data, error_message, started_at, completed_at, execution_time_ms
     FROM workflow_executions
     WHERE id=$1 AND workflow_id=$2`,
    [executionId, workflowId]
  );
  if (!execRes.rowCount) return res.status(404).json({ error: 'Execution not found' });
  const execution = execRes.rows[0];

  // Fetch steps
  const steps = await db.query(
    `SELECT id, step_name, step_type, status, input_data, output_data, error_message, started_at, completed_at, execution_order
     FROM execution_steps
     WHERE execution_id=$1
     ORDER BY execution_order`,
    [executionId]
  );

  res.json({ execution, steps: steps.rows });
});

export default router;