"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { Inspector } from "../interaction/Inspector";
import { HoverTip } from "../interaction/HoverTip";
import { fadeUp, VIEWPORT_ONCE, glowPulse, SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";

type Group = "identity" | "meaning" | "response" | "resonance";
type CellKey = "salience" | "performance" | "imagery" | "judgments" | "feelings" | "resonance";

interface Cell {
  key: CellKey;
  tier: 0 | 1 | 2 | 3; // 0 = apex (Resonance) .. 3 = base (Salience)
  half: "full" | "left" | "right";
  label: string;
  group: Group;
  text: string;
  explainer: string;
}

interface GroupBox {
  group: Group;
  eyebrow: string;
  question: string;
  tier: 0 | 1 | 2 | 3;
}

const GROUP_BOXES: GroupBox[] = [
  { group: "resonance", eyebrow: "Relationships", question: "What about you and me?", tier: 0 },
  { group: "response", eyebrow: "Response", question: "What about you?", tier: 1 },
  { group: "meaning", eyebrow: "Meaning", question: "What are you?", tier: 2 },
  { group: "identity", eyebrow: "Identity", question: "Who are you?", tier: 3 },
];

function buildCells(data: BrandData): Cell[] {
  return [
    {
      key: "resonance",
      tier: 0,
      half: "full",
      label: "Resonance",
      group: "resonance",
      text: data.essence,
      explainer: "The deepest level — a psychological bond of loyalty, so strong the customer feels actively engaged with the brand.",
    },
    {
      key: "judgments",
      tier: 1,
      half: "left",
      label: "Judgments",
      group: "response",
      text: data.positioning.competitiveAdvantage,
      explainer: "The customer's rational opinions and evaluations — quality, credibility, and superiority versus alternatives.",
    },
    {
      key: "feelings",
      tier: 1,
      half: "right",
      label: "Feelings",
      group: "response",
      text: data.audience.primary.motivations,
      explainer: "The customer's emotional responses and reactions to the brand — warmth, fun, security, self-respect.",
    },
    {
      key: "performance",
      tier: 2,
      half: "left",
      label: "Performance",
      group: "meaning",
      text: data.positioning.differentiator,
      explainer: "How well the brand meets functional needs — primary ingredients, reliability, durability, service effectiveness.",
    },
    {
      key: "imagery",
      tier: 2,
      half: "right",
      label: "Imagery",
      group: "meaning",
      text: data.personalityTraits.join(", "),
      explainer: "The social and psychological attributes people associate with the brand — who uses it, and what that says about them.",
    },
    {
      key: "salience",
      tier: 3,
      half: "full",
      label: "Salience",
      group: "identity",
      text: [data.positioning.category, data.industry].filter(Boolean).join(" · "),
      explainer: "Brand awareness — how easily and how often the brand comes to mind across different situations.",
    },
  ];
}

const CX = 140;
const TOP_Y = 20;
const TIER_H = 60;
const W_TOP = 20;
const W_BASE = 240;
const BOX_X = 350;
const BOX_W = 230;
const BOX_H = 52;
const VIEW_W = 600;
const VIEW_H = 300;

function widthAt(tierIndex: number) {
  return W_TOP + ((W_BASE - W_TOP) * tierIndex) / 4;
}

function tierPolygon(tier: number, half: "full" | "left" | "right") {
  const yTop = TOP_Y + tier * TIER_H;
  const yBot = yTop + TIER_H;
  const wTop = widthAt(tier);
  const wBot = widthAt(tier + 1);
  const fullTopL = CX - wTop / 2;
  const fullTopR = CX + wTop / 2;
  const fullBotL = CX - wBot / 2;
  const fullBotR = CX + wBot / 2;
  if (half === "full") return `${fullTopL},${yTop} ${fullTopR},${yTop} ${fullBotR},${yBot} ${fullBotL},${yBot}`;
  if (half === "left") return `${fullTopL},${yTop} ${CX},${yTop} ${CX},${yBot} ${fullBotL},${yBot}`;
  return `${CX},${yTop} ${fullTopR},${yTop} ${fullBotR},${yBot} ${CX},${yBot}`;
}

function cellCenter(cell: Pick<Cell, "tier" | "half">) {
  const yTop = TOP_Y + cell.tier * TIER_H;
  const midWidth = (widthAt(cell.tier) + widthAt(cell.tier + 1)) / 2;
  const x = cell.half === "left" ? CX - midWidth / 4 : cell.half === "right" ? CX + midWidth / 4 : CX;
  return { x, y: yTop + TIER_H / 2 };
}

function edgeXAt(y: number) {
  const apexX = CX + W_TOP / 2;
  const baseX = CX + W_BASE / 2;
  const t = (y - TOP_Y) / (4 * TIER_H);
  return apexX + (baseX - apexX) * t;
}

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function BrandPyramid({ data, variant = "lab" }: { data: BrandData; variant?: "lab" | "portal" }) {
  const cells = useMemo(() => buildCells(data), [data]);
  const [hoveredGroup, setHoveredGroup] = useState<Group | null>(null);
  const [hoveredCell, setHoveredCell] = useState<CellKey | null>(null);
  const [selectedKey, setSelectedKey] = useState<CellKey | null>(null);
  const selected = cells.find((c) => c.key === selectedKey) ?? null;
  const hovered = cells.find((c) => c.key === hoveredCell) ?? null;
  const isPortal = variant === "portal";

  const theme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", labelFont: SANS_STACK, groupIdleFill: "color-mix(in srgb, var(--brand-secondary) 30%, transparent)" }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", labelFont: "var(--font-serif)", groupIdleFill: "transparent" };

  const frameClassName = isPortal
    ? "relative mx-auto w-full max-w-[720px]"
    : "relative mx-auto w-full max-w-[560px] rounded-[var(--radius-lab,12px)] border border-[#E4DFD3] bg-white p-6";

  return (
    <>
      <div className={frameClassName}>
        <motion.svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Brand equity pyramid"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {isPortal && (
            <defs>
              <linearGradient id="pyramidCellFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.accent} stopOpacity={0.92} />
                <stop offset="55%" stopColor="var(--brand-primary)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.4} />
              </linearGradient>
              <radialGradient id="pyramidAmbient" cx="28%" cy="15%" r="85%">
                <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0} />
              </radialGradient>
              <filter id="pyramidGlow" x="-75%" y="-75%" width="250%" height="250%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pyramidEdgeSoft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.75" />
              </filter>
            </defs>
          )}
          {isPortal && <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#pyramidAmbient)" className="pointer-events-none" />}

          {GROUP_BOXES.map((box) => {
            const midY = TOP_Y + box.tier * TIER_H + TIER_H / 2;
            const edgeX = edgeXAt(midY);
            const active = hoveredGroup === box.group;
            return (
              <motion.g
                key={box.group}
                variants={fadeUp}
                custom={box.tier}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredGroup(box.group)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <motion.line
                  x1={edgeX}
                  y1={midY}
                  x2={BOX_X}
                  y2={midY}
                  stroke={active ? theme.accent : theme.border}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, strokeWidth: active ? 1.5 : 1 }}
                  transition={{ pathLength: { duration: 0.6, delay: 0.2 + box.tier * 0.08 }, strokeWidth: { duration: 0.15 } }}
                />
                <motion.rect
                  x={BOX_X}
                  y={midY - BOX_H / 2}
                  width={BOX_W}
                  height={BOX_H}
                  rx={6}
                  stroke={active ? theme.accent : theme.border}
                  animate={{
                    fill: active ? `color-mix(in srgb, ${theme.accent} 14%, transparent)` : theme.groupIdleFill,
                    strokeWidth: active ? 1.5 : 1,
                  }}
                  whileHover={{ scale: 1.02, transition: SPRING_SNAPPY }}
                  style={{ transformOrigin: `${BOX_X + BOX_W / 2}px ${midY}px` }}
                  transition={{ duration: 0.2 }}
                />
                <text x={BOX_X + 14} y={midY - 6} fontSize="12" fontWeight={700} fill={active ? theme.accent : theme.text} fontFamily={theme.labelFont}>
                  {box.eyebrow}
                </text>
                <text x={BOX_X + 14} y={midY + 12} fontSize="11" fill={theme.muted}>
                  {box.question}
                </text>
              </motion.g>
            );
          })}

          {cells.map((cell) => {
            const isHovered = hoveredCell === cell.key;
            const isGroupActive = hoveredGroup === cell.group;
            const isSelected = selectedKey === cell.key;
            const pct = 85 - cell.tier * 18;
            const { x: labelX, y: labelY } = cellCenter(cell);
            return (
              <motion.g key={cell.key} variants={fadeUp} custom={cell.tier}>
                {isPortal && cell.tier === 0 && (
                  <motion.polygon
                    points={tierPolygon(cell.tier, cell.half)}
                    fill={theme.accent}
                    filter="url(#pyramidGlow)"
                    style={{ transformOrigin: `${CX}px ${TOP_Y + TIER_H / 2}px` }}
                    variants={glowPulse}
                    animate="visible"
                    className="pointer-events-none"
                  />
                )}
                {isPortal && (
                  <motion.polygon
                    points={tierPolygon(cell.tier, cell.half)}
                    fill={theme.accent}
                    filter="url(#pyramidGlow)"
                    style={{ transformOrigin: `${CX}px ${TOP_Y + cell.tier * TIER_H + TIER_H / 2}px` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSelected || isHovered ? 0.6 : 0 }}
                    transition={SPRING_SOFT}
                    className="pointer-events-none"
                  />
                )}
                <motion.polygon
                  points={tierPolygon(cell.tier, cell.half)}
                  fill={isPortal ? "url(#pyramidCellFill)" : `color-mix(in srgb, ${theme.accent} ${pct}%, transparent)`}
                  fillOpacity={isPortal ? pct / 100 : undefined}
                  stroke={isSelected ? theme.text : isHovered ? theme.accent : "transparent"}
                  strokeOpacity={isHovered || isSelected ? 1 : 0}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={isPortal && !isSelected && !isHovered ? "url(#pyramidEdgeSoft)" : undefined}
                  className="cursor-pointer"
                  style={{ transformOrigin: `${CX}px ${TOP_Y + cell.tier * TIER_H + TIER_H / 2}px` }}
                  animate={{ scale: isSelected ? 1.035 : isHovered ? 1.025 : isGroupActive ? 1.012 : 1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_SNAPPY}
                  onMouseEnter={() => {
                    setHoveredCell(cell.key);
                    setHoveredGroup(cell.group);
                  }}
                  onMouseLeave={() => {
                    setHoveredCell(null);
                    setHoveredGroup(null);
                  }}
                  onClick={() => setSelectedKey(cell.key)}
                />
                <text
                  x={labelX}
                  y={labelY + (cell.tier === 0 ? 3 : 4)}
                  textAnchor="middle"
                  fontSize={cell.tier === 0 ? 9 : 11}
                  fontWeight={600}
                  fill="#fff"
                  className="pointer-events-none select-none"
                >
                  {cell.label}
                </text>
              </motion.g>
            );
          })}
        </motion.svg>

        <HoverTip
          show={!!hovered}
          eyebrow={hovered ? GROUP_BOXES.find((b) => b.group === hovered.group)?.eyebrow : undefined}
          title={hovered?.label ?? ""}
          detail={hovered?.text || "Not defined yet — click to add."}
          style={hovered ? { left: `${(cellCenter(hovered).x / VIEW_W) * 100}%`, top: `${(cellCenter(hovered).y / VIEW_H) * 100}%` } : undefined}
        />
      </div>

      <Inspector
        open={!!selected}
        onClose={() => setSelectedKey(null)}
        eyebrow={selected ? `${GROUP_BOXES.find((b) => b.group === selected.group)?.eyebrow} · ${selected.label}` : undefined}
        title={selected?.label ?? ""}
      >
        <div className="flex flex-col gap-4">
          <p className="text-[13px] leading-relaxed text-neutral-500 italic">{selected?.explainer}</p>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">This brand</p>
            <p className="mt-1 text-[14px] leading-relaxed text-neutral-700">{selected?.text || "Not defined yet."}</p>
          </div>
        </div>
      </Inspector>
    </>
  );
}
