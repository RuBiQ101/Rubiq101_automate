"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import api from "@/lib/api";
import WorkflowCanvas from "@/components/WorkflowCanvas";

export default function WorkflowEditorPage() {
  const { id } = useParams();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const { data: workflow, error } = useSWR(
    id ? `/api/workflows/${id}` : null, 
    url => api.get(url).then(r => r.data)
  );

  const handleSave = async (definition: any) => {
    try {
      await api.put(`/api/workflows/${id}`, { definition });
      mutate(`/api/workflows/${id}`);
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save workflow');
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResult(null);
    
    try {
      const response = await api.post(`/api/workflows/${id}/execute`, {
        triggerData: { timestamp: new Date().toISOString() }
      });
      
      setExecutionResult({
        jobId: response.data.jobId,
        status: response.data.status,
        message: 'Workflow execution queued successfully!'
      });
    } catch (error: any) {
      console.error('Execution failed:', error);
      setExecutionResult({
        error: true,
        message: error.response?.data?.error || 'Execution failed'
      });
    } finally {
      setIsExecuting(false);
    }
  };

  if (error) return <div className="p-4">Error loading workflow</div>;
  if (!workflow) return <div className="p-4">Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{workflow.name}</h1>
          <Link href={`/workflows/${id}/history`}>
            <button className="px-3 py-1 bg-gray-200 rounded">View History</button>
          </Link>
        </div>
        {workflow.description && (
          <p className="text-gray-600 mt-1">{workflow.description}</p>
        )}
        <div className="mt-2">
          <span className={`px-2 py-1 rounded text-sm ${
            workflow.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {workflow.status}
          </span>
        </div>
      </div>

      {/* Execution Result */}
      {executionResult && (
        <div className={`p-4 ${
          executionResult.error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        } border-b`}>
          <div className={`font-medium ${
            executionResult.error ? 'text-red-800' : 'text-green-800'
          }`}>
            {executionResult.message}
          </div>
          {executionResult.jobId && (
            <div className="text-sm text-gray-600 mt-1">
              Job ID: {executionResult.jobId}
            </div>
          )}
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1">
        <WorkflowCanvas
          workflow={workflow}
          onSave={handleSave}
          onExecute={handleExecute}
          isExecuting={isExecuting}
        />
      </div>
    </div>
  );
}


