"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { DuskTiltCard } from "./DuskTiltCard";
import { staggerContainer, staggerItemSpring } from "./duskMotion";

export function DuskValuesSection({ data }: { data: BrandData }) {
  return (
    <section id="values" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-06" eyebrow="Values" title="What the brand won't compromise on." />

      <motion.div variants={staggerContainer(0.08, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-14 grid gap-6 sm:grid-cols-2">
        {data.values.map((value, i) => (
          <motion.div key={value.id} variants={staggerItemSpring}>
            <DuskTiltCard>
              <div className="flex h-6 w-6 items-center justify-center text-xs font-semibold" style={{ color: "var(--brand-accent)" }}>
                {value.icon || String(i + 1).padStart(2, "0")}
              </div>
              <p className="mt-5 text-xl text-white sm:text-2xl" style={{ fontFamily: "var(--font-primary)" }}>
                {value.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base" style={{ fontFamily: "var(--font-secondary)" }}>
                {value.description}
              </p>
            </DuskTiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
