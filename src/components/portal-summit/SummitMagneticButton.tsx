"use client";

import { ButtonHTMLAttributes, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_PAPER_SHEET } from "./summitTheme";

/** Matches `MagneticButton.tsx` exactly: a button that eases toward the cursor within its own
 *  bounds, with two accent corner brackets that pull in tight on hover. */
export function SummitMagneticButton({ children, className = "", strength = 0.3, onClick }: { children: React.ReactNode; className?: string; strength?: number; onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const offset = hovered ? 2 : 5;

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onFocus={() => setHovered(true)}
      onBlur={onMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY, backgroundColor: SUMMIT_INK, color: SUMMIT_PAPER_SHEET }}
      whileTap={{ scale: 0.96 }}
      className={`focus-ring relative inline-flex items-center justify-center gap-2 rounded-[2px] px-7 py-3.5 text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${className}`}
    >
      <span aria-hidden className="absolute h-2 w-2 transition-all duration-300" style={{ left: -offset, top: -offset, backgroundColor: "var(--brand-accent)", clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)" }} />
      <span aria-hidden className="absolute h-2 w-2 transition-all duration-300" style={{ right: -offset, bottom: -offset, backgroundColor: "var(--brand-accent)", clipPath: "polygon(100% 100%, 0 100%, 0 70%, 70% 70%, 70% 0, 100% 0)" }} />
      <span style={{ fontFamily: MONO_STACK }}>{children}</span>
    </motion.button>
  );
}
