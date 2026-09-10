"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { SummitTiltCard } from "./SummitTiltCard";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, staggerItemSpring } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED } from "./summitTheme";

export function SummitValuesSection({ data }: { data: BrandData }) {
  return (
    <section id="values" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 06" eyebrow="Values" title="What the brand won't compromise on." />

      <motion.div variants={staggerContainer(0.08, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-14 grid gap-6 sm:grid-cols-2">
        {data.values.map((value, i) => (
          <motion.div key={value.id} variants={staggerItemSpring}>
            <SummitTiltCard>
              <div className="flex items-center justify-between">
                <div className="flex h-6 w-6 items-center justify-center text-xs font-semibold" style={{ color: SUMMIT_INK }}>
                  {value.icon || String(i + 1).padStart(2, "0")}
                </div>
                <span className="tabular-nums text-[10px]" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                  V.{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-5 text-xl sm:text-2xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                {value.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
                {value.description}
              </p>
            </SummitTiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
