"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SummitSpecPanel } from "./SummitSpecPanel";

/** Focus-lock corner brackets that acquire on hover, like a camera locking focus — matches
 *  `TiltCard.tsx` exactly. */
export function SummitTiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * 8);
    rotateXRaw.set((0.5 - py) * 8);
  };
  const onMouseLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    setHovered(false);
  };

  const bracket = (style: React.CSSProperties, lineStyle: { v: React.CSSProperties; h: React.CSSProperties }) => (
    <motion.span aria-hidden className="pointer-events-none absolute h-3 w-3" initial={false} animate={{ opacity: hovered ? 1 : 0 }} style={style} transition={{ type: "spring", stiffness: 400, damping: 26 }}>
      <span className="absolute h-full w-px" style={{ backgroundColor: "var(--brand-accent)", ...lineStyle.v }} />
      <span className="absolute h-px w-full" style={{ backgroundColor: "var(--brand-accent)", ...lineStyle.h }} />
    </motion.span>
  );

  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onMouseLeave} style={{ rotateX, rotateY, transformPerspective: 900 }} className={`group relative ${className}`}>
      <SummitSpecPanel accent={hovered} className="relative h-full overflow-hidden p-7">
        {bracket({ left: 8, top: 8 }, { v: { left: 0, top: 0 }, h: { left: 0, top: 0 } })}
        {bracket({ right: 8, top: 8 }, { v: { right: 0, top: 0 }, h: { left: 0, top: 0 } })}
        {bracket({ left: 8, bottom: 8 }, { v: { left: 0, top: 0 }, h: { left: 0, bottom: 0 } })}
        {bracket({ right: 8, bottom: 8 }, { v: { right: 0, top: 0 }, h: { left: 0, bottom: 0 } })}
        <div className="relative">{children}</div>
      </SummitSpecPanel>
    </motion.div>
  );
}
