"use client";

import { useMemo, useState } from "react";
import { BrandData } from "@/lib/types";
import { InteractiveCanvas } from "../interaction/InteractiveCanvas";
import { Inspector } from "../interaction/Inspector";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  eyebrow: string;
  body: string[];
}

interface Edge {
  from: string;
  to: string;
}

const EDGES: Edge[] = [
  { from: "purpose", to: "hub" },
  { from: "hub", to: "values" },
  { from: "hub", to: "personality" },
  { from: "hub", to: "promise" },
  { from: "values", to: "voice" },
  { from: "personality", to: "voice" },
  { from: "promise", to: "voice" },
];

function buildNodes(data: BrandData): Node[] {
  return [
    {
      id: "purpose",
      label: "Purpose",
      x: 50,
      y: 12,
      eyebrow: "Why the brand exists",
      body: data.purpose ? [data.purpose] : ["Not defined yet — add this in Brand DNA."],
    },
    {
      id: "hub",
      label: "Brand DNA",
      x: 50,
      y: 38,
      eyebrow: "The system",
      body: [
        data.tagline || "The purpose above resolves into values, personality and a promise — and comes out the other side as one recognizable voice.",
      ],
    },
    {
      id: "values",
      label: "Values",
      x: 20,
      y: 66,
      eyebrow: `${data.values.length} core value${data.values.length === 1 ? "" : "s"}`,
      body: data.values.length ? data.values.map((v) => `${v.name} — ${v.description}`) : ["No values added yet."],
    },
    {
      id: "personality",
      label: "Personality",
      x: 50,
      y: 66,
      eyebrow: "Traits",
      body: data.personalityTraits.length ? [data.personalityTraits.join(", ")] : ["No traits added yet."],
    },
    {
      id: "promise",
      label: "Promise",
      x: 80,
      y: 66,
      eyebrow: "Brand promise",
      body: data.positioning.promise ? [data.positioning.promise] : ["Not defined yet — add this in Positioning."],
    },
    {
      id: "voice",
      label: "Expression",
      x: 50,
      y: 92,
      eyebrow: "How it's said",
      body: data.voice.voice ? [data.voice.voice] : ["Not defined yet — add this in Voice & Tone."],
    },
  ];
}

/** `lab` (CMS preview) always uses Brandly's own terracotta + serif — it's Brandly's tool chrome.
 *  `portal` (client-facing) uses the brand's own tokens so the diagram reads as the client's brand, not Brandly's. */
export function BrandDNADiagram({ data, variant = "lab" }: { data: BrandData; variant?: "lab" | "portal" }) {
  const nodes = useMemo(() => buildNodes(data), [data]);
  const nodeMap = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? nodeMap[selectedId] : null;
  const isPortal = variant === "portal";

  const theme = isPortal
    ? {
        accent: "var(--brand-accent)",
        accentTint: "color-mix(in srgb, var(--brand-accent) 18%, transparent)",
        hub: "var(--brand-primary)",
        hubText: "var(--brand-background)",
        text: "var(--brand-text)",
        labelFont: "var(--font-primary)",
        edgeIdle: "color-mix(in srgb, var(--brand-text) 20%, transparent)",
      }
    : {
        accent: "var(--accent-terracotta)",
        accentTint: "var(--accent-terracotta-tint)",
        hub: "#14140F",
        hubText: "#F7F5F0",
        text: "#14140F",
        labelFont: "var(--font-serif)",
        edgeIdle: "#DDD6C6",
      };

  function isEdgeActive(edge: Edge) {
    return hovered !== null && (edge.from === hovered || edge.to === hovered);
  }

  return (
    <>
      <InteractiveCanvas height={460}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {EDGES.map((edge, i) => {
            const a = nodeMap[edge.from];
            const b = nodeMap[edge.to];
            const active = isEdgeActive(edge);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={active ? theme.accent : theme.edgeIdle}
                strokeWidth={active ? 0.4 : 0.25}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const isHub = node.id === "hub";
          const active = hovered === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelectedId(node.id)}
              className="focus-ring absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 transition-transform duration-150"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: `translate(-50%, -50%) scale(${active ? 1.06 : 1})` }}
            >
              <span
                className={`flex items-center justify-center rounded-full border-2 font-mono text-[10px] tracking-wide uppercase transition-colors ${
                  isHub ? "h-16 w-16" : "h-[52px] w-[52px]"
                }`}
                style={{
                  borderColor: isHub ? theme.hub : active ? theme.accent : "color-mix(in srgb, var(--brand-accent, #DDD6C6) 35%, transparent)",
                  backgroundColor: isHub ? theme.hub : active ? theme.accentTint : "color-mix(in srgb, var(--brand-accent, currentColor) 7%, transparent)",
                  color: isHub ? theme.hubText : active ? theme.accent : theme.text,
                }}
              >
                {node.label.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-[13px] font-medium whitespace-nowrap" style={{ fontFamily: theme.labelFont, color: theme.text }}>
                {node.label}
              </span>
            </button>
          );
        })}
      </InteractiveCanvas>

      <Inspector open={!!selected} onClose={() => setSelectedId(null)} eyebrow={selected?.eyebrow} title={selected?.label ?? ""}>
        <div className="flex flex-col gap-3">
          {selected?.body.map((line, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-neutral-700">
              {line}
            </p>
          ))}
        </div>
      </Inspector>
    </>
  );
}
