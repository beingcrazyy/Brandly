"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { SPRING_SNAPPY } from "@/lib/motion";

type Mode = "is" | "isnt";

/** Field's Voice & Tone stage: a hard-shadow toggle switching between "sounds like"/"doesn't sound
 *  like" chip sets, plus a stack of hard-shadow accordions for the writing principles. */
function VoiceBoard({ data }: { data: BrandData }) {
  const [mode, setMode] = useState<Mode>("is");
  const [expanded, setExpanded] = useState<string | null>(data.voice.writingPrinciples[0]?.id ?? null);
  const chips = mode === "is" ? data.voice.soundsLike : data.voice.doesntSoundLike;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="inline-flex rounded-full border-2 p-1" style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: "3px 3px 0 0 var(--brand-text)" }}>
          {(["is", "isnt"] as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className="focus-ring relative rounded-full px-5 py-2 text-[12px] tracking-widest uppercase"
                style={{ fontFamily: MONO_STACK, color: active ? "var(--brand-background)" : "var(--brand-muted)" }}
              >
                {active && <motion.span layoutId="field-voice-pill" className="absolute inset-0 rounded-full" style={{ backgroundColor: "var(--brand-text)" }} transition={SPRING_SNAPPY} />}
                <span className="relative flex items-center gap-1.5">
                  {m === "is" ? <Check size={13} /> : <X size={13} />}
                  We{m === "is" ? " Are" : "'re Not"}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-7 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {chips.map((chip) => (
              <motion.span
                key={chip}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={SPRING_SNAPPY}
                className="rounded-full border-2 px-3.5 py-1.5 text-[13.5px]"
                style={
                  mode === "is"
                    ? { fontFamily: "var(--font-secondary)", borderColor: "var(--brand-text)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 22%, var(--brand-background))", color: "var(--brand-text)", boxShadow: "2px 2px 0 0 var(--brand-accent)" }
                    : { fontFamily: "var(--font-secondary)", borderColor: "color-mix(in srgb, var(--brand-text) 35%, transparent)", color: "var(--brand-muted)", textDecoration: "line-through" }
                }
              >
                {chip}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="space-y-3">
        {data.voice.writingPrinciples.map((p, i) => {
          const open = expanded === p.id;
          return (
            <div
              key={p.id}
              className="overflow-hidden rounded-[var(--radius-small)] border-2"
              style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: `3px 3px 0 0 ${open ? "var(--brand-accent)" : "var(--brand-text)"}` }}
            >
              <button type="button" onClick={() => setExpanded(open ? null : p.id)} className="focus-ring flex w-full items-center justify-between gap-3 px-5 py-4 text-left" aria-expanded={open}>
                <span className="flex items-center gap-3">
                  <span className="text-[10px]" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                    {p.title}
                  </span>
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={SPRING_SNAPPY}>
                  <ChevronDown size={16} style={{ color: "var(--brand-muted)" }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
                    <p className="px-5 pb-4 text-[13.5px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                      {p.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FieldVoiceSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="voice"
      index="07"
      title="Voice & Tone"
      subtitle="How the brand sounds, in writing and in speech."
      component={<VoiceBoard data={data} />}
      copy={<p>{data.voice.voice}</p>}
    />
  );
}
