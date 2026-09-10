"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

/** Global, page-level pointer position as smoothed motion values (0-1 normalized). */
export function usePagePointer(): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { x, y };
}
