"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { ARCHETYPES, findArchetype } from "@/lib/archetypes";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { panelSlide } from "./duskMotion";

const SIZE = 480;
const CENTER = SIZE / 2;
const OUTER_R = 220;
const INNER_R = 108;
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

export function DuskArchetypeSection({ data }: { data: BrandData }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(data.archetype.primary ?? null);

  const wedges = useMemo(() => ARCHETYPES.map((a, i) => ({ ...a, path: wedgePath(i), labelPos: polar(CENTER, CENTER, (OUTER_R + INNER_R) / 2, i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2) })), []);
  const active = ARCHETYPES.find((a) => a.id === (hovered ?? selected));

  return (
    <section id="archetype" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading
        waypoint="WP-03"
        eyebrow="Archetype"
        title="The character the brand plays."
        description="Twelve Jungian archetypes, the same wheel every brand strategist works from. The glowing wedge is the one the brand leads with."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:justify-items-center">
        <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "90vw" }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" className="overflow-visible" role="group" aria-label="Brand archetype wheel">
            {wedges.map((w) => {
              const isPrimary = w.id === data.archetype.primary;
              const isSecondary = w.id === data.archetype.secondary;
              const isHot = hovered === w.id || (!hovered && selected === w.id);
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
                  animate={{ fillOpacity: isPrimary ? 0.85 : isHot ? 0.6 : isSecondary ? 0.35 : 0.12 }}
                  fill={isPrimary || isHot ? "var(--brand-accent)" : "var(--brand-neutral)"}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1}
                  style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                />
              );
            })}
          </svg>

          {wedges.map((w) => (
            <span key={`label-${w.id}`} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[9px] tracking-wide text-white/70 uppercase select-none sm:text-[10px]" style={{ fontFamily: MONO_STACK, left: w.labelPos.x, top: w.labelPos.y }}>
              {w.name}
            </span>
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl text-white sm:text-3xl" style={{ fontFamily: "var(--font-primary)" }}>
              {data.name}
            </span>
            <span className="mt-1 max-w-[10rem] text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-accent)" }}>
              {findArchetype(data.archetype.primary)?.name ?? "—"}
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key={active.id} variants={panelSlide} initial="hidden" animate="show" exit="exit">
                <DuskGlassPanel className="space-y-4 p-8">
                  <p className="text-2xl text-white" style={{ fontFamily: "var(--font-primary)" }}>
                    {active.name}
                  </p>
                  <Row label="Desire" value={active.desire} />
                  <Row label="Fear" value={active.fear} />
                  <Row label="Looks like" value={active.exampleBrands.join(", ")} />
                </DuskGlassPanel>
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
      <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "rgba(255,255,255,0.4)" }}>
        {label}
      </p>
      <p className="mt-1" style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.75)" }}>
        {value}
      </p>
    </div>
  );
}
