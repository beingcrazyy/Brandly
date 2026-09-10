"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { isLight } from "@/lib/color";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

const DARK_INK = "#14140F";
const LIGHT_INK = "#F6F4EE";

/** Full-bleed brand-primary band — bolder than Mono's thin bordered strip. A slow drifting glow
 *  blob keeps the closing band from reading as a flat color fill, matching the section bands above it. */
export function StudioFooter({ data }: { data: BrandData }) {
  const primaryHex = data.colors.find((c) => c.role === "primary")?.hex ?? "#1D1D1B";
  const ink = isLight(primaryHex) ? DARK_INK : LIGHT_INK;

  return (
    <footer className="relative overflow-hidden px-6 py-12 sm:px-12" style={{ backgroundColor: "var(--brand-primary)" }}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-2/3 left-1/3 h-[40vw] w-[40vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-accent), transparent 70%)", opacity: 0.22 }}
        animate={{ x: [0, 45, 0], y: [0, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className="relative flex flex-col items-center justify-between gap-3 sm:flex-row"
      >
        <span className="text-[18px] font-black tracking-tight uppercase" style={{ fontFamily: SANS_STACK, color: ink }}>
          {data.name}
        </span>
        <span
          className="text-[12px] font-semibold tracking-[0.15em] uppercase"
          style={{ fontFamily: SANS_STACK, color: ink, opacity: 0.7 }}
        >
          Powered by Brandly
        </span>
      </motion.div>
    </footer>
  );
}
