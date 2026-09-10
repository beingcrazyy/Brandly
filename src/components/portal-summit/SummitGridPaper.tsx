"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePagePointer } from "./usePagePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SUMMIT_PAPER } from "./summitTheme";

const GRID_MINOR = "linear-gradient(to right, rgba(18,20,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,20,26,0.05) 1px, transparent 1px)";
const GRID_MAJOR = "linear-gradient(to right, rgba(18,20,26,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,20,26,0.09) 1px, transparent 1px)";

/** Fixed, full-bleed graph-ruled backdrop: a fine minor grid and a slightly stronger major grid on
 *  top, both nudging toward the cursor + scroll depth. No color, no glow — precision instead of
 *  atmosphere is the point of this edition. Matches `GridPaper.tsx` exactly. */
export function SummitGridPaper() {
  const reduced = usePrefersReducedMotion();
  const { x, y } = usePagePointer();
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const parallaxX = useTransform(x, [0, 1], ["-0.6%", "0.6%"]);
  const parallaxY = useTransform(y, [0, 1], ["-0.6%", "0.6%"]);
  const majorY = useTransform(smoothScroll, [0, 1], ["0%", "-3%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ backgroundColor: SUMMIT_PAPER }}>
      <motion.div className="absolute inset-[-4%]" style={{ backgroundImage: GRID_MINOR, backgroundSize: "16px 16px", ...(reduced ? {} : { x: parallaxX, y: parallaxY }) }} />
      <motion.div className="absolute inset-[-4%]" style={{ backgroundImage: GRID_MAJOR, backgroundSize: "80px 80px", ...(reduced ? {} : { y: majorY }) }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, transparent, ${SUMMIT_PAPER})` }} />
    </div>
  );
}
