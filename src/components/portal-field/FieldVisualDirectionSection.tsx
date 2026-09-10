"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

function ScrubSlider({ label, value, min, max, step = 1, suffix = "", onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-[11px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--brand-text)" }}>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 15%, transparent)", accentColor: "var(--brand-accent)" }}
      />
    </label>
  );
}

/** Field's Visual Direction stage: hard-shadow swatches that morph rounded-square to circle on
 *  hover, plus a scrubbable live type specimen — a workbench, not a static reference sheet. */
function VisualDirectionBoard({ data }: { data: BrandData }) {
  const [size, setSize] = useState(56);
  const [weight, setWeight] = useState(500);

  return (
    <div className="flex flex-col gap-10">
      <motion.div variants={staggerContainer(0.07)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {data.colors.map((color) => (
          <motion.div key={color.id} variants={fadeUp} className="group flex flex-col items-center gap-2.5">
            <motion.div
              className="aspect-square w-full rounded-[var(--radius-small)] border-2 transition-[border-radius] duration-500 group-hover:rounded-full"
              style={{ borderColor: "var(--brand-text)", backgroundColor: color.hex, boxShadow: "3px 3px 0 0 var(--brand-text)" }}
              whileHover={{ x: -2, y: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <div className="text-center">
              <p className="text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {color.name}
              </p>
              <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
                {color.hex}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="rounded-[var(--radius-small)] border-2 p-6 sm:p-8" style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: "4px 4px 0 0 var(--brand-accent)" }}>
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
          Live type specimen
        </p>
        <div className="mt-7 flex min-h-[100px] items-center overflow-hidden">
          <motion.p
            animate={{ fontSize: size, fontWeight: weight }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
          >
            {data.name}
          </motion.p>
        </div>
        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <ScrubSlider label="Size" value={size} min={24} max={120} onChange={setSize} suffix="px" />
          <ScrubSlider label="Weight" value={weight} min={300} max={800} step={100} onChange={setWeight} />
        </div>
        <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t-2 border-dashed pt-5 text-[12px]" style={{ fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)", color: "var(--brand-muted)" }}>
          <span>Display — {data.typography.primary.family}</span>
          <span>Body — {data.typography.secondary.family}</span>
        </div>
      </div>
    </div>
  );
}

export function FieldVisualDirectionSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="visual-direction"
      index="09"
      title="Visual Direction"
      subtitle="The colors and type that carry this brand."
      component={<VisualDirectionBoard data={data} />}
      copy={<p>The palette and type scale every other surface in this portal is built from.</p>}
    />
  );
}
