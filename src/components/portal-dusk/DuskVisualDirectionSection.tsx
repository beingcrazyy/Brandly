"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, staggerItemSpring } from "./duskMotion";

const ROLE_VAR: Record<string, string> = {
  primary: "var(--brand-primary)",
  secondary: "var(--brand-secondary)",
  accent: "var(--brand-accent)",
  neutral: "var(--brand-neutral)",
};

function ScrubSlider({ label, value, min, max, step = 1, suffix = "", onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-[11px] tracking-widest text-white/50 uppercase" style={{ fontFamily: MONO_STACK }}>
        <span>{label}</span>
        <span style={{ color: "var(--brand-accent)" }}>
          {value}
          {suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10" style={{ accentColor: "var(--brand-accent)" }} />
    </label>
  );
}

export function DuskVisualDirectionSection({ data }: { data: BrandData }) {
  const [size, setSize] = useState(64);
  const [weight, setWeight] = useState(500);

  return (
    <section id="visual-direction" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-09" eyebrow="Visual direction" title="The palette and type the brand is built in." />

      <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {data.colors.map((color) => (
          <motion.div key={color.id} variants={staggerItemSpring} className="group flex flex-col items-center gap-3">
            <motion.div
              className="aspect-square w-full rounded-[2rem] transition-[border-radius] duration-500 ease-out group-hover:rounded-xl"
              style={{ backgroundColor: ROLE_VAR[color.role] ?? color.hex, boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.10), 0 1px 0 0 rgba(255,255,255,0.04)" }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <div className="text-center">
              <p className="text-sm text-white/80" style={{ fontFamily: "var(--font-secondary)" }}>
                {color.name}
              </p>
              <p className="text-[10px] tracking-widest text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
                {color.hex}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <DuskGlassPanel className="mt-16 p-8 sm:p-10">
        <p className="text-xs tracking-[0.2em] text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
          Live type specimen
        </p>

        <div className="mt-8 flex min-h-[140px] items-center overflow-hidden">
          <motion.p animate={{ fontSize: size, fontWeight: weight }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="leading-none whitespace-nowrap text-white" style={{ fontFamily: "var(--font-primary)" }}>
            {data.name}
          </motion.p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <ScrubSlider label="Size" value={size} min={28} max={140} onChange={setSize} suffix="px" />
          <ScrubSlider label="Weight" value={weight} min={300} max={800} step={100} onChange={setWeight} />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/40" style={{ fontFamily: MONO_STACK }}>
          <span>Display — {data.typography.primary.family}</span>
          <span>Body — {data.typography.secondary.family}</span>
        </div>
      </DuskGlassPanel>
    </section>
  );
}
