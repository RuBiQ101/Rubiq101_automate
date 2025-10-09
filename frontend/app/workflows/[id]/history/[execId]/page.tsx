"use client";
import useSWR from "swr";
import api from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function HistoryDetailPage({ params }: { params: { id: string; execId: string } }) {
  const { id: workflowId, execId } = params;
  const { data, error } = useSWR(
    `/api/executions/${workflowId}/${execId}`,
    (url) => api.get(url).then((r) => r.data)
  );

  if (error) return <div className="p-4">Failed to load execution details.</div>;
  if (!data) return <div className="p-4">Loading...</div>;

  const { execution, steps } = data;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Execution Details</h2>
      <div className="mb-4">
        <div><strong>Execution ID:</strong> {execution.id}</div>
        <div><strong>Status:</strong> {execution.status}</div>
        <div>
          <strong>Started:</strong> {new Date(execution.started_at).toLocaleString()}
        </div>
        <div>
          <strong>Completed:</strong> {execution.completed_at
            ? new Date(execution.completed_at).toLocaleString()
            : 'Running'}
        </div>
        {execution.execution_time_ms != null && (
          <div><strong>Duration:</strong> {execution.execution_time_ms} ms</div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">Steps</h3>
      <ul className="space-y-2">
        {steps.map((step: any) => (
          <li key={step.id} className="border rounded p-2">
            <div className="flex justify-between">
              <div>
                <strong>{step.step_name}</strong> ({step.step_type})
              </div>
              <div>{step.status}</div>
            </div>
            {step.error_message && (
              <div className="text-red-600 mt-1">{step.error_message}</div>
            )}
            {step.output_data && (
              <pre className="mt-1 bg-gray-100 p-2 overflow-auto">
                {JSON.stringify(step.output_data, null, 2)}
              </pre>
            )}
            <div className="text-gray-500 text-sm mt-1">
              {step.started_at && `Started ${formatDistanceToNow(new Date(step.started_at))} ago`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


