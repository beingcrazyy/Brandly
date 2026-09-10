"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { usePagePointer } from "./usePagePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { DUSK_CANVAS } from "./duskTheme";

const MESH_GRADIENT =
  "radial-gradient(at 15% 20%, color-mix(in srgb, var(--brand-primary) 55%, transparent) 0px, transparent 55%), radial-gradient(at 85% 15%, color-mix(in srgb, var(--brand-secondary) 40%, transparent) 0px, transparent 50%), radial-gradient(at 50% 85%, color-mix(in srgb, var(--brand-accent) 35%, transparent) 0px, transparent 55%)";

/** Full-bleed, fixed atmospheric backdrop: three soft radial blobs in the brand's primary/secondary/
 *  accent colors that drift on a slow loop and nudge toward the cursor + current scroll depth —
 *  matches cairn-brand-portal's `GradientMesh.tsx` exactly. */
export function DuskGradientMesh() {
  const reduced = usePrefersReducedMotion();
  const { x, y } = usePagePointer();
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  const parallaxX = useTransform(x, [0, 1], ["-3%", "3%"]);
  const parallaxY = useTransform(y, [0, 1], ["-3%", "3%"]);
  const scrollTint = useTransform(smoothScroll, [0, 1], [0, 40]);
  const hueShift = useMotionTemplate`hue-rotate(${scrollTint}deg)`;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ backgroundColor: DUSK_CANVAS }}>
      <motion.div
        className="absolute inset-[-10%]"
        style={{
          backgroundImage: MESH_GRADIENT,
          ...(reduced ? {} : { x: parallaxX, y: parallaxY, filter: hueShift }),
        }}
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, color-mix(in srgb, ${DUSK_CANVAS} 40%, transparent), ${DUSK_CANVAS})` }} />
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, " + DUSK_CANVAS + " 30%, transparent)" }} />
    </div>
  );
}
