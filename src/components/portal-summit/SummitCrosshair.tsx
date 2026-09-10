"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

/** A thin crosshair that tracks the pointer 1:1 (no spring lag — this is an instrument, not an
 *  atmosphere effect) with a small monospace coordinate readout, like a cursor in drafting software.
 *  Hidden under prefers-reduced-motion and until the first real pointer move. Matches `Crosshair.tsx`
 *  exactly. */
export function SummitCrosshair() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [label, setLabel] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setLabel({ x: Math.round((e.clientX / window.innerWidth) * 100), y: Math.round((1 - e.clientY / window.innerHeight) * 100) });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[45] transition-opacity duration-200" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="absolute right-0 left-0 h-px" style={{ top: y, backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)" }} />
      <motion.div className="absolute top-0 bottom-0 w-px" style={{ left: x, backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)" }} />
      <motion.div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ left: x, top: y, borderColor: "var(--brand-accent)" }} />
      {label ? (
        <motion.div
          className="absolute -translate-y-full rounded-sm border px-1.5 py-0.5 text-[10px] whitespace-nowrap"
          style={{ left: x, top: y, marginLeft: 10, marginTop: -10, fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 20%, transparent)", backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK_MUTED }}
        >
          X{String(label.x).padStart(3, "0")} · Y{String(label.y).padStart(3, "0")}
        </motion.div>
      ) : null}
    </div>
  );
}
