"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudienceProfile } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { useTilt } from "@/lib/useTilt";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { GrainOverlay } from "../ui/GrainOverlay";

type TabKey = "needs" | "problems" | "motivations" | "behaviors";

const TABS: { key: TabKey; label: string }[] = [
  { key: "needs", label: "Goals" },
  { key: "problems", label: "Frustrations" },
  { key: "motivations", label: "Motivations" },
  { key: "behaviors", label: "A Day In Their Life" },
];

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function AudiencePersonaCard({ profile, label, variant = "portal" }: { profile: AudienceProfile; label?: string; variant?: "lab" | "portal" }) {
  const [active, setActive] = useState<TabKey>("needs");
  const isPortal = variant === "portal";
  const { ref: tiltRef, rotateX, rotateY, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(6);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const theme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", accentOn: "var(--brand-background)", labelFont: SANS_STACK, bodyFont: "var(--font-secondary)" }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", accentOn: "#fff", labelFont: "var(--font-serif)", bodyFont: "system-ui, sans-serif" };

  const activeText = profile[active];

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    onTiltMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }

  const content = (
    <>
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center text-[20px] font-semibold"
          style={
            isPortal
              ? {
                  borderRadius: "62% 38% 55% 45% / 55% 42% 58% 45%",
                  background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${theme.accent} 88%, var(--brand-background) 12%), ${theme.accent} 78%)`,
                  color: theme.accentOn,
                  fontFamily: theme.labelFont,
                }
              : { borderRadius: "9999px", backgroundColor: theme.accent, color: theme.accentOn, fontFamily: theme.labelFont }
          }
        >
          {(profile.name || "?").charAt(0)}
        </div>
        <div>
          {label && (
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: theme.accent }}>
              {label}
            </p>
          )}
          <p className="text-[19px] font-semibold" style={{ fontFamily: theme.labelFont, color: theme.text }}>
            {profile.name || "Untitled Audience"}
          </p>
          <p className="text-[13px]" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
            {[profile.ageRange, profile.occupation, profile.location].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          const tabStyle = {
            fontFamily: theme.bodyFont,
            backgroundColor: isActive ? theme.accent : "transparent",
            color: isActive ? theme.accentOn : theme.muted,
            border: isActive ? "none" : `1px solid ${theme.border}`,
          };
          return isPortal ? (
            <motion.button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING_SNAPPY}
              className="focus-ring relative rounded-full px-4 py-2 text-[13px] font-medium"
              style={tabStyle}
            >
              {tab.label}
            </motion.button>
          ) : (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className="focus-ring relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
              style={tabStyle}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="relative min-h-[96px] overflow-hidden rounded-[var(--radius-medium,12px)] border p-6"
        style={{ borderColor: theme.border }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={isPortal ? SPRING_SOFT : { duration: 0.25, ease: "easeOut" }}
            className="text-[16px] leading-relaxed"
            style={{ fontFamily: theme.bodyFont, color: theme.text }}
          >
            {activeText || "Not defined yet."}
          </motion.p>
        </AnimatePresence>
      </div>
    </>
  );

  if (!isPortal) {
    return <div className="flex flex-col gap-6">{content}</div>;
  }

  return (
    <motion.div
      ref={tiltRef}
      onMouseMove={handleMove}
      onMouseLeave={onTiltLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex flex-col gap-6 overflow-hidden will-change-transform"
    >
      <GrainOverlay opacity={0.035} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--brand-accent) 10%, transparent), transparent 70%)` }}
      />
      {content}
    </motion.div>
  );
}
