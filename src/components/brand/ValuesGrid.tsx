"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandValue } from "@/lib/types";
import { Inspector } from "../interaction/Inspector";
import { GrainOverlay } from "../ui/GrainOverlay";
import { SANS_STACK } from "@/lib/fonts";
import { useTilt } from "@/lib/useTilt";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, SPRING_SNAPPY } from "@/lib/motion";

interface ValueTheme {
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentTint: string;
  labelFont: string;
  bodyFont: string;
}

/** Portal-only value card — pointer-tracked 3D tilt + a sheen that follows the cursor, for tactile hover. */
function PortalValueCard({ v, i, theme, onSelect }: { v: BrandValue; i: number; theme: ValueTheme; onSelect: (v: BrandValue) => void }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(8);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    onMouseMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }

  return (
    <motion.button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      variants={fadeUp}
      type="button"
      onClick={() => onSelect(v)}
      onMouseMove={handleMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_SNAPPY}
      style={{ borderColor: theme.border, rotateX, rotateY, transformPerspective: 900 }}
      className="focus-ring group relative overflow-hidden rounded-[14px] border text-left will-change-transform"
    >
      <GrainOverlay opacity={0.04} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--brand-accent) 18%, transparent), transparent 70%)` }}
      />
      <div className="relative p-6">
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center text-[13px] font-semibold"
          style={{
            borderRadius: "62% 38% 55% 45% / 55% 42% 58% 45%",
            background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${theme.accent} 45%, transparent), ${theme.accentTint} 75%)`,
            color: theme.accent,
          }}
        >
          {v.icon || String(i + 1).padStart(2, "0")}
        </div>
        <p className="text-[17px] font-medium" style={{ fontFamily: theme.labelFont, color: theme.text }}>
          {v.name}
        </p>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
          {v.description}
        </p>
      </div>
    </motion.button>
  );
}

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function ValuesGrid({ values, variant = "portal" }: { values: BrandValue[]; variant?: "lab" | "portal" }) {
  const [selected, setSelected] = useState<BrandValue | null>(null);
  const isPortal = variant === "portal";

  const theme: ValueTheme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", accentTint: "color-mix(in srgb, var(--brand-accent) 16%, transparent)", labelFont: SANS_STACK, bodyFont: "var(--font-secondary)" }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", accentTint: "var(--accent-terracotta-tint)", labelFont: "var(--font-serif)", bodyFont: "system-ui, sans-serif" };

  if (values.length === 0) {
    return (
      <p className="text-[14px]" style={{ color: theme.muted }}>
        No values defined yet.
      </p>
    );
  }

  return (
    <>
      {isPortal ? (
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {values.map((v, i) => (
            <PortalValueCard key={v.id} v={v} i={i} theme={theme} onSelect={setSelected} />
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v)}
              className="focus-ring overflow-hidden rounded-[14px] border text-left transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: theme.border }}
            >
              <div className="p-6">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold"
                  style={{ backgroundColor: theme.accentTint, color: theme.accent }}
                >
                  {v.icon || String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[17px] font-medium" style={{ fontFamily: theme.labelFont, color: theme.text }}>
                  {v.name}
                </p>
                <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
                  {v.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Inspector open={!!selected} onClose={() => setSelected(null)} eyebrow="Value" title={selected?.name ?? ""}>
        <p className="text-[14px] leading-relaxed text-neutral-700">{selected?.description}</p>
      </Inspector>
    </>
  );
}
