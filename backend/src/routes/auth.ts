import express from 'express';
import { z } from 'zod';
import { db } from '../database/db';
import { hashPassword, comparePassword } from '../utils/password';
import { signJwt } from '../utils/jwt';

const router = express.Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password, name } = parsed.data;

  const existing = await db.query('SELECT id FROM users WHERE email=$1', [email]);
  if (existing.rowCount) return res.status(409).json({ error: 'Email already in use' });

  const password_hash = await hashPassword(password);
  const insert = await db.query(
    'INSERT INTO users (email, password_hash, name, role) VALUES ($1,$2,$3,$4) RETURNING id,email,name,role',
    [email, password_hash, name, 'user']
  );

  const user = insert.rows[0];
  const token = signJwt({ id: user.id, email: user.email, role: user.role });

  return res.status(201).json({ token, user });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { email, password } = parsed.data;

  const result = await db.query('SELECT id,email,password_hash,name,role FROM users WHERE email=$1', [email]);
  if (!result.rowCount) return res.status(401).json({ error: 'Invalid credentials' });

  const user = result.rows[0];
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signJwt({ id: user.id, email: user.email, role: user.role });

  return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

export default router;