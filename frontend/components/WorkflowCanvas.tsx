"use client";
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node types
const TriggerNode = ({ data }: any) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-green-100 border-2 border-green-200">
    <div className="font-bold">{data.label}</div>
    <div className="text-sm text-gray-600">Trigger</div>
  </div>
);

const AINode = ({ data }: any) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-blue-100 border-2 border-blue-200">
    <div className="font-bold">{data.label}</div>
    <div className="text-sm text-gray-600">AI Step</div>
    {data.config?.prompt && (
      <div className="text-xs mt-1 text-gray-500 max-w-32 truncate">
        {data.config.prompt}
      </div>
    )}
  </div>
);

const ActionNode = ({ data }: any) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-yellow-100 border-2 border-yellow-200">
    <div className="font-bold">{data.label}</div>
    <div className="text-sm text-gray-600">Action</div>
  </div>
);

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  ai: AINode,
  action: ActionNode,
};

interface WorkflowCanvasProps {
  workflow?: any;
  onSave?: (definition: any) => void;
  onExecute?: () => void;
  isExecuting?: boolean;
}

export default function WorkflowCanvas({ 
  workflow, 
  onSave, 
  onExecute, 
  isExecuting = false 
}: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Load workflow definition into canvas
  useEffect(() => {
    if (workflow?.definition?.steps) {
      const workflowNodes = workflow.definition.steps.map((step: any, index: number) => ({
        id: step.id,
        type: step.type,
        position: { x: 100 + (index * 200), y: 100 },
        data: { 
          label: step.name,
          config: step.config,
          stepType: step.type
        },
      }));

      const workflowEdges = workflow.definition.steps
        .filter((step: any) => step.next?.length > 0)
        .flatMap((step: any) => 
          step.next.map((nextId: string) => ({
            id: `${step.id}-${nextId}`,
            source: step.id,
            target: nextId,
          }))
        );

      setNodes(workflowNodes as any);
      setEdges(workflowEdges as any);
    }
  }, [workflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: 'trigger' | 'ai' | 'action') => {
    const id = `${type}_${Date.now()}`;
    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        config: type === 'ai' ? { prompt: 'Enter your prompt here', model: 'gpt-3.5-turbo' } : {},
        stepType: type
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const updateNodeConfig = (nodeId: string, config: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
  };

  const handleSave = () => {
    const definition = {
      steps: nodes.map((node: any) => ({
        id: node.id,
        type: node.data.stepType,
        name: node.data.label,
        config: node.data.config || {},
        next: (edges as Edge[])
          .filter((edge) => edge.source === node.id)
          .map((edge) => edge.target),
      })),
    };
    onSave?.(definition);
  };

  const selectedNode = (nodes as any[]).find(n => n.id === selectedNodeId);

  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>

        {/* Toolbar */}
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg">
          <button 
            onClick={() => addNode('trigger')}
            className="px-3 py-1 bg-green-500 text-white rounded mr-2"
          >
            + Trigger
          </button>
          <button 
            onClick={() => addNode('ai')}
            className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
          >
            + AI Step
          </button>
          <button 
            onClick={() => addNode('action')}
            className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
          >
            + Action
          </button>
        </div>

        {/* Save/Execute buttons */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-lg">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 text-white rounded mr-2"
          >
            Save
          </button>
          <button 
            onClick={onExecute}
            disabled={isExecuting}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
          >
            {isExecuting ? 'Running...' : 'Execute'}
          </button>
        </div>
      </div>

      {/* Property Panel */}
      {selectedNode && (
        <div className="w-80 bg-white border-l p-4">
          <h3 className="font-bold mb-4">Edit {selectedNode.data.label}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={selectedNode.data.label}
              onChange={(e) => {
                setNodes((nds: any[]) =>
                  nds.map((node: any) =>
                    node.id === selectedNodeId
                      ? { ...node, data: { ...node.data, label: e.target.value } }
                      : node
                  )
                );
              }}
              className="w-full p-2 border rounded"
            />
          </div>

          {selectedNode.data.stepType === 'ai' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Prompt:</label>
                <textarea
                  value={selectedNode.data.config?.prompt || ''}
                  onChange={(e) => 
                    updateNodeConfig(selectedNodeId!, { 
                      ...selectedNode.data.config, 
                      prompt: e.target.value 
                    })
                  }
                  className="w-full p-2 border rounded h-24"
                  placeholder="Enter AI prompt..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Model:</label>
                <select
                  value={selectedNode.data.config?.model || 'gpt-3.5-turbo'}
                  onChange={(e) => 
                    updateNodeConfig(selectedNodeId!, { 
                      ...selectedNode.data.config, 
                      model: e.target.value 
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
                </select>
              </div>
            </>
          )}

          <button
            onClick={() => {
              setNodes((nds: any[]) => nds.filter((node: any) => node.id !== selectedNodeId));
              setEdges((eds: any[]) => eds.filter((edge: any) => 
                edge.source !== selectedNodeId && edge.target !== selectedNodeId
              ));
              setSelectedNodeId(null);
            }}
            className="w-full px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
}