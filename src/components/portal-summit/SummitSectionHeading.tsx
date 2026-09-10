"use client";

import { motion } from "framer-motion";
import { staggerItem } from "./summitMotion";
import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED } from "./summitTheme";

/** Matches `SectionHeading.tsx` exactly: a "FIG. 0X" plate, a hairline connector, a dimmed eyebrow,
 *  a big display headline, an optional description. */
export function SummitSectionHeading({ plate, eyebrow, title, description }: { plate: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3">
        <span className="text-xs tracking-[0.15em]" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK }}>
          {plate}
        </span>
        <span className="h-px w-8" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 40%, transparent)" }} />
        <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2 variants={staggerItem} className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={staggerItem} className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
