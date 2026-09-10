"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { accordionContent, springTouch } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER, SUMMIT_PAPER_SHEET } from "./summitTheme";

type Mode = "are" | "not";

export function SummitVoiceSection({ data }: { data: BrandData }) {
  const [mode, setMode] = useState<Mode>("are");
  const [expanded, setExpanded] = useState<string | null>(data.voice.writingPrinciples[0]?.id ?? null);
  const chips = mode === "are" ? data.voice.soundsLike : data.voice.doesntSoundLike;
  const ink25 = "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)";

  return (
    <section id="voice" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 07" eyebrow="Voice & tone" title="How the brand actually talks." description={data.voice.voice} />

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <div>
          <div className="inline-flex border" style={{ borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET }}>
            {(["are", "not"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="focus-ring relative px-5 py-2 text-xs tracking-widest uppercase transition-colors"
                style={{ fontFamily: MONO_STACK, color: mode === m ? SUMMIT_PAPER_SHEET : SUMMIT_INK_FAINT }}
              >
                {mode === m && <motion.span layoutId="summit-voice-toggle-fill" className="absolute inset-0" style={{ backgroundColor: SUMMIT_INK }} transition={springTouch} />}
                <span className="relative">We{m === "are" ? " are" : "'re not"}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-8 flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {chips.map((chip) => (
                <motion.span
                  key={chip}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={springTouch}
                  className="border px-3 py-1.5 text-xs"
                  style={
                    mode === "are"
                      ? { fontFamily: MONO_STACK, borderColor: "var(--brand-accent)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 10%, transparent)", color: SUMMIT_INK }
                      : { fontFamily: MONO_STACK, borderColor: ink25, backgroundColor: SUMMIT_PAPER, color: SUMMIT_INK_FAINT }
                  }
                >
                  {mode === "are" ? "✓ " : "✕ "}
                  {chip}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-3">
          {data.voice.writingPrinciples.map((p, i) => {
            const isOpen = expanded === p.id;
            return (
              <SummitSpecPanel key={p.id} accent={isOpen} className="overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : p.id)} className="focus-ring flex w-full items-center gap-4 px-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="tabular-nums text-xs" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                    §{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-lg" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                    {p.title}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 90 : 0 }} style={{ fontFamily: MONO_STACK, color: SUMMIT_INK }}>
                    &gt;
                  </motion.span>
                </button>
                <motion.div initial={false} animate={isOpen ? "expanded" : "collapsed"} variants={accordionContent} className="overflow-hidden px-6">
                  <p className="pb-5 pl-9 text-sm leading-relaxed sm:text-base" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
                    {p.explanation}
                  </p>
                </motion.div>
              </SummitSpecPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
