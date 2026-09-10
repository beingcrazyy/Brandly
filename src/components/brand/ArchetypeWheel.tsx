"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArchetypeId } from "@/lib/types";
import { ARCHETYPES, ARCHETYPE_FAMILY_LABEL, findArchetype, ArchetypeDef } from "@/lib/archetypes";
import { Inspector } from "../interaction/Inspector";
import { HoverTip } from "../interaction/HoverTip";
import { Button } from "../ui/Button";
import { VIEWPORT_ONCE, glowPulse, SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";

interface Props {
  primary: ArchetypeId | null;
  secondary: ArchetypeId | null;
  brandName?: string;
  variant?: "lab" | "portal";
  /** CMS archetype page passes these to let a click assign primary/secondary from the Inspector footer. */
  onPickPrimary?: (id: ArchetypeId) => void;
  onPickSecondary?: (id: ArchetypeId) => void;
}

const VIEW = 300;
const CX = 150;
const CY = 150;
const R_OUT = 138;
const R_MID = 112;
const R_IN = 76;
const SEG = 30;

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function wedgePath(rI: number, rO: number, start: number, end: number) {
  const [ax, ay] = polar(rO, start);
  const [bx, by] = polar(rO, end);
  const [cx2, cy2] = polar(rI, end);
  const [dx, dy] = polar(rI, start);
  const large = end - start <= 180 ? 0 : 1;
  return `M${ax} ${ay} A${rO} ${rO} 0 ${large} 1 ${bx} ${by} L${cx2} ${cy2} A${rI} ${rI} 0 ${large} 0 ${dx} ${dy}Z`;
}

/** `lab` (CMS preview) uses Brandly's own terracotta + serif chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function ArchetypeWheel({ primary, secondary, brandName, variant = "lab", onPickPrimary, onPickSecondary }: Props) {
  const [hovered, setHovered] = useState<ArchetypeId | null>(null);
  const [selected, setSelected] = useState<ArchetypeDef | null>(null);
  const isPortal = variant === "portal";
  const editable = !!(onPickPrimary || onPickSecondary);

  const theme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", idle: "color-mix(in srgb, var(--brand-secondary) 35%, transparent)", hover: "color-mix(in srgb, var(--brand-accent) 20%, transparent)", labelFont: SANS_STACK }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", idle: "rgba(20,20,15,0.05)", hover: "var(--accent-terracotta-tint)", labelFont: "var(--font-serif)" };
  const frameClassName = isPortal
    ? "relative flex flex-col items-center"
    : "relative flex flex-col items-center rounded-[var(--radius-lab,12px)] border border-[#E4DFD3] bg-white p-6";
  const svgMaxWidth = isPortal ? "max-w-[380px]" : "max-w-[300px]";

  const isPrimary = selected?.id === primary;
  const isSecondary = selected?.id === secondary;
  const hoveredDef = ARCHETYPES.find((a) => a.id === hovered) ?? null;
  const hoverPos = hoveredDef ? polar((R_MID + R_OUT) / 2, ARCHETYPES.indexOf(hoveredDef) * SEG + SEG / 2) : null;

  return (
    <>
      <div className={frameClassName}>
        <motion.svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className={`w-full ${svgMaxWidth}`}
          role="img"
          aria-label="Archetype wheel"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {isPortal && (
            <defs>
              <radialGradient id="archetypeHubGradient" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity={0.85} />
              </radialGradient>
              <radialGradient id="archetypeWedgeGradient" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity={0.95} />
                <stop offset="55%" stopColor="var(--brand-primary)" stopOpacity={0.65} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.45} />
              </radialGradient>
              <radialGradient id="archetypeWedgeIdleGradient" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.12} />
              </radialGradient>
              <radialGradient id="archetypeWedgeHoverGradient" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.22} />
              </radialGradient>
              <radialGradient id="archetypeAmbient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0} />
              </radialGradient>
              <filter id="archetypeGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="archetypeEdgeSoft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.25" />
              </filter>
            </defs>
          )}
          {isPortal && <rect x="0" y="0" width={VIEW} height={VIEW} fill="url(#archetypeAmbient)" className="pointer-events-none" />}

          {ARCHETYPES.map((a, i) => {
            const start = i * SEG;
            const end = start + SEG;
            const mid = start + SEG / 2;
            const isP = a.id === primary;
            const isS = a.id === secondary;
            const active = hovered === a.id;
            let fill = theme.idle;
            if (isP) fill = theme.accent;
            else if (isS) fill = theme.hover;
            else if (active) fill = theme.hover;
            const [nameX, nameY] = polar((R_MID + R_OUT) / 2, mid);
            const [valX, valY] = polar((R_IN + R_MID) / 2, mid);
            let rot = mid;
            if (rot > 90 && rot < 270) rot += 180;
            return (
              <motion.g
                key={a.id}
                variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: i * 0.035 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(a.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(a)}
                whileHover={{ scale: 1.03, transition: SPRING_SNAPPY }}
                whileTap={{ scale: 0.96, transition: SPRING_SNAPPY }}
              >
                {isPortal && (
                  <motion.path
                    d={wedgePath(R_MID, R_OUT, start + 0.6, end - 0.6)}
                    fill={theme.accent}
                    filter="url(#archetypeGlow)"
                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isP ? 0.55 : isS || active ? 0.32 : 0 }}
                    transition={SPRING_SOFT}
                    className="pointer-events-none"
                  />
                )}
                <path
                  d={wedgePath(R_MID, R_OUT, start + 0.6, end - 0.6)}
                  fill={
                    isPortal
                      ? isP
                        ? "url(#archetypeWedgeGradient)"
                        : isS || active
                          ? "url(#archetypeWedgeHoverGradient)"
                          : "url(#archetypeWedgeIdleGradient)"
                      : fill
                  }
                  stroke={isS ? theme.accent : active ? theme.accent : "transparent"}
                  strokeOpacity={isS || active ? 1 : 0}
                  strokeWidth={isS ? 2 : 1}
                  filter={isPortal && !isP && !isS && !active ? "url(#archetypeEdgeSoft)" : undefined}
                  className="transition-colors duration-150"
                />
                <path
                  d={wedgePath(R_IN, R_MID, start + 0.6, end - 0.6)}
                  fill={isP ? `color-mix(in srgb, ${theme.accent} 55%, transparent)` : active ? theme.hover : "transparent"}
                  stroke={theme.border}
                  strokeOpacity={isP || active ? 1 : 0.35}
                  strokeWidth={0.5}
                  className="transition-colors duration-150"
                />
                <text
                  x={nameX}
                  y={nameY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={isP ? 11.5 : 10}
                  fontWeight={isP ? 700 : 500}
                  fill={isP ? (isPortal ? "var(--brand-background)" : "#F7F5F0") : theme.text}
                  transform={`rotate(${rot} ${nameX} ${nameY})`}
                  className="pointer-events-none select-none"
                >
                  {a.name}
                </text>
                <text
                  x={valX}
                  y={valY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={8.5}
                  fontWeight={600}
                  letterSpacing={0.3}
                  fill={isP ? (isPortal ? "var(--brand-background)" : "#fff") : theme.muted}
                  transform={`rotate(${rot} ${valX} ${valY})`}
                  className="pointer-events-none select-none uppercase"
                >
                  {a.coreValue}
                </text>
              </motion.g>
            );
          })}
          {isPortal && (
            <motion.circle
              cx={CX}
              cy={CY}
              r={R_IN + 2}
              fill="var(--brand-primary)"
              filter="url(#archetypeGlow)"
              variants={glowPulse}
              animate="visible"
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              className="pointer-events-none"
            />
          )}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R_IN - 6}
            fill={isPortal ? "url(#archetypeHubGradient)" : "#14140F"}
            variants={isPortal ? glowPulse : undefined}
            animate={isPortal ? "visible" : { scale: [1, 1.02, 1] }}
            transition={isPortal ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <text x={CX} y={CY - 9} textAnchor="middle" fontSize="9.5" letterSpacing="2" fill={isPortal ? "color-mix(in srgb, var(--brand-background) 60%, transparent)" : "rgba(247,245,240,.6)"}>
            PRIMARY
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="22" fontWeight="500" fontFamily={theme.labelFont} fill={isPortal ? "var(--brand-background)" : "#F7F5F0"}>
            {findArchetype(primary)?.name ?? "—"}
          </text>
        </motion.svg>

        <HoverTip
          show={!!hoveredDef}
          eyebrow={hoveredDef ? ARCHETYPE_FAMILY_LABEL[hoveredDef.family] : undefined}
          title={hoveredDef?.name ?? ""}
          detail={hoveredDef ? `${hoveredDef.coreValue} · e.g. ${hoveredDef.exampleBrands.join(", ")}` : undefined}
          style={hoverPos ? { left: `${(hoverPos[0] / VIEW) * 100}%`, top: `${(hoverPos[1] / VIEW) * 100}%` } : undefined}
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11.5px]" style={{ color: theme.muted }}>
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: theme.accent, display: "inline-block" }} />
            Primary{brandName ? ` — ${brandName}` : ""}
          </span>
          {secondary && (
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-[3px] border-2" style={{ borderColor: theme.accent, display: "inline-block" }} />
              Support
            </span>
          )}
        </div>
      </div>

      <Inspector
        open={!!selected}
        onClose={() => setSelected(null)}
        eyebrow={selected ? ARCHETYPE_FAMILY_LABEL[selected.family] : undefined}
        title={selected?.name ?? ""}
        footer={
          editable && selected ? (
            <div className="flex gap-2">
              <Button size="sm" variant={isPrimary ? "primary" : "secondary"} onClick={() => onPickPrimary?.(selected.id)} disabled={isPrimary}>
                {isPrimary ? "Primary" : "Set as Primary"}
              </Button>
              <Button size="sm" variant={isSecondary ? "primary" : "secondary"} onClick={() => onPickSecondary?.(selected.id)} disabled={isSecondary || isPrimary}>
                {isSecondary ? "Secondary" : "Set as Secondary"}
              </Button>
            </div>
          ) : undefined
        }
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-terracotta-tint)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[var(--accent-terracotta)] uppercase">
              {selected.coreValue}
            </span>
            <p className="text-[14px] leading-relaxed text-neutral-700">{selected.description}</p>
            <div>
              <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Desires</p>
              <p className="mt-1 text-[14px] text-neutral-700">{selected.desire}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Fears</p>
              <p className="mt-1 text-[14px] text-neutral-700">{selected.fear}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Brands with this archetype</p>
              <p className="mt-1 text-[14px] text-neutral-700">{selected.exampleBrands.join(", ")}</p>
            </div>
            {(isPrimary || isSecondary) && !editable && (
              <p className="text-[12px] font-medium text-[var(--brand-accent,var(--accent-terracotta))]">
                {brandName ? `${brandName}'s` : "This brand's"} {isPrimary ? "primary" : "secondary"} archetype.
              </p>
            )}
          </div>
        )}
      </Inspector>
    </>
  );
}
