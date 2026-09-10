"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { panelSlide, staggerContainer, staggerItem } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

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

export function SummitFoundationSection({ data }: { data: BrandData }) {
  const [selected, setSelected] = useState<Tier | null>(null);

  return (
    <section id="foundation" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading
        plate="FIG. 01"
        eyebrow="Foundation"
        title="What the brand is built on."
        description="Keller's brand-equity pyramid — the four questions a brand has to answer, in order, before it can earn loyalty."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex flex-col items-center gap-6">
          {TIERS.slice()
            .reverse()
            .map((tier) => {
              const active = selected?.id === tier.id;
              return (
                <motion.div key={tier.id} variants={staggerItem} style={{ width: `${tier.widthPct}%` }} className="w-full">
                  <div className="mb-1.5 flex items-center gap-1 px-0.5">
                    <span className="h-1.5 w-px" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 40%, transparent)" }} />
                    <span className="h-px flex-1" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 40%, transparent)" }} />
                    <span className="tabular-nums text-[10px] whitespace-nowrap" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                      {tier.widthPct}%
                    </span>
                    <span className="h-px flex-1" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 40%, transparent)" }} />
                    <span className="h-1.5 w-px" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 40%, transparent)" }} />
                  </div>
                  <button
                    onClick={() => setSelected(tier)}
                    className="focus-ring flex w-full flex-col items-center rounded-[3px] border px-6 py-5 text-center transition-colors duration-150"
                    style={{
                      borderColor: active ? "var(--brand-accent)" : "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)",
                      backgroundColor: active ? "color-mix(in srgb, var(--brand-accent) 10%, transparent)" : SUMMIT_PAPER_SHEET,
                    }}
                  >
                    <span className="text-lg sm:text-xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                      {tier.label}
                    </span>
                    <span className="mt-1 text-xs sm:text-sm" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
                      {tier.subtitle}
                    </span>
                  </button>
                </motion.div>
              );
            })}
        </motion.div>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} variants={panelSlide} initial="hidden" animate="show" exit="exit">
                <SummitSpecPanel accent className="p-8">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                    {selected.label}
                  </p>
                  <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK }}>
                    {selected.detail(data)}
                  </p>
                </SummitSpecPanel>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SummitSpecPanel className="flex h-full min-h-[220px] items-center p-8">
                  <p style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_FAINT }}>Select a tier to see how {data.name} answers it.</p>
                </SummitSpecPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
