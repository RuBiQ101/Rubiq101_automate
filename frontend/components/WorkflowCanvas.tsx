"use client";

import { useState, useRef, useEffect } from "react";
import Node, { type NodeData, type NodeType } from "./workflow/Node";
import Connection, { type ConnectionData } from "./workflow/Connection";
import Toolbar from "./workflow/Toolbar";
import styles from "./WorkflowCanvas.module.css";

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartPos = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add node
  const addNode = (type: NodeType) => {
    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 300 - canvasOffset.x, y: 200 - canvasOffset.y },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        description: `New ${type} node`,
      },
    };
    setNodes([...nodes, newNode]);
  };

  // Clear canvas
  const clearCanvas = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      setNodes([]);
      setConnections([]);
      setSelectedNodeId(null);
      setSelectedConnectionId(null);
    }
  };

  // Node drag handlers
  const handleNodeDragStart = (id: string, e: React.MouseEvent) => {
    setSelectedNodeId(id);
    setSelectedConnectionId(null);
  };

  const handleNodeDrag = (id: string, dx: number, dy: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              position: {
                x: node.position.x + dx,
                y: node.position.y + dy,
              },
            }
          : node
      )
    );
  };

  const handleNodeDragEnd = () => {
    // Drag end logic if needed
  };

  // Node click handler
  const handleNodeClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    setSelectedConnectionId(null);
  };

  // Connection handlers
  const handleOutputClick = (nodeId: string) => {
    if (connectingFrom === null) {
      setConnectingFrom(nodeId);
    } else {
      // Create connection
      const newConnection: ConnectionData = {
        id: `conn-${Date.now()}`,
        source: connectingFrom,
        target: nodeId,
      };
      setConnections([...connections, newConnection]);
      setConnectingFrom(null);
    }
  };

  const handleInputClick = (nodeId: string) => {
    if (connectingFrom !== null && connectingFrom !== nodeId) {
      // Create connection
      const newConnection: ConnectionData = {
        id: `conn-${Date.now()}`,
        source: connectingFrom,
        target: nodeId,
      };
      setConnections([...connections, newConnection]);
      setConnectingFrom(null);
    }
  };

  const handleConnectionClick = (id: string) => {
    setSelectedConnectionId(id);
    setSelectedNodeId(null);
  };

  // Canvas click handler
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodeId(null);
      setSelectedConnectionId(null);
      setConnectingFrom(null);
    }
  };

  // Canvas panning
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPanning(true);
      panStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    if (!isPanning) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - panStartPos.current.x;
      const dy = e.clientY - panStartPos.current.y;
      setCanvasOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
      panStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning]);

  // Delete selected node or connection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNodeId) {
          setNodes((prevNodes) =>
            prevNodes.filter((node) => node.id !== selectedNodeId)
          );
          setConnections((prevConns) =>
            prevConns.filter(
              (conn) =>
                conn.source !== selectedNodeId && conn.target !== selectedNodeId
            )
          );
          setSelectedNodeId(null);
        } else if (selectedConnectionId) {
          setConnections((prevConns) =>
            prevConns.filter((conn) => conn.id !== selectedConnectionId)
          );
          setSelectedConnectionId(null);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, selectedConnectionId]);

  // Get node position for connections
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: node.position.x + 100 + canvasOffset.x,
      y: node.position.y + 50 + canvasOffset.y,
    };
  };

  return (
    <div className={styles.container}>
      <Toolbar onAddNode={addNode} onClearCanvas={clearCanvas} />
      <div
        ref={canvasRef}
        className={styles.canvas}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        style={{ cursor: isPanning ? "grabbing" : "default" }}
      >
        <div
          className={styles.canvasContent}
          style={{
            transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
          }}
        >
          {/* SVG for connections */}
          <svg className={styles.connectionLayer}>
            {connections.map((conn) => (
              <Connection
                key={conn.id}
                connection={conn}
                sourcePos={getNodeCenter(conn.source)}
                targetPos={getNodeCenter(conn.target)}
                isSelected={conn.id === selectedConnectionId}
                onClick={handleConnectionClick}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              isSelected={node.id === selectedNodeId}
              onDragStart={handleNodeDragStart}
              onDrag={handleNodeDrag}
              onDragEnd={handleNodeDragEnd}
              onClick={handleNodeClick}
              onOutputClick={handleOutputClick}
              onInputClick={handleInputClick}
            />
          ))}
        </div>

        {/* Status bar */}
        {connectingFrom && (
          <div className={styles.statusBar}>
            Click on another node's input port to create connection
          </div>
        )}
      </div>
    </div>
  );
}