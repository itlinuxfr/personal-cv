"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CAREER_NODES, CAREER_EDGES, type CareerNode, type TreeNodeStatus } from "@/lib/data";
import Container from "./Container";

/* ─── Layout: compute x,y positions for each node ─── */
interface Pos { x: number; y: number }

function layoutNodes(): Record<string, Pos> {
  /* Layout matching the user's sketch — zigzag with horizontal branches */
  return {
    root:        { x: 400, y: 40  },
    bts:         { x: 250, y: 140 },
    proservia:   { x: 250, y: 250 },
    middleware:  { x: 250, y: 360 },
    capgemini:   { x: 580, y: 360 },
    sysadmin1:   { x: 580, y: 470 },
    covea:       { x: 250, y: 520 },
    sysadmin2:   { x: 250, y: 630 },
    openshift:   { x: 250, y: 740 },
    techlead:    { x: 500, y: 850 },
  };
}

/* ─── Status styling ─── */
const statusColors: Record<TreeNodeStatus, { bg: string; border: string; dot: string; glow: string }> = {
  synced:      { bg: "#0d2818", border: "#22c55e", dot: "#22c55e", glow: "0 0 12px rgba(34,197,94,0.4)" },
  progressing: { bg: "#1a1a0d", border: "#eab308", dot: "#eab308", glow: "0 0 12px rgba(234,179,8,0.4)" },
  healthy:     { bg: "#0d1a2d", border: "#0086FF", dot: "#0086FF", glow: "0 0 12px rgba(0,134,255,0.4)" },
};

const statusLabel: Record<TreeNodeStatus, string> = {
  synced: "Synced",
  progressing: "Progressing",
  healthy: "Healthy",
};

/* ─── Node component ─── */
function TreeNode({ node, pos, index, onHover }: {
  node: CareerNode; pos: Pos; index: number;
  onHover: (id: string | null) => void;
}) {
  const s = statusColors[node.status];
  const isWide = node.id === "techlead";

  return (
    <motion.g
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "default" }}
    >
      {/* Card rect */}
      <rect
        x={pos.x - (isWide ? 130 : 90)}
        y={pos.y - 25}
        width={isWide ? 260 : 180}
        height={50}
        rx={12}
        fill="#0d0d12"
        stroke={s.border}
        strokeWidth={1.5}
        style={{ filter: `drop-shadow(${s.glow})` }}
      />

      {/* Status dot */}
      <circle
        cx={pos.x - (isWide ? 115 : 75)}
        cy={pos.y}
        r={5}
        fill={s.dot}
      >
        {node.status === "progressing" && (
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Label */}
      <text
        x={pos.x - (isWide ? 98 : 58)}
        y={node.subtitle ? pos.y - 3 : pos.y + 5}
        fontSize="13"
        fill="#e2e8f0"
        fontFamily="var(--font-outfit), sans-serif"
        fontWeight="600"
      >
        {node.label}
      </text>

      {/* Subtitle */}
      {node.subtitle && (
        <text
          x={pos.x - (isWide ? 78 : 38)}
          y={pos.y + 12}
          fontSize="11"
          fill="#94a3b8"
          fontFamily="var(--font-jetbrains), monospace"
        >
          {node.subtitle}
        </text>
      )}

      {/* Date badge */}
      {node.date && (
        <>
          <rect
            x={pos.x + (isWide ? 60 : 30)}
            y={pos.y - 10}
            width={50}
            height={20}
            rx={10}
            fill={s.bg}
            stroke={s.border}
            strokeWidth={0.8}
            opacity={0.8}
          />
          <text
            x={pos.x + (isWide ? 85 : 55)}
            y={pos.y + 4}
            fontSize="9"
            fill={s.border}
            textAnchor="middle"
            fontFamily="var(--font-jetbrains), monospace"
          >
            {node.date}
          </text>
        </>
      )}
    </motion.g>
  );
}

/* ─── Edge with arrow ─── */
function TreeEdge({ from, to, index }: { from: Pos; to: Pos; index: number }) {
  /* Offset to connect from bottom of source node to top of target */
  const x1 = from.x, y1 = from.y + 25;
  const x2 = to.x,   y2 = to.y - 25;
  const midY = (y1 + y2) / 2;

  const path = x1 === x2
    ? `M${x1},${y1} L${x2},${y2}`
    : `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke="#0086FF"
      strokeWidth={1.5}
      strokeDasharray="6 3"
      opacity={0.4}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.4 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.6 }}
      markerEnd="url(#arrowhead)"
    />
  );
}

/* ─── Tooltip ─── */
function Tooltip({ node, pos }: { node: CareerNode; pos: Pos }) {
  const s = statusColors[node.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute pointer-events-none z-20"
      style={{
        left: pos.x + 100,
        top: pos.y - 10,
      }}
    >
      <div className="bg-[#0d0d12] border border-white/10 rounded-lg px-4 py-3 shadow-xl min-w-[180px]">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: s.dot, boxShadow: s.glow }}
          />
          <span className="text-xs font-mono" style={{ color: s.border }}>
            {statusLabel[node.status]}
          </span>
        </div>
        {node.tags && (
          <div className="flex flex-wrap gap-1">
            {node.tags.map((t) => (
              <span 
                key={t}
                className="text-[0.65rem] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main component ─── */
export default function CareerTree({ embedded = false }: { embedded?: boolean }) {
  const positions = layoutNodes();
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hoveredNode = hovered ? CAREER_NODES.find((n) => n.id === hovered) : null;

  const tree = (
    <Container>
      {!embedded && (
        <div className="flex items-baseline gap-3 mb-12">
          <h2 className="text-3xl font-bold">
            Expériences <span className="gradient-text">professionnelles</span>
          </h2>
        </div>
      )}

      <div ref={containerRef} className="relative mx-auto" style={{ maxWidth: 800 }}>
        {hoveredNode && positions[hoveredNode.id] && (
          <Tooltip node={hoveredNode} pos={positions[hoveredNode.id]} />
        )}

        <svg
          viewBox="0 0 800 920"
          className="w-full h-auto"
          style={{ minHeight: 600 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#0086FF" opacity="0.6" />
            </marker>
          </defs>

          {CAREER_EDGES.map((edge, i) => (
            <TreeEdge
              key={`${edge.from}-${edge.to}`}
              from={positions[edge.from]}
              to={positions[edge.to]}
              index={i}
            />
          ))}

          {CAREER_NODES.map((node, i) => (
            <TreeNode
              key={node.id}
              node={node}
              pos={positions[node.id]}
              index={i}
              onHover={setHovered}
            />
          ))}
        </svg>
      </div>
    </Container>
  );

  return embedded ? tree : (
    <section id="experience" className="relative z-10 py-24">
      {tree}
    </section>
  );
}
