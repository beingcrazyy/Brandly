"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessagingPillar } from "@/lib/types";
import { Inspector } from "../interaction/Inspector";
import { GrainOverlay } from "../ui/GrainOverlay";
import { SANS_STACK } from "@/lib/fonts";
import { useTilt } from "@/lib/useTilt";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, SPRING_SNAPPY } from "@/lib/motion";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

interface PillarTheme {
  border: string;
  text: string;
  muted: string;
  accent: string;
  labelFont: string;
  bodyFont: string;
}

/** Portal-only pillar card — pointer-tracked 3D tilt + a sheen that follows the cursor, for tactile hover. */
function PortalPillarCard({ p, i, theme, onSelect }: { p: MessagingPillar; i: number; theme: PillarTheme; onSelect: (p: MessagingPillar) => void }) {
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
      onClick={() => onSelect(p)}
      onMouseMove={handleMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_SNAPPY}
      style={{ borderColor: theme.border, rotateX, rotateY, transformPerspective: 900 }}
      className="focus-ring group relative overflow-hidden rounded-[14px] border p-6 text-left will-change-transform"
    >
      <GrainOverlay opacity={0.04} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--brand-accent) 18%, transparent), transparent 70%)` }}
      />
      <div className="relative">
        <span
          className="inline-flex h-8 w-8 items-center justify-center text-[13px] font-semibold tracking-[0.05em]"
          style={{
            fontFamily: theme.labelFont,
            color: theme.accent,
            borderRadius: "58% 42% 65% 35% / 45% 55% 45% 55%",
            background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${theme.accent} 32%, transparent), color-mix(in srgb, ${theme.accent} 8%, transparent) 78%)`,
          }}
        >
          {ROMAN[i] ?? i + 1}
        </span>
        <p className="mt-3 text-[16px] font-medium" style={{ fontFamily: theme.labelFont, color: theme.text }}>
          {p.title}
        </p>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
          {p.description}
        </p>
      </div>
    </motion.button>
  );
}

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function MessagingPillars({ valueProposition, pillars, variant = "portal" }: { valueProposition: string; pillars: MessagingPillar[]; variant?: "lab" | "portal" }) {
  const [selected, setSelected] = useState<MessagingPillar | null>(null);
  const isPortal = variant === "portal";

  const theme: PillarTheme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", labelFont: SANS_STACK, bodyFont: "var(--font-secondary)" }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", labelFont: "var(--font-serif)", bodyFont: "system-ui, sans-serif" };

  return (
    <>
      <div className="flex flex-col gap-10">
        {valueProposition && (
          <p
            className="max-w-2xl text-[22px] leading-snug italic sm:text-[28px]"
            style={{ fontFamily: theme.labelFont, color: theme.text }}
          >
            {valueProposition}
          </p>
        )}

        {pillars.length > 0 &&
          (isPortal ? (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-3"
              variants={staggerContainer()}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              {pillars.map((p, i) => (
                <PortalPillarCard key={p.id} p={p} i={i} theme={theme} onSelect={setSelected} />
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  className="focus-ring rounded-[14px] border p-6 text-left transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ borderColor: theme.border }}
                >
                  <span className="text-[13px] font-semibold tracking-[0.1em]" style={{ fontFamily: theme.labelFont, color: theme.accent }}>
                    {ROMAN[i] ?? i + 1}
                  </span>
                  <p className="mt-3 text-[16px] font-medium" style={{ fontFamily: theme.labelFont, color: theme.text }}>
                    {p.title}
                  </p>
                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          ))}
      </div>

      <Inspector open={!!selected} onClose={() => setSelected(null)} eyebrow="Messaging Pillar" title={selected?.title ?? ""}>
        <p className="text-[14px] leading-relaxed text-neutral-700">{selected?.description}</p>
      </Inspector>
    </>
  );
}
