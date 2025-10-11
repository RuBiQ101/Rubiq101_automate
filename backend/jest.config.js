module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  // Remove global setup for now
  // globalSetup: './jest.global-setup.js',
  // globalTeardown: './jest.global-teardown.js',

  // Add test environment variables
  setupFiles: ['<rootDir>/jest.setup.js'],
};
