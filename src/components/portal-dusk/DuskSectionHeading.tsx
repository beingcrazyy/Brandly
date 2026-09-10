"use client";

import { motion } from "framer-motion";
import { staggerItem } from "./duskMotion";
import { MONO_STACK } from "@/lib/fonts";

/** Matches cairn-brand-portal's `SectionHeading.tsx` exactly: a pill waypoint tag next to a dimmed
 *  eyebrow, a big display headline, an optional description paragraph. */
export function DuskSectionHeading({ waypoint, eyebrow, title, description }: { waypoint: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div variants={staggerItem} className="mb-5 flex items-center gap-3 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-accent)" }}>
        <span className="rounded-full px-2.5 py-1" style={{ border: "1px solid color-mix(in srgb, var(--brand-accent) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 10%, transparent)" }}>
          {waypoint}
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>{eyebrow}</span>
      </motion.div>
      <motion.h2 variants={staggerItem} className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-primary)" }}>
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={staggerItem} className="mt-5 text-base leading-relaxed sm:text-lg" style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.6)" }}>
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
