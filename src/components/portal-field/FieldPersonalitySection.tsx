"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const TRAIT_COLORS = ["var(--brand-accent)", "var(--brand-primary)", "var(--brand-secondary)"];
const SCALE_COLORS = ["var(--brand-accent)", "var(--brand-primary)"];

/** Field's Personality stage: rotating-color trait chips plus a scale bar per axis, its fill and
 *  handle in the axis's own rotating brand color — a field-notebook checklist, not a slider widget. */
function PersonalityBoard({ data }: { data: BrandData }) {
  return (
    <div className="flex flex-col gap-10">
      <motion.div variants={staggerContainer(0.05)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="flex flex-wrap gap-3">
        {data.personalityTraits.map((trait, i) => (
          <motion.span
            key={trait}
            variants={fadeUp}
            className="rounded-full border-2 px-4 py-2 text-[13px]"
            style={{
              fontFamily: "var(--font-secondary)",
              borderColor: "var(--brand-text)",
              color: "var(--brand-text)",
              backgroundColor: `color-mix(in srgb, ${TRAIT_COLORS[i % TRAIT_COLORS.length]} 16%, var(--brand-background))`,
              boxShadow: `2px 2px 0 0 ${TRAIT_COLORS[i % TRAIT_COLORS.length]}`,
            }}
          >
            {trait}
          </motion.span>
        ))}
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {data.personalityScales.map((scale, i) => {
          const color = SCALE_COLORS[i % SCALE_COLORS.length];
          return (
            <div key={scale.id}>
              <div className="mb-3 flex items-center justify-between text-[11px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
                <span>{scale.leftLabel}</span>
                <span>{scale.rightLabel}</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)" }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${scale.value}%` }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2"
                  style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: `2px 2px 0 0 ${color}` }}
                  initial={{ left: "0%" }}
                  whileInView={{ left: `calc(${scale.value}% - 8px)` }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FieldPersonalitySection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="personality"
      index="04"
      title="Personality"
      subtitle="If the brand walked in the room, how would it feel?"
      component={<PersonalityBoard data={data} />}
      copy={<p>{data.personalityTraits.join(" · ") || "No traits defined yet."}</p>}
    />
  );
}
