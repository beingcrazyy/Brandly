"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { ARCHETYPES, findArchetype } from "@/lib/archetypes";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { panelSlide } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

const SIZE = 480;
const CENTER = SIZE / 2;
const OUTER_R = 200;
const INNER_R = 96;
const TICK_R = 216;
const SEGMENT_ANGLE = 360 / ARCHETYPES.length;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function wedgePath(index: number) {
  const start = index * SEGMENT_ANGLE;
  const end = start + SEGMENT_ANGLE;
  const p1 = polar(CENTER, CENTER, OUTER_R, start);
  const p2 = polar(CENTER, CENTER, OUTER_R, end);
  const p3 = polar(CENTER, CENTER, INNER_R, end);
  const p4 = polar(CENTER, CENTER, INNER_R, start);
  const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${INNER_R} ${INNER_R} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z`;
}

export function SummitArchetypeSection({ data }: { data: BrandData }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(data.archetype.primary ?? null);

  const wedges = useMemo(
    () =>
      ARCHETYPES.map((a, i) => ({
        ...a,
        path: wedgePath(i),
        startDeg: i * SEGMENT_ANGLE,
        endDeg: (i + 1) * SEGMENT_ANGLE,
        labelPos: polar(CENTER, CENTER, (OUTER_R + INNER_R) / 2, i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2),
      })),
    []
  );
  const ticks = useMemo(() => Array.from({ length: 36 }, (_, i) => i * 10), []);

  const activeId = hovered ?? selected;
  const active = ARCHETYPES.find((a) => a.id === activeId);
  const activeWedge = wedges.find((w) => w.id === activeId);

  return (
    <section id="archetype" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading
        plate="FIG. 03"
        eyebrow="Archetype"
        title="The character the brand plays."
        description="Twelve Jungian archetypes on a 360° gauge. The filled sector is the one the brand leads with."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:justify-items-center">
        <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "90vw" }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" className="overflow-visible" role="group" aria-label="Brand archetype wheel">
            <circle cx={CENTER} cy={CENTER} r={TICK_R} fill="none" stroke={SUMMIT_INK} strokeOpacity={0.2} strokeWidth={1} />
            {ticks.map((deg) => {
              const major = deg % 30 === 0;
              const p1 = polar(CENTER, CENTER, TICK_R, deg);
              const p2 = polar(CENTER, CENTER, TICK_R + (major ? 10 : 5), deg);
              return <line key={deg} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={SUMMIT_INK} strokeOpacity={0.35} strokeWidth={major ? 1.2 : 0.8} />;
            })}

            {wedges.map((w) => {
              const isPrimary = w.id === data.archetype.primary;
              const isSecondary = w.id === data.archetype.secondary;
              const isHot = activeId === w.id;
              const fill = isPrimary ? "var(--brand-accent)" : isHot ? "color-mix(in srgb, var(--brand-neutral) 20%, transparent)" : isSecondary ? "color-mix(in srgb, var(--brand-neutral) 10%, transparent)" : "transparent";
              return (
                <motion.path
                  key={w.id}
                  d={w.path}
                  role="button"
                  tabIndex={0}
                  aria-label={w.name}
                  onMouseEnter={() => setHovered(w.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(w.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setSelected(w.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(w.id)}
                  className="cursor-pointer outline-none"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.02 * ARCHETYPES.findIndex((a) => a.id === w.id), duration: 0.5 }}
                  fill={fill}
                  stroke={SUMMIT_INK}
                  strokeOpacity={0.4}
                  strokeWidth={1}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                />
              );
            })}
          </svg>

          {wedges.map((w) => (
            <span
              key={`label-${w.id}`}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[9px] tracking-wide uppercase select-none sm:text-[10px]"
              style={{ left: w.labelPos.x, top: w.labelPos.y, fontFamily: MONO_STACK, color: SUMMIT_INK_MUTED }}
            >
              {w.name}
            </span>
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
              {data.name}
            </span>
            <span className="tabular-nums mt-1 border px-3 py-1 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}>
              {findArchetype(data.archetype.primary)?.name ?? "—"}
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <AnimatePresence mode="wait">
            {active && activeWedge ? (
              <motion.div key={active.id} variants={panelSlide} initial="hidden" animate="show" exit="exit">
                <SummitSpecPanel className="space-y-4 p-8">
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                      {active.name}
                    </p>
                    <p className="tabular-nums text-xs" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                      {activeWedge.startDeg}°–{activeWedge.endDeg}°
                    </p>
                  </div>
                  <Row label="Desire" value={active.desire} />
                  <Row label="Fear" value={active.fear} />
                  <Row label="Looks like" value={active.exampleBrands.join(", ")} />
                </SummitSpecPanel>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
        {label}
      </p>
      <p className="mt-1" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
        {value}
      </p>
    </div>
  );
}
