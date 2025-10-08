"use client";

import type { NodeType } from "./Node";
import styles from "./Toolbar.module.css";

interface ToolbarProps {
  onAddNode: (type: NodeType) => void;
  onClearCanvas: () => void;
}

export default function Toolbar({ onAddNode, onClearCanvas }: ToolbarProps) {
  const nodeTypes: { type: NodeType; label: string; icon: string; description: string }[] = [
    { type: "trigger", label: "Trigger", icon: "⚡", description: "Start workflow" },
    { type: "action", label: "Action", icon: "⚙️", description: "Perform task" },
    { type: "condition", label: "Condition", icon: "🔀", description: "Branch logic" },
  ];

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarHeader}>
        <h3 className={styles.toolbarTitle}>Node Palette</h3>
      </div>
      <div className={styles.nodeList}>
        {nodeTypes.map((nodeType) => (
          <button
            key={nodeType.type}
            className={`${styles.nodeButton} ${styles[nodeType.type]}`}
            onClick={() => onAddNode(nodeType.type)}
          >
            <span className={styles.nodeButtonIcon}>{nodeType.icon}</span>
            <div className={styles.nodeButtonContent}>
              <div className={styles.nodeButtonLabel}>{nodeType.label}</div>
              <div className={styles.nodeButtonDescription}>
                {nodeType.description}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className={styles.toolbarFooter}>
        <button className={styles.clearButton} onClick={onClearCanvas}>
          🗑️ Clear Canvas
        </button>
      </div>
      <div className={styles.helpText}>
        <p><strong>Tips:</strong></p>
        <ul>
          <li>Click nodes to select</li>
          <li>Drag nodes to move</li>
          <li>Click ports to connect</li>
          <li>Press Delete to remove</li>
        </ul>
      </div>
    </div>
  );
}