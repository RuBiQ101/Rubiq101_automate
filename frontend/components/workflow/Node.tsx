"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Node.module.css";

export type NodeType = "trigger" | "action" | "condition";

export interface NodeData {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: { label: string; description?: string };
}

interface NodeProps {
  node: NodeData;
  isSelected: boolean;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onDrag: (id: string, dx: number, dy: number) => void;
  onDragEnd: () => void;
  onClick: (id: string, e: React.MouseEvent) => void;
  onOutputClick: (nodeId: string) => void;
  onInputClick: (nodeId: string) => void;
}

export default function Node({
  node,
  isSelected,
  onDragStart,
  onDrag,
  onDragEnd,
  onClick,
  onOutputClick,
  onInputClick,
}: NodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      onDrag(node.id, dx, dy);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, node.id, onDrag, onDragEnd]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.port)) {
      return;
    }
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    onDragStart(node.id, e);
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case "trigger":
        return "⚡";
      case "action":
        return "⚙️";
      case "condition":
        return "🔀";
      default:
        return "📦";
    }
  };

  return (
    <div
      className={`${styles.node} ${styles[node.type]} ${
        isSelected ? styles.selected : ""
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => onClick(node.id, e)}
    >
      <div
        className={`${styles.port} ${styles.inputPort}`}
        onClick={(e) => {
          e.stopPropagation();
          onInputClick(node.id);
        }}
      />
      <div className={styles.nodeContent}>
        <div className={styles.nodeIcon}>{getNodeIcon()}</div>
        <div className={styles.nodeLabel}>{node.data.label}</div>
        {node.data.description && (
          <div className={styles.nodeDescription}>{node.data.description}</div>
        )}
      </div>
      <div
        className={`${styles.port} ${styles.outputPort}`}
        onClick={(e) => {
          e.stopPropagation();
          onOutputClick(node.id);
        }}
      />
    </div>
  );
}