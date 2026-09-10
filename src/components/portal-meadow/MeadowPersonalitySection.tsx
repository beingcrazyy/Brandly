"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { MeadowSection } from "./MeadowSection";
import { SANS_STACK } from "@/lib/fonts";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const ROTATION = ["var(--brand-accent)", "var(--brand-primary)", "color-mix(in srgb, var(--brand-secondary) 70%, var(--brand-text) 30%)"];

function PersonalityBoard({ data }: { data: BrandData }) {
  return (
    <div className="flex flex-col gap-10">
      <motion.div variants={staggerContainer(0.05)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="flex flex-wrap gap-2.5">
        {data.personalityTraits.map((trait, i) => {
          const color = ROTATION[i % ROTATION.length];
          return (
            <motion.span key={trait} variants={fadeUp} className="rounded-full px-4 py-2 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)", backgroundColor: `color-mix(in srgb, ${color} 20%, white)` }}>
              {trait}
            </motion.span>
          );
        })}
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {data.personalityScales.map((scale, i) => {
          const color = ROTATION[i % ROTATION.length];
          return (
            <div key={scale.id}>
              <div className="mb-3 flex items-center justify-between text-[11px] tracking-widest uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
                <span>{scale.leftLabel}</span>
                <span>{scale.rightLabel}</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 8%, transparent)" }}>
                <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ backgroundColor: color }} initial={{ width: 0 }} whileInView={{ width: `${scale.value}%` }} viewport={VIEWPORT_ONCE} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                <motion.div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ backgroundColor: "white", boxShadow: `0 0 0 2px ${color}` }} initial={{ left: "0%" }} whileInView={{ left: `calc(${scale.value}% - 8px)` }} viewport={VIEWPORT_ONCE} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MeadowPersonalitySection({ data }: { data: BrandData }) {
  return (
    <MeadowSection
      id="personality"
      index="04"
      title="Personality"
      subtitle="How the brand shows up in a room."
      component={<PersonalityBoard data={data} />}
      copy={<p>{data.personalityTraits.join(" · ") || "No traits defined yet."}</p>}
    />
  );
}
