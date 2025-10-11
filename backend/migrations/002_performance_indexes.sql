-- Add indexes for better query performance

-- Users table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Workflows table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_created_at ON workflows(created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_user_status ON workflows(user_id, status);

-- Workflow executions table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_executions_status ON workflow_executions(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_executions_started_at ON workflow_executions(started_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_executions_workflow_started ON workflow_executions(workflow_id, started_at DESC);

-- Execution steps table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_steps_execution_id ON execution_steps(execution_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_steps_execution_order ON execution_steps(execution_id, execution_order);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_steps_status ON execution_steps(status);

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_user_created ON workflows(user_id, created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_executions_workflow_status_started ON workflow_executions(workflow_id, status, started_at DESC);

-- Partial indexes for active workflows
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_active ON workflows(user_id, updated_at DESC) WHERE status = 'active';

-- GIN index for JSONB definition searches (if needed)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_workflows_definition_gin ON workflows USING GIN (definition);
