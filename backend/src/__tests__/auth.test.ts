import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: `test_${Date.now()}@example.com`,
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toContain('@example.com');
  });

  it('should login existing user', async () => {
    const email = `login_${Date.now()}@example.com`;

    // First signup
    await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email,
        password: 'password123'
      });

    // Then login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email,
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
