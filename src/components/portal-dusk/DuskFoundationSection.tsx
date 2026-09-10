"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { panelSlide, staggerContainer, staggerItem } from "./duskMotion";

interface Tier {
  id: string;
  label: string;
  subtitle: string;
  widthPct: number;
  detail: (d: BrandData) => string;
}

const TIERS: Tier[] = [
  {
    id: "salience",
    label: "Salience",
    subtitle: "Do they know you're there?",
    widthPct: 100,
    detail: (d) =>
      `${d.name} needs to be the name that surfaces first in the ${d.industry.toLowerCase()} category — recognized on sight, recalled without a prompt. Everything above this tier only matters once that recognition exists.`,
  },
  {
    id: "perf-imagery",
    label: "Performance + Imagery",
    subtitle: "What does it do, and what does it say about you?",
    widthPct: 76,
    detail: (d) =>
      `Performance: ${d.messaging.pillars.map((p) => p.title).join(", ")}. Imagery: a person who chooses ${d.name} is read as ${d.personalityTraits.slice(0, 3).join(", ").toLowerCase()}.`,
  },
  {
    id: "judgments-feelings",
    label: "Judgments + Feelings",
    subtitle: "What do they conclude, how does it make them feel?",
    widthPct: 52,
    detail: (d) =>
      `The judgment: "${d.positioning.reasonToBelieve}" The feeling: the quiet confidence of ${d.audience.primary.name.split(",")[0]} setting out with one less thing to worry about.`,
  },
  {
    id: "resonance",
    label: "Resonance",
    subtitle: "Do they come back — and bring others?",
    widthPct: 28,
    detail: (d) => `Resonance is ${d.purpose} That's the loyalty ${d.name} is built to earn — repeat use, and word passed at the trailhead.`,
  },
];

export function DuskFoundationSection({ data }: { data: BrandData }) {
  const [selected, setSelected] = useState<Tier | null>(null);

  return (
    <section id="foundation" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading
        waypoint="WP-01"
        eyebrow="Foundation"
        title="What the brand is built on."
        description="Keller's brand-equity pyramid — the four questions a brand has to answer, in order, before it can earn loyalty."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex flex-col items-center gap-2">
          {TIERS.slice()
            .reverse()
            .map((tier) => {
              const active = selected?.id === tier.id;
              return (
                <motion.button
                  key={tier.id}
                  variants={staggerItem}
                  onClick={() => setSelected(tier)}
                  className="focus-ring group relative flex flex-col items-center rounded-xl border px-6 py-5 text-center transition-colors duration-300"
                  style={{
                    width: `${tier.widthPct}%`,
                    borderColor: active ? "color-mix(in srgb, var(--brand-accent) 60%, transparent)" : "rgba(255,255,255,0.1)",
                    backgroundColor: active ? "color-mix(in srgb, var(--brand-accent) 10%, transparent)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  <span className="text-lg text-white sm:text-xl" style={{ fontFamily: "var(--font-primary)" }}>
                    {tier.label}
                  </span>
                  <span className="mt-1 text-xs text-white/50 sm:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
                    {tier.subtitle}
                  </span>
                </motion.button>
              );
            })}
        </motion.div>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} variants={panelSlide} initial="hidden" animate="show" exit="exit">
                <DuskGlassPanel className="p-8">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-secondary)" }}>
                    {selected.label}
                  </p>
                  <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.75)" }}>
                    {selected.detail(data)}
                  </p>
                </DuskGlassPanel>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DuskGlassPanel className="flex h-full min-h-[220px] items-center p-8">
                  <p style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.4)" }}>Select a tier to see how {data.name} answers it.</p>
                </DuskGlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
