#!/usr/bin/env node
const { Client } = require('pg');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

async function runMigrations() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Ensure migrations table exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      run_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // Load all migration files
  const files = glob.sync('migrations/*.sql').sort();

  for (const file of files) {
    const name = path.basename(file);
    const { rowCount } = await client.query(
      'SELECT 1 FROM migrations WHERE name = $1',
      [name]
    );

    if (rowCount === 0) {
      console.log(`Applying migration: ${name}`);
      const sql = fs.readFileSync(file, 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [name]
        );
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        console.error(`Failed to apply migration: ${name}`, err);
        process.exit(1);
      }
    } else {
      console.log(`Skipping already applied: ${name}`);
    }
  }

  await client.end();
  console.log('All migrations applied.');
}

// Export for use in server startup
module.exports = runMigrations;

// Run directly if called as script
if (require.main === module) {
  runMigrations().catch(err => {
    console.error('Migration error:', err);
    process.exit(1);
  });
}