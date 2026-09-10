"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { ARCHETYPES, ARCHETYPE_FAMILY_LABEL, findArchetype } from "@/lib/archetypes";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { SPRING_SOFT } from "@/lib/motion";

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUT = 148;
const R_IN = 72;
const SEG = 360 / ARCHETYPES.length;

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function wedgePath(start: number, end: number) {
  const p1 = polar(R_OUT, start);
  const p2 = polar(R_OUT, end);
  const p3 = polar(R_IN, end);
  const p4 = polar(R_IN, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${R_IN} ${R_IN} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

/** Field's Archetype stage: an engraved compass rose — thin ink strokes, mostly transparent, solid
 *  fill only on the primary archetype's wedge — instead of a glowing radial wheel. */
function ArchetypeCompass({ data }: { data: BrandData }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(data.archetype.primary);

  const wedges = useMemo(
    () => ARCHETYPES.map((a, i) => ({ ...a, path: wedgePath(i * SEG, (i + 1) * SEG), labelPos: polar((R_OUT + R_IN) / 2, i * SEG + SEG / 2) })),
    []
  );

  const active = ARCHETYPES.find((a) => a.id === (hovered ?? selected)) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:justify-items-center">
      <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "88vw" }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" className="overflow-visible" role="group" aria-label="Brand archetype wheel">
          <circle cx={CX} cy={CY} r={R_OUT + 10} fill="none" stroke="var(--brand-text)" strokeOpacity={0.15} strokeWidth={1} />
          {wedges.map((w) => {
            const isPrimary = w.id === data.archetype.primary;
            const isSecondary = w.id === data.archetype.secondary;
            const isHot = hovered === w.id || (!hovered && selected === w.id);
            const fill = isPrimary
              ? "var(--brand-accent)"
              : isHot
              ? "color-mix(in srgb, var(--brand-text) 8%, transparent)"
              : isSecondary
              ? "color-mix(in srgb, var(--brand-text) 4%, transparent)"
              : "transparent";
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
                transition={{ delay: 0.02 * ARCHETYPES.indexOf(w), duration: 0.4 }}
                fill={fill}
                stroke="var(--brand-text)"
                strokeOpacity={0.55}
                strokeWidth={1.2}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            );
          })}
        </svg>

        {wedges.map((w) => (
          <span
            key={`label-${w.id}`}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[9px] tracking-wide uppercase select-none"
            style={{ left: w.labelPos.x, top: w.labelPos.y, fontFamily: MONO_STACK, color: "var(--brand-muted)" }}
          >
            {w.name}
          </span>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[22px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {data.name}
          </span>
          <span
            className="mt-1 max-w-[9rem] rounded-full border-2 px-3 py-1 text-[10px] tracking-widest uppercase"
            style={{ fontFamily: MONO_STACK, borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", color: "var(--brand-text)", boxShadow: "3px 3px 0 0 var(--brand-accent)" }}
          >
            {findArchetype(data.archetype.primary)?.name ?? "—"}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING_SOFT}
              className="space-y-4 rounded-[var(--radius-small)] border-2 p-6 sm:p-8"
              style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: "4px 4px 0 0 var(--brand-primary)" }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
                {ARCHETYPE_FAMILY_LABEL[active.family]}
              </p>
              <p className="text-[22px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {active.name}
              </p>
              <Row label="Desire" value={active.desire} />
              <Row label="Fear" value={active.fear} />
              <Row label="Looks like" value={active.exampleBrands.join(", ")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
        {value}
      </p>
    </div>
  );
}

export function FieldArchetypeSection({ data }: { data: BrandData }) {
  const primary = findArchetype(data.archetype.primary);
  return (
    <FieldSection
      id="archetype"
      index="03"
      title="Archetype"
      subtitle="The character the brand plays."
      component={<ArchetypeCompass data={data} />}
      copy={<p>{primary ? primary.description : "No primary archetype set yet."}</p>}
    />
  );
}
