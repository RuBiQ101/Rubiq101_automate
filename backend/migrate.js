#!/usr/bin/env node
const { Client } = require('pg');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

async function runMigrations() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Ensure migrations table exists (keep existing schema: name/run_on)
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
    const { rowCount } = await client.query('SELECT 1 FROM migrations WHERE name = $1', [name]);

    if (rowCount > 0) {
      console.log(`Skipping already applied: ${name}`);
      continue;
    }

    console.log(`Applying migration: ${name}`);
    const sql = fs.readFileSync(file, 'utf8');

    // If any statement uses CONCURRENTLY, run statements individually without a transaction
    const hasConcurrently = /\bCONCURRENTLY\b/i.test(sql);
    if (hasConcurrently) {
      try {
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(Boolean);
        for (const stmt of statements) {
          await client.query(stmt);
        }
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [name]);
        console.log(`Successfully applied (no txn): ${name}`);
      } catch (err) {
        console.error(`Failed to apply migration (no txn): ${name}`, err);
        throw err;
      }
    } else {
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [name]);
        await client.query('COMMIT');
        console.log(`Successfully applied: ${name}`);
      } catch (err) {
        await client.query('ROLLBACK').catch(() => {});
        console.error(`Failed to apply migration: ${name}`, err);
        throw err;
      }
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