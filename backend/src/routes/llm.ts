import express from 'express';
import { z } from 'zod';
import { llmGateway } from '../llm/gateway';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

const chatSchema = z.object({
  prompt: z.string().min(1),
  provider: z.enum(['openai', 'anthropic']).optional(),
  model: z.string().optional(),
  maxTokens: z.number().optional(),
});

// Direct LLM chat endpoint
router.post('/chat', requireAuth, async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const { prompt, provider, ...options } = parsed.data as any;
    const response = await llmGateway.call(prompt, provider, options);
    res.json({ response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const generateWorkflowSchema = z.object({
  description: z.string().min(10),
});

// Generate workflow from natural language
router.post('/generate-workflow', requireAuth, async (req, res) => {
  const parsed = generateWorkflowSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const { description } = parsed.data as any;
    const workflow = await llmGateway.generateWorkflow(description);
    res.json({ workflow });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


