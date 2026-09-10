"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandData, Competitor } from "@/lib/types";
import { Inspector } from "../interaction/Inspector";
import { HoverTip } from "../interaction/HoverTip";
import { VIEWPORT_ONCE, glowPulse, SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";

const VIEW = 300;

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function PositioningMap({ data, variant = "lab" }: { data: BrandData; variant?: "lab" | "portal" }) {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isPortal = variant === "portal";
  const [xScale, yScale] = data.personalityScales;
  const competitors = data.positioning.competitors;

  const theme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", competitor: "color-mix(in srgb, var(--brand-secondary) 45%, var(--brand-muted))", labelFont: SANS_STACK }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", competitor: "#77736D", labelFont: "var(--font-serif)" };
  const frameClassName = isPortal ? "" : "rounded-[var(--radius-lab,12px)] border border-[#E4DFD3] bg-white p-6";
  const gridMaxWidth = isPortal ? "max-w-[520px]" : "max-w-[440px]";

  if (!xScale || !yScale) {
    return (
      <div className={`${frameClassName} text-[13px]`} style={{ color: theme.muted }}>
        Add at least two personality scales to plot a positioning map.
      </div>
    );
  }

  // Own brand + any named competitors, all on the same two axes. leftLabel/topLabel = 0, rightLabel/bottomLabel = 100 for both axes — no inversion, matching the grid below.
  const points: { id: string; name: string; x: number; y: number; isOwn: boolean }[] = [
    { id: "__own", name: data.name, x: xScale.value, y: yScale.value, isOwn: true },
    ...competitors.map((c: Competitor) => ({ id: c.id, name: c.name, x: c.x, y: c.y, isOwn: false })),
  ];
  const hovered = points.find((p) => p.id === hoveredId) ?? null;

  return (
    <>
      <div className={frameClassName}>
        <div className={`mx-auto grid w-full ${gridMaxWidth} grid-cols-[minmax(0,3.5em)_1fr_minmax(0,3.5em)] grid-rows-[auto_1fr_auto] items-center gap-2`}>
          <span />
          <span className="text-center text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: theme.muted }}>
            {yScale.leftLabel}
          </span>
          <span />

          <span className="text-right text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: theme.muted }}>
            {xScale.leftLabel}
          </span>
          <div className="relative w-full">
            <motion.svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full" role="img" aria-label="Positioning map" initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              {isPortal && (
                <defs>
                  <radialGradient id="ownDotGradient" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor={theme.accent} stopOpacity={0.95} />
                    <stop offset="60%" stopColor="var(--brand-primary)" stopOpacity={0.65} />
                    <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0.45} />
                  </radialGradient>
                  <radialGradient id="competitorDotGradient" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="var(--brand-muted)" stopOpacity={0.55} />
                  </radialGradient>
                  <radialGradient id="mapAmbient" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={0} />
                  </radialGradient>
                  <filter id="dotGlow" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="dotEdgeSoft" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
              )}
              {isPortal && <rect x="0" y="0" width={VIEW} height={VIEW} fill="url(#mapAmbient)" className="pointer-events-none" />}
              <rect x="0" y="0" width={VIEW} height={VIEW} fill="none" stroke={theme.border} />
              <motion.line
                x1={VIEW / 2}
                y1="0"
                x2={VIEW / 2}
                y2={VIEW}
                stroke={theme.border}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.line
                x1="0"
                y1={VIEW / 2}
                x2={VIEW}
                y2={VIEW / 2}
                stroke={theme.border}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              />

              {points.map((p, i) => (
                // Plain (non-motion) <g> owns the static translate — a motion.g here would fight Framer Motion's
                // own transform management and collapse every point to the same spot. Only the circle inside animates.
                <g
                  key={p.id}
                  className={p.isOwn ? "cursor-pointer" : "cursor-default"}
                  transform={`translate(${(p.x / 100) * VIEW}, ${(p.y / 100) * VIEW})`}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => p.isOwn && setOpen(true)}
                >
                  {p.isOwn && isPortal && (
                    <motion.circle
                      r={9}
                      fill={theme.accent}
                      filter="url(#dotGlow)"
                      style={{ transformOrigin: "0px 0px" }}
                      variants={glowPulse}
                      animate="visible"
                      className="pointer-events-none"
                    />
                  )}
                  {isPortal && (
                    <motion.circle
                      r={p.isOwn ? 9 : 6}
                      fill={p.isOwn ? theme.accent : theme.competitor}
                      filter="url(#dotGlow)"
                      style={{ transformOrigin: "0px 0px" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === p.id ? 0.6 : 0 }}
                      transition={SPRING_SOFT}
                      className="pointer-events-none"
                    />
                  )}
                  <motion.circle
                    r={p.isOwn ? 9 : 6}
                    fill={p.isOwn ? (isPortal ? "url(#ownDotGradient)" : theme.accent) : isPortal ? "url(#competitorDotGradient)" : theme.competitor}
                    fillOpacity={p.isOwn ? 1 : 0.85}
                    stroke={hoveredId === p.id ? theme.text : "transparent"}
                    strokeOpacity={hoveredId === p.id ? 1 : 0}
                    strokeWidth={2}
                    filter={isPortal && hoveredId !== p.id ? "url(#dotEdgeSoft)" : undefined}
                    style={{ transformOrigin: "0px 0px" }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.25 + i * 0.06 }}
                    whileHover={{ scale: 1.35, transition: SPRING_SNAPPY }}
                    whileTap={p.isOwn ? { scale: 0.9, transition: SPRING_SNAPPY } : undefined}
                  />
                  {/* Only the brand's own dot gets a permanent label — competitor names surface on hover via HoverTip, so close points don't collide. */}
                  {p.isOwn && (
                    <text
                      x="0"
                      y={-16}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight={700}
                      fontFamily={theme.labelFont}
                      fill={theme.text}
                      className="pointer-events-none select-none"
                    >
                      {p.name}
                    </text>
                  )}
                </g>
              ))}
            </motion.svg>

            <HoverTip
              show={!!hovered}
              eyebrow={hovered?.isOwn ? "This brand" : "Competitor"}
              title={hovered?.name ?? ""}
              detail={hovered?.isOwn ? data.positioning.differentiator || undefined : undefined}
              style={hovered ? { left: `${hovered.x}%`, top: `${hovered.y}%` } : undefined}
            />
          </div>
          <span className="text-left text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: theme.muted }}>
            {xScale.rightLabel}
          </span>

          <span />
          <span className="text-center text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: theme.muted }}>
            {yScale.rightLabel}
          </span>
          <span />
        </div>
      </div>

      <Inspector open={open} onClose={() => setOpen(false)} eyebrow="Why here" title={data.name}>
        <div className="flex flex-col gap-4">
          {data.positioning.differentiator && (
            <div>
              <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Differentiator</p>
              <p className="mt-1 text-[14px] leading-relaxed text-neutral-700">{data.positioning.differentiator}</p>
            </div>
          )}
          {data.positioning.reasonToBelieve && (
            <div>
              <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Reason to believe</p>
              <p className="mt-1 text-[14px] leading-relaxed text-neutral-700">{data.positioning.reasonToBelieve}</p>
            </div>
          )}
          {!data.positioning.differentiator && !data.positioning.reasonToBelieve && (
            <p className="text-[14px] text-neutral-500">Not defined yet — add this in Positioning.</p>
          )}
        </div>
      </Inspector>
    </>
  );
}
