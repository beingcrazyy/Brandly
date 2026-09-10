"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";

/** Meadow's signature layout: soft, rounded, warm — a pill eyebrow, an italic display headline, the
 *  component staged on a large soft-shadowed rounded-3xl "paper cutout" card, never a hard edge. */
export function MeadowSection({
  id,
  index,
  title,
  subtitle,
  component,
  copy,
}: {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  component: React.ReactNode;
  copy: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
      <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={staggerContainer(0.1)} className="flex flex-col">
        <motion.div
          variants={fadeUp}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase"
          style={{ fontFamily: SANS_STACK, color: "var(--brand-text)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 16%, var(--brand-background))" }}
        >
          <span>{index}</span>
          <span style={{ opacity: 0.6 }}>{title}</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="max-w-3xl text-[32px] leading-[1.2] font-medium italic sm:text-[42px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
          {subtitle}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-10 rounded-[28px] p-6 sm:p-10"
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 60%, white)", boxShadow: "0 24px 60px -32px rgba(30,20,10,0.18)" }}
        >
          {component}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7 max-w-2xl text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
