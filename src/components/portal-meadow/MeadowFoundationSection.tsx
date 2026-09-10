"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { MeadowSection } from "./MeadowSection";
import { SANS_STACK } from "@/lib/fonts";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, SPRING_SOFT } from "@/lib/motion";

interface Tier {
  id: string;
  label: string;
  question: string;
  widthPct: number;
  detail: (d: BrandData) => string;
}

const TIERS: Tier[] = [
  { id: "salience", label: "Salience", question: "Do they know you're there?", widthPct: 100, detail: (d) => [d.positioning.category, d.industry].filter(Boolean).join(" · ") || "Not defined yet." },
  { id: "performance", label: "Performance + Imagery", question: "What does it do, what does it say about you?", widthPct: 78, detail: (d) => `${d.positioning.differentiator} Read as ${d.personalityTraits.slice(0, 3).join(", ").toLowerCase() || "—"}.` },
  { id: "judgments", label: "Judgments + Feelings", question: "What do they conclude, how does it feel?", widthPct: 54, detail: (d) => `${d.positioning.competitiveAdvantage} It feels like ${d.audience.primary.motivations.toLowerCase() || "—"}.` },
  { id: "resonance", label: "Resonance", question: "Do they come back, and bring others?", widthPct: 30, detail: (d) => d.purpose || "Not defined yet." },
];

function FoundationStack({ data }: { data: BrandData }) {
  const [selected, setSelected] = useState<Tier>(TIERS[0]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="flex flex-col items-center gap-2.5">
        {TIERS.slice()
          .reverse()
          .map((tier) => {
            const active = selected.id === tier.id;
            return (
              <motion.button
                key={tier.id}
                variants={fadeUp}
                type="button"
                onClick={() => setSelected(tier)}
                className="focus-ring flex flex-col items-center rounded-[18px] px-6 py-4 text-center transition-colors"
                style={{ width: `${tier.widthPct}%`, backgroundColor: active ? "color-mix(in srgb, var(--brand-accent) 18%, white)" : "color-mix(in srgb, var(--brand-background) 55%, white)" }}
              >
                <span className="text-[15px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                  {tier.label}
                </span>
                <span className="mt-1 text-[12px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                  {tier.question}
                </span>
              </motion.button>
            );
          })}
      </motion.div>

      <div className="relative min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div key={selected.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={SPRING_SOFT} className="rounded-[18px] p-6" style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 55%, white)" }}>
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
              {selected.label}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
              {selected.detail(data)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MeadowFoundationSection({ data }: { data: BrandData }) {
  return (
    <MeadowSection
      id="foundation"
      index="01"
      title="Foundation"
      subtitle="What the brand is built on."
      component={<FoundationStack data={data} />}
      copy={
        <>
          {data.essence && <p className="mb-3 italic" style={{ color: "var(--brand-text)" }}>“{data.essence}”</p>}
          <p>{data.purpose}</p>
        </>
      }
    />
  );
}
