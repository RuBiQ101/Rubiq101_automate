// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://dev_user:dev_password@localhost:5432/workflow_platform';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.JWT_SECRET = 'test-jwt-secret';

// Mock console.log in tests to reduce noise
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // @ts-ignore
  global.console.log = jest.fn();
}
