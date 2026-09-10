"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Voice } from "@/lib/types";
import { Check, X, ChevronDown } from "lucide-react";
import { SANS_STACK } from "@/lib/fonts";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { GrainOverlay } from "../ui/GrainOverlay";

/** `lab` (CMS preview) uses Brandly's own terracotta chrome; `portal` uses the brand's own tokens. Same split as BrandDNADiagram. */
export function VoiceToneSwitch({ voice, variant = "portal" }: { voice: Voice; variant?: "lab" | "portal" }) {
  const [mode, setMode] = useState<"is" | "isnt">("is");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isPortal = variant === "portal";

  const theme = isPortal
    ? { border: "color-mix(in srgb, var(--brand-text) 12%, transparent)", text: "var(--brand-text)", muted: "var(--brand-muted)", accent: "var(--brand-accent)", accentOn: "var(--brand-background)", labelFont: SANS_STACK, bodyFont: "var(--font-secondary)" }
    : { border: "#E4DFD3", text: "#14140F", muted: "#77736D", accent: "var(--accent-terracotta)", accentOn: "#fff", labelFont: "var(--font-serif)", bodyFont: "system-ui, sans-serif" };

  const list = mode === "is" ? voice.soundsLike : voice.doesntSoundLike;

  return (
    <div className={`relative flex flex-col gap-8 ${isPortal ? "overflow-hidden" : ""}`}>
      {isPortal && <GrainOverlay opacity={0.035} />}
      <div className="relative inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: theme.border }}>
        {(["is", "isnt"] as const).map((m) => {
          const isActive = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`focus-ring relative rounded-full px-5 py-2 text-[13px] font-semibold ${isPortal ? "" : "transition-colors"}`}
              style={{ fontFamily: theme.labelFont, color: isActive ? theme.accentOn : theme.muted }}
            >
              {isPortal ? (
                isActive && (
                  <motion.span
                    layoutId="voice-toggle-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                    transition={SPRING_SNAPPY}
                  />
                )
              ) : (
                <span
                  className="absolute inset-0 rounded-full transition-colors"
                  style={{ backgroundColor: isActive ? theme.accent : "transparent" }}
                />
              )}
              <span className="relative">{m === "is" ? "We Are" : "We're Not"}</span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "is" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "is" ? 12 : -12 }}
            transition={isPortal ? SPRING_SNAPPY : { duration: 0.22, ease: "easeOut" }}
            className="flex flex-wrap gap-2.5"
          >
            {list.length === 0 ? (
              <p className="text-[14px]" style={{ color: theme.muted }}>
                Not defined yet.
              </p>
            ) : (
              list.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={isPortal ? { ...SPRING_SOFT, delay: i * 0.04 } : { delay: i * 0.04, duration: 0.2 }}
                  whileHover={isPortal ? { scale: 1.06, transition: SPRING_SNAPPY } : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium"
                  style={{
                    fontFamily: theme.bodyFont,
                    color: mode === "is" ? theme.accentOn : theme.text,
                    backgroundColor: mode === "is" ? theme.accent : "transparent",
                    border: mode === "is" ? "none" : `1px solid ${theme.border}`,
                  }}
                >
                  {mode === "is" ? <Check size={13} /> : <X size={13} />}
                  {word}
                </motion.span>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {voice.writingPrinciples.length > 0 && (
        <div className="flex flex-col gap-2">
          {voice.writingPrinciples.map((p, i) => {
            const open = expandedId === p.id;
            return (
              <div key={p.id} className="overflow-hidden rounded-[var(--radius-medium,12px)] border" style={{ borderColor: theme.border }}>
                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : p.id)}
                  className="focus-ring flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[11px] font-semibold"
                      style={
                        isPortal
                          ? {
                              borderRadius: "58% 42% 65% 35% / 45% 55% 45% 55%",
                              background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${theme.accent} 32%, transparent), color-mix(in srgb, ${theme.accent} 8%, transparent) 78%)`,
                              color: theme.accent,
                            }
                          : { borderRadius: "9999px", backgroundColor: "color-mix(in srgb, " + theme.accent + " 16%, transparent)", color: theme.accent }
                      }
                    >
                      {i + 1}
                    </span>
                    <span className="text-[14.5px] font-medium" style={{ fontFamily: theme.labelFont, color: theme.text }}>
                      {p.title}
                    </span>
                  </span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={isPortal ? SPRING_SNAPPY : { duration: 0.2 }}>
                    <ChevronDown size={16} style={{ color: theme.muted }} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-[13.5px] leading-relaxed" style={{ fontFamily: theme.bodyFont, color: theme.muted }}>
                        {p.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
