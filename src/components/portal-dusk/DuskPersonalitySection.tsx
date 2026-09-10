"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, staggerItem, staggerItemSpring } from "./duskMotion";

export function DuskPersonalitySection({ data }: { data: BrandData }) {
  return (
    <section id="personality" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-04" eyebrow="Personality" title="How the brand shows up in a room." />

      <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mt-10 flex flex-wrap gap-3">
        {data.personalityTraits.map((trait) => (
          <motion.span key={trait} variants={staggerItemSpring} className="rounded-full border px-4 py-2 text-sm text-white/80" style={{ fontFamily: "var(--font-secondary)", borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}>
            {trait}
          </motion.span>
        ))}
      </motion.div>

      <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-16 grid gap-8 sm:grid-cols-2">
        {data.personalityScales.map((scale) => (
          <motion.div key={scale.id} variants={staggerItem} className="group">
            <div className="mb-3 flex items-center justify-between text-[11px] tracking-widest text-white/50 uppercase" style={{ fontFamily: MONO_STACK }}>
              <span>{scale.leftLabel}</span>
              <span>{scale.rightLabel}</span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundImage: "linear-gradient(to right, var(--brand-secondary), var(--brand-accent))" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${scale.value}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white"
                style={{ boxShadow: "0 0 24px -6px var(--brand-accent)" }}
                initial={{ left: "0%" }}
                whileInView={{ left: `calc(${scale.value}% - 7px)` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
