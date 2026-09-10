"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { MONO_STACK } from "@/lib/fonts";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

export function FieldFooter({ data }: { data: BrandData }) {
  return (
    <footer
      className="relative flex flex-col items-center gap-3 border-t-2 border-dashed px-6 py-16 text-center"
      style={{ borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)" }}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className="text-[22px] font-medium"
        style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
      >
        {data.name}
      </motion.span>
      {data.tagline && (
        <span className="text-[14px] italic" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
          {data.tagline}
        </span>
      )}
      <span className="mt-1 text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
        Powered by Brandly
      </span>
    </footer>
  );
}
