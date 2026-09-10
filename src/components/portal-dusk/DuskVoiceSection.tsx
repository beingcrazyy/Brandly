"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { accordionContent, springTouch } from "./duskMotion";

type Mode = "are" | "not";

export function DuskVoiceSection({ data }: { data: BrandData }) {
  const [mode, setMode] = useState<Mode>("are");
  const [expanded, setExpanded] = useState<string | null>(data.voice.writingPrinciples[0]?.id ?? null);
  const chips = mode === "are" ? data.voice.soundsLike : data.voice.doesntSoundLike;

  return (
    <section id="voice" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-07" eyebrow="Voice & tone" title="How the brand actually talks." description={data.voice.voice} />

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {(["are", "not"] as Mode[]).map((m) => (
              <button key={m} onClick={() => setMode(m)} className="focus-ring relative rounded-full px-5 py-2 text-xs tracking-widest uppercase transition-colors" style={{ fontFamily: MONO_STACK, color: mode === m ? "#08090C" : "rgba(255,255,255,0.6)" }}>
                {mode === m && <motion.span layoutId="dusk-voice-toggle-pill" className="absolute inset-0 rounded-full" style={{ backgroundColor: "var(--brand-accent)" }} transition={springTouch} />}
                <span className="relative flex items-center gap-1.5">
                  {m === "are" ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  We{m === "are" ? " are" : "'re not"}
                </span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-8 flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {chips.map((chip) => (
                <motion.span
                  key={chip}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={springTouch}
                  className="rounded-full border px-4 py-2 text-sm"
                  style={
                    mode === "are"
                      ? { fontFamily: "var(--font-secondary)", borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 10%, transparent)", color: "white" }
                      : { fontFamily: "var(--font-secondary)", borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }
                  }
                >
                  {chip}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-3">
          {data.voice.writingPrinciples.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <DuskGlassPanel key={p.id} className="overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : p.id)} className="focus-ring flex w-full items-center justify-between px-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="text-lg text-white" style={{ fontFamily: "var(--font-primary)" }}>
                    {p.title}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} style={{ color: "var(--brand-accent)" }}>
                    +
                  </motion.span>
                </button>
                <motion.div initial={false} animate={isOpen ? "expanded" : "collapsed"} variants={accordionContent} className="overflow-hidden px-6">
                  <p className="pb-5 text-sm leading-relaxed text-white/60 sm:text-base" style={{ fontFamily: "var(--font-secondary)" }}>
                    {p.explanation}
                  </p>
                </motion.div>
              </DuskGlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
