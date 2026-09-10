"use client";

import { useEffect, useRef } from "react";
import { hexToRgb } from "@/lib/color";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  drift: number;
}

/** A quiet field of soft, glowing dots (dust caught in a headlamp beam) — matches cairn-brand-portal's
 *  `ParticleField.tsx` exactly. Particles drift upward, ease away from the cursor, and get a small
 *  velocity kick from scroll speed. Rendered on canvas rather than one DOM node per particle. */
export function DuskParticleField({ accentHex }: { accentHex: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { r: ar, g: ag, b: ab } = hexToRgb(accentHex);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const pointer = { x: width / 2, y: height / 2, active: false };
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const count = Math.min(70, Math.floor((width * height) / 22000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -Math.random() * 0.12 - 0.03,
      drift: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onScroll = () => {
      scrollVelocity = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      scrollVelocity *= 0.9;

      for (const p of particles) {
        p.drift += 0.004;
        p.x += p.vx + Math.sin(p.drift) * 0.04;
        p.y += p.vy - scrollVelocity * 0.01;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0.01) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${0.28 + p.r * 0.12})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [accentHex, reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[2] opacity-70" />;
}
