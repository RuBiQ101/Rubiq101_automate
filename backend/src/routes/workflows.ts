import express from 'express';
import { z } from 'zod';
import { db } from '../database/db';
import { requireAuth, type AuthRequest } from '../middleware/auth';
import { workflowQueue } from '../queues/workflow.queue';

const router = express.Router();

const workflowSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  definition: z.object({
    steps: z.array(
      z.object({
        id: z.string(),
        type: z.enum(['trigger', 'action', 'condition', 'ai']),
        name: z.string(),
        config: z.record(z.string(), z.any()),
        next: z.array(z.string()).optional(),
      })
    ),
  }),
  status: z.enum(['draft', 'active']).default('draft'),
});

// Create
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = workflowSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, description, definition, status } = parsed.data;
  const userId = req.user!.id;

  const result = await db.query(
    `INSERT INTO workflows (user_id, name, description, definition, status)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [userId, name, description || null, JSON.stringify(definition), status]
  );

  res.status(201).json(result.rows[0]);
});

// List
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const result = await db.query(
    `SELECT * FROM workflows WHERE user_id=$1 ORDER BY created_at DESC`,
    [userId]
  );
  res.json(result.rows);
});

// Get by id
router.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const result = await db.query(
    `SELECT * FROM workflows WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
  if (!result.rowCount) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

// Update
router.put('/:id', requireAuth, async (req: AuthRequest, res) => {
  const parsed = workflowSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const userId = req.user!.id;
  const { id } = req.params;

  const existing = await db.query(`SELECT * FROM workflows WHERE id=$1 AND user_id=$2`, [id, userId]);
  if (!existing.rowCount) return res.status(404).json({ error: 'Not found' });

  const wf = existing.rows[0];
  const name = parsed.data.name ?? wf.name;
  const description = parsed.data.description ?? wf.description;
  const definition = parsed.data.definition ? JSON.stringify(parsed.data.definition) : wf.definition;
  const status = parsed.data.status ?? wf.status;

  const result = await db.query(
    `UPDATE workflows SET name=$1, description=$2, definition=$3, status=$4, updated_at=NOW()
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [name, description, definition, status, id, userId]
  );

  res.json(result.rows[0]);
});

// Delete
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const del = await db.query(`DELETE FROM workflows WHERE id=$1 AND user_id=$2`, [id, userId]);
  if (!del.rowCount) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// Execute (enqueue)
router.post('/:id/execute', requireAuth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { id } = req.params;
  const { triggerData } = req.body || {};

  const wf = await db.query(`SELECT * FROM workflows WHERE id=$1 AND user_id=$2`, [id, userId]);
  if (!wf.rowCount) return res.status(404).json({ error: 'Workflow not found' });

  const job = await workflowQueue.add('executeWorkflow', {
    workflowId: id,
    triggerData: triggerData || {},
    userId,
  });

  res.json({ jobId: job.id, status: 'queued' });
});

export default router;


