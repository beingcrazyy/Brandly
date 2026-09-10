"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

export function MeadowFooter({ data }: { data: BrandData }) {
  return (
    <footer className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className="text-[19px] italic"
        style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
      >
        {data.name}
      </motion.span>
      <span className="text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
        Powered by Brandly
      </span>
    </footer>
  );
}
