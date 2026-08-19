"use client";

import { useState } from "react";
import { Typography, TypeStyle } from "@/lib/types";
import { fontStack } from "@/lib/fonts";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { Textarea } from "../ui/Field";

const SAMPLE = "The quick brown fox jumps over the lazy dog.";

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-neutral-500">{label}</span>
        <span className="font-mono text-[12px] text-[#14140F]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="focus-ring h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[var(--accent-terracotta)]"
      />
    </div>
  );
}

export function TypographyLab({ typography, onChange }: { typography: Typography; onChange: (next: Typography) => void }) {
  usePortalFonts(typography);
  const [selectedName, setSelectedName] = useState(typography.styles[0]?.name);
  const style = typography.styles.find((s) => s.name === selectedName) ?? typography.styles[0];
  const font = style.fontRef === "secondary" ? typography.secondary : typography.primary;

  function updateStyle(patch: Partial<TypeStyle>) {
    onChange({ ...typography, styles: typography.styles.map((s) => (s.name === style.name ? { ...s, ...patch } : s)) });
  }

  return (
    <div className="flex flex-col gap-5 rounded-[var(--radius-lab)] border border-[#E4DFD3] p-5">
      <div className="flex flex-wrap gap-1.5">
        {typography.styles.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setSelectedName(s.name)}
            className={`focus-ring rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
              s.name === style.name ? "bg-[var(--accent-terracotta)] text-white" : "bg-black/5 text-neutral-500 hover:text-[#14140F]"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex min-h-[130px] items-center overflow-hidden rounded-[var(--radius-lab)] bg-black/[0.02] p-6">
        <p
          style={{
            fontFamily: fontStack(font.family),
            fontWeight: style.weight,
            fontSize: `clamp(20px, ${style.size / 2}px + 2vw, ${style.size}px)`,
            lineHeight: style.lineHeight,
            letterSpacing: `${style.letterSpacing}em`,
            color: "#14140F",
          }}
        >
          {SAMPLE}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[12px] font-medium text-neutral-500">Uses</span>
        <div className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] p-1">
          {(["primary", "secondary"] as const).map((ref) => (
            <button
              key={ref}
              type="button"
              onClick={() => updateStyle({ fontRef: ref })}
              className={`focus-ring rounded-full px-2.5 py-1 text-[11.5px] font-medium capitalize transition-colors ${
                style.fontRef === ref ? "bg-white text-[#14140F] shadow-sm" : "text-neutral-500 hover:text-[#14140F]"
              }`}
            >
              {ref}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11.5px] text-neutral-400">{font.family}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        <SliderRow label="Weight" value={style.weight} min={100} max={900} step={100} unit="" onChange={(v) => updateStyle({ weight: v })} />
        <SliderRow label="Size" value={style.size} min={10} max={140} step={1} unit="px" onChange={(v) => updateStyle({ size: v })} />
        <SliderRow
          label="Line height"
          value={style.lineHeight}
          min={0.9}
          max={1.8}
          step={0.05}
          unit=""
          onChange={(v) => updateStyle({ lineHeight: Math.round(v * 100) / 100 })}
        />
        <SliderRow
          label="Tracking"
          value={style.letterSpacing}
          min={-0.05}
          max={0.1}
          step={0.01}
          unit="em"
          onChange={(v) => updateStyle({ letterSpacing: Math.round(v * 100) / 100 })}
        />
      </div>

      <Textarea
        label="Usage"
        value={style.usage}
        onChange={(e) => updateStyle({ usage: e.target.value })}
        rows={2}
        placeholder="Where this style is used"
      />
    </div>
  );
}
