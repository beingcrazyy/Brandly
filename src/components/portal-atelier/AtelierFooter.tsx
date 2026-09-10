"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

export function AtelierFooter({ data }: { data: BrandData }) {
  return (
    <footer
      className="relative overflow-hidden border-t px-6 py-12 sm:px-12"
      style={{ borderColor: "color-mix(in srgb, var(--brand-text) 8%, transparent)", backgroundColor: "var(--brand-background)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 10%, transparent)" }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className="relative flex flex-col items-center justify-between gap-3 sm:flex-row"
      >
        <span className="text-[13px] font-medium" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
          {data.name}
        </span>
        <span className="text-[12px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
          Powered by Brandly
        </span>
      </motion.div>
    </footer>
  );
}
