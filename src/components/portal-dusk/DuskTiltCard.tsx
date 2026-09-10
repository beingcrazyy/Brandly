"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { DuskGlassPanel } from "./DuskGlassPanel";

/** Glass card that tilts in 3D perspective toward the cursor and reveals a soft accent-colored glow
 *  following the pointer — matches cairn-brand-portal's `TiltCard.tsx` exactly. */
export function DuskTiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 20 });
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--brand-accent) 18%, transparent), transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * 14);
    rotateXRaw.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ rotateX, rotateY, transformPerspective: 900 }} className={`group relative ${className}`}>
      <DuskGlassPanel className="relative h-full overflow-hidden p-7 transition-shadow duration-300 group-hover:shadow-[0_0_24px_-6px_var(--brand-accent)]">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glowBackground }} />
        <div className="relative">{children}</div>
      </DuskGlassPanel>
    </motion.div>
  );
}
