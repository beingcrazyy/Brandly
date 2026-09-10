"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** SVG-generated film grain, tiled and looped — matches cairn-brand-portal's `Grain.tsx` (its
 *  CSS `steps(6)` keyframe reimplemented as a Framer Motion step sequence, same 1.1s loop). */
export function DuskGrain() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
      animate={reduced ? undefined : { x: ["0%", "-1%", "2%", "-1%", "1%", "-2%", "0%"], y: ["0%", "-2%", "1%", "2%", "-1%", "1%", "0%"] }}
      transition={reduced ? undefined : { duration: 1.1, repeat: Infinity, ease: "linear" }}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "120px 120px",
      }}
    />
  );
}
