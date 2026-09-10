"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
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

/** Field's Foundation stage: Keller's brand-equity pyramid as a stack of nested, width-scaled tier
 *  buttons rather than a triangle diagram — click a tier to see how this brand answers it. */
function FoundationStack({ data }: { data: BrandData }) {
  const [selected, setSelected] = useState<Tier>(TIERS[0]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="flex flex-col items-center gap-3">
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
                whileHover={{ x: -2, y: -2 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="focus-ring flex flex-col items-center rounded-[var(--radius-small)] border-2 px-6 py-4 text-center"
                style={{
                  width: `${tier.widthPct}%`,
                  borderColor: "var(--brand-text)",
                  backgroundColor: active ? "color-mix(in srgb, var(--brand-accent) 22%, var(--brand-background))" : "var(--brand-background)",
                  boxShadow: active ? "4px 4px 0 0 var(--brand-accent)" : "2px 2px 0 0 var(--brand-text)",
                }}
              >
                <span className="text-[17px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
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
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING_SOFT}
            className="rounded-[var(--radius-small)] border-2 p-6"
            style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: "4px 4px 0 0 var(--brand-accent)" }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
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

export function FieldFoundationSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="foundation"
      index="01"
      title="Foundation"
      subtitle="Everything the brand does ladders up to one idea."
      component={<FoundationStack data={data} />}
      copy={
        <>
          {data.essence && <p className="mb-3 text-[17px] font-medium" style={{ color: "var(--brand-text)" }}>“{data.essence}”</p>}
          <p>{data.purpose}</p>
        </>
      }
    />
  );
}
