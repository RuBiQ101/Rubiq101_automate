const { execSync, spawn } = require('child_process');
const net = require('net');
const path = require('path');

function waitForPort(host, port, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function tryConnect() {
      const socket = net.createConnection({ host, port }, () => {
        socket.end();
        resolve(true);
      });
      socket.on('error', () => {
        const elapsed = Date.now() - start;
        if (elapsed > timeoutMs) {
          reject(new Error(`Timeout waiting for ${host}:${port}`));
        } else {
          setTimeout(tryConnect, 500);
        }
      });
    }
    tryConnect();
  });
}

module.exports = async () => {
  // Prefer user-provided DATABASE_URL_TEST; else spin up docker-compose test DB
  const rootDir = path.resolve(__dirname, '..');
  const dockerDir = path.resolve(rootDir, '..', 'docker');

  const hasDbUrl = !!process.env.DATABASE_URL;
  const testDbUrl = process.env.DATABASE_URL_TEST || 'postgresql://test_user:test_password@localhost:5433/workflow_platform_test';

  if (!hasDbUrl) {
    // Start test Postgres via docker-compose (idempotent)
    try {
      execSync(`docker compose -f "${path.join(dockerDir, 'docker-compose.test.yml')}" up -d`, { stdio: 'inherit' });
    } catch (e) {
      console.warn('Failed to start test Postgres via docker compose:', e.message);
    }

    // Wait for port 5433
    await waitForPort('127.0.0.1', 5433, 60000);
    process.env.DATABASE_URL = testDbUrl;
  }

  // Run migrations against the test DB
  process.env.NODE_ENV = 'test';
  try {
    execSync('node migrate.js', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.error('Migration failed for test DB:', e.message);
    throw e;
  }
};
