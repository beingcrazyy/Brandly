"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface Tilt {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/** Pointer-tracked 3D tilt, spring-smoothed — drop rotateX/rotateY into a motion.div's style
 *  alongside transformPerspective. Used for hover-tilt cards (values, audience, messaging pillars). */
export function useTilt(maxDeg = 8): Tilt {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawY, { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * maxDeg);
    rawX.set(-py * maxDeg);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
