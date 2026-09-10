"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, staggerItem, staggerItemSpring } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

const MINOR_TICKS = Array.from({ length: 11 }, (_, i) => i * 10);

export function SummitPersonalitySection({ data }: { data: BrandData }) {
  const ink25 = "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)";

  return (
    <section id="personality" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 04" eyebrow="Personality" title="How the brand shows up in a room." />

      <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mt-10 flex flex-wrap gap-2">
        {data.personalityTraits.map((trait) => (
          <motion.span key={trait} variants={staggerItemSpring} className="border px-3 py-1.5 text-xs uppercase tracking-wide" style={{ fontFamily: MONO_STACK, borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}>
            {trait}
          </motion.span>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-16 grid gap-12 sm:grid-cols-2">
        {data.personalityScales.map((scale) => (
          <motion.div key={scale.id} variants={staggerItem}>
            <div className="mb-4 flex items-center justify-between text-[11px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_MUTED }}>
              <span>{scale.leftLabel}</span>
              <span>{scale.rightLabel}</span>
            </div>
            <div className="relative h-6">
              <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2" style={{ backgroundColor: ink25 }} />
              {MINOR_TICKS.map((t) => (
                <span key={t} className="absolute top-1/2 w-px -translate-x-1/2 -translate-y-1/2" style={{ left: `${t}%`, height: t % 50 === 0 ? 12 : 6, backgroundColor: ink25 }} />
              ))}
              <motion.div
                className="tabular-nums absolute top-1/2 flex -translate-y-1/2 flex-col items-center"
                initial={{ left: "0%" }}
                whileInView={{ left: `${scale.value}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginLeft: -1 }}
              >
                <span className="absolute -top-7 border px-1.5 py-0.5 text-[10px] whitespace-nowrap" style={{ fontFamily: MONO_STACK, borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}>
                  {scale.value}
                </span>
                <span className="h-4 w-0.5" style={{ backgroundColor: "var(--brand-accent)" }} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
