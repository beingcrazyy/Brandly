"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, staggerItemSpring } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

const ROLE_VAR: Record<string, string> = {
  primary: "var(--brand-primary)",
  secondary: "var(--brand-secondary)",
  accent: "var(--brand-accent)",
  neutral: "var(--brand-neutral)",
};

export function SummitVisualDirectionSection({ data }: { data: BrandData }) {
  const [size, setSize] = useState(64);
  const [weight, setWeight] = useState(500);
  const ink25 = "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)";
  const ink15 = "color-mix(in srgb, " + SUMMIT_INK + " 15%, transparent)";

  return (
    <section id="visual-direction" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 09" eyebrow="Visual direction" title="The palette and type the brand is built in." />

      <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {data.colors.map((color) => (
          <motion.div key={color.id} variants={staggerItemSpring} className="border p-3" style={{ borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET }}>
            <div className="aspect-square w-full border" style={{ borderColor: ink15, backgroundColor: ROLE_VAR[color.role] ?? color.hex }} />
            <p className="mt-3 text-[11px] tracking-wide uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK }}>
              {color.name}
            </p>
            <p className="tabular-nums text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
              {color.role} · {color.hex}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <SummitSpecPanel className="mt-16 p-8 sm:p-10">
        <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
          Live type specimen
        </p>

        <div className="mt-8 flex min-h-[140px] items-center overflow-hidden">
          <motion.p animate={{ fontSize: size, fontWeight: weight }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="leading-none whitespace-nowrap" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
            {data.name}
          </motion.p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <ScrubSlider label="Size" value={size} min={28} max={140} onChange={setSize} suffix="px" />
          <ScrubSlider label="Weight" value={weight} min={300} max={800} step={100} onChange={setWeight} />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6 text-xs" style={{ fontFamily: MONO_STACK, borderColor: ink15, color: SUMMIT_INK_FAINT }}>
          <span>Display — {data.typography.primary.family}</span>
          <span>Body — {data.typography.secondary.family}</span>
        </div>
      </SummitSpecPanel>
    </section>
  );
}

function ScrubSlider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-[11px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_MUTED }}>
        <span>{label}</span>
        <span className="tabular-nums" style={{ color: SUMMIT_INK }}>
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
        className="h-px w-full cursor-pointer appearance-none"
        style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", accentColor: "var(--brand-accent)" }}
      />
    </label>
  );
}
