export interface ConnectionData {
  id: string;
  source: string;
  target: string;
}

interface ConnectionProps {
  connection: ConnectionData;
  sourcePos: { x: number; y: number };
  targetPos: { x: number; y: number };
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function Connection({
  connection,
  sourcePos,
  targetPos,
  isSelected,
  onClick,
}: ConnectionProps) {
  const path = `M ${sourcePos.x} ${sourcePos.y} C ${
    sourcePos.x + 100
  } ${sourcePos.y}, ${targetPos.x - 100} ${targetPos.y}, ${targetPos.x} ${
    targetPos.y
  }`;

  return (
    <g onClick={() => onClick(connection.id)} style={{ cursor: "pointer" }}>
      <path
        d={path}
        stroke={isSelected ? "#3b82f6" : "#94a3b8"}
        strokeWidth={isSelected ? "3" : "2"}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={path}
        stroke="transparent"
        strokeWidth="20"
        fill="none"
        style={{ cursor: "pointer" }}
      />
    </g>
  );
}