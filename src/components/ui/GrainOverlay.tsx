"use client";

import { useId } from "react";

/** Fixed low-opacity film-grain texture (feTurbulence, desaturated) — the shared recipe so every
 *  template's painterly backdrops carry the same grain instead of each reinventing its own noise. */
export function GrainOverlay({ opacity = 0.05, className = "" }: { opacity?: number; className?: string }) {
  const filterId = useId();
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity, mixBlendMode: "overlay" }}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
