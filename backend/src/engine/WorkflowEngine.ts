import { db } from '../database/db';

interface WorkflowDefinitionStep {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'ai';
  name: string;
  config: Record<string, any>;
  next?: string[];
}

interface WorkflowDefinition {
  steps: WorkflowDefinitionStep[];
}

export class WorkflowEngine {
  async executeWorkflow(workflowId: string, triggerData: any, userId?: string) {
    const startedAt = Date.now();

    // Load workflow
    const wfRes = await db.query(
      `SELECT id, definition FROM workflows WHERE id = $1`,
      [workflowId]
    );
    if (!wfRes.rowCount) {
      throw new Error('Workflow not found');
    }

    const definition: WorkflowDefinition = wfRes.rows[0].definition;

    // Create execution record
    const execRes = await db.query(
      `INSERT INTO workflow_executions (workflow_id, status, input_data, started_at)
       VALUES ($1, $2, $3, NOW()) RETURNING id`,
      [workflowId, 'running', JSON.stringify(triggerData || {})]
    );
    const executionId: string = execRes.rows[0].id;

    let lastOutput: any = null;

    try {
      for (let index = 0; index < (definition?.steps?.length || 0); index++) {
        const step = definition.steps[index];

        const stepStart = Date.now();
        let stepOutput: any = null;

        // Minimal compatibility behavior
        switch (step.type) {
          case 'trigger':
            // Triggers initiate the workflow; skip active work but record
            stepOutput = { passedThrough: true, triggerData: triggerData || {} };
            break;
          case 'ai':
            // Placeholder AI call; return stub response
            stepOutput = { ok: true, message: 'AI step executed (stub)' };
            break;
          case 'action':
            // Placeholder action
            stepOutput = { ok: true };
            break;
          case 'condition':
            // Placeholder condition evaluation
            stepOutput = { condition: true };
            break;
          default:
            stepOutput = { ok: true };
        }

        lastOutput = stepOutput;

        await db.query(
          `INSERT INTO execution_steps (
            execution_id, step_name, step_type, status, input_data, output_data, started_at, completed_at, execution_order
          ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)`,
          [
            executionId,
            step.name,
            step.type,
            'completed',
            JSON.stringify({ userId, triggerData }),
            JSON.stringify(stepOutput),
            index + 1,
          ]
        );
      }

      const durationMs = Date.now() - startedAt;
      await db.query(
        `UPDATE workflow_executions
         SET status = $1,
             output_data = $2,
             completed_at = NOW(),
             execution_time_ms = $3
         WHERE id = $4`,
        ['completed', JSON.stringify(lastOutput), durationMs, executionId]
      );

      return {
        ok: true,
        executionId,
        workflowId,
        userId,
        output: lastOutput,
        durationMs,
      };
    } catch (error: any) {
      const durationMs = Date.now() - startedAt;
      await db.query(
        `UPDATE workflow_executions
         SET status = $1,
             error_message = $2,
             completed_at = NOW(),
             execution_time_ms = $3
         WHERE id = $4`,
        ['failed', error?.message || 'Execution failed', durationMs, executionId]
      );

      throw error;
    }
  }
}


