import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN } as any);
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}