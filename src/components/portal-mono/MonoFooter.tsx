"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

export function MonoFooter({ data }: { data: BrandData }) {
  return (
    <footer className="relative px-6 py-10 sm:px-12">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)" }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(0.1)}
        className="flex flex-col items-center justify-between gap-3 sm:flex-row"
      >
        <motion.span variants={fadeUp} className="text-[13px] font-semibold" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
          {data.name}
        </motion.span>
        <motion.span variants={fadeUp} className="text-[12px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
          Powered by Brandly
        </motion.span>
      </motion.div>
    </footer>
  );
}
