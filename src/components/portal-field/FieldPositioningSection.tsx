"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData, Competitor } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { SPRING_SOFT, glowPulse } from "@/lib/motion";

/** Field's Positioning stage: a hard-bordered quadrant map, axis labels pulled from the brand's own
 *  personality scales (not fixed emotional/functional labels) — click any dot for the reasoning. */
function PositioningQuadrant({ data }: { data: BrandData }) {
  const [activeId, setActiveId] = useState<string | "own" | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [xScale, yScale] = data.personalityScales;
  const competitors = data.positioning.competitors;

  if (!xScale || !yScale) {
    return <p className="text-[14px]" style={{ color: "var(--brand-muted)" }}>Add at least two personality scales to plot a positioning map.</p>;
  }

  const activeCompetitor = competitors.find((c) => c.id === activeId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-0 rounded-[var(--radius-small)] border-2" style={{ borderColor: "var(--brand-text)", boxShadow: "4px 4px 0 0 var(--brand-primary)" }} />
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 18%, transparent)" }} />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 18%, transparent)" }} />

        {[
          { text: yScale.leftLabel, className: "-top-7 left-1/2 -translate-x-1/2" },
          { text: yScale.rightLabel, className: "-bottom-7 left-1/2 -translate-x-1/2" },
          { text: xScale.leftLabel, className: "top-1/2 left-0 -translate-x-[calc(100%+0.6rem)] -translate-y-1/2" },
          { text: xScale.rightLabel, className: "top-1/2 right-0 translate-x-[calc(100%+0.6rem)] -translate-y-1/2" },
        ].map((l) => (
          <span key={l.className} className={`absolute text-[10px] tracking-[0.16em] uppercase ${l.className}`} style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
            {l.text}
          </span>
        ))}

        {competitors.map((c: Competitor) => (
          <button
            key={c.id}
            type="button"
            onMouseEnter={() => setHoverId(c.id)}
            onMouseLeave={() => setHoverId((v) => (v === c.id ? null : v))}
            onClick={() => setActiveId(c.id)}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="focus-ring absolute -translate-x-1/2 -translate-y-1/2"
            aria-label={c.name}
          >
            <span
              className="block h-3 w-3 rounded-full border-2 transition-transform duration-200 hover:scale-125"
              style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)" }}
            />
            {hoverId === c.id && (
              <span
                className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[4px] border-2 px-2 py-1 text-[10px] whitespace-nowrap"
                style={{ fontFamily: MONO_STACK, borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", color: "var(--brand-text)", boxShadow: "2px 2px 0 0 var(--brand-text)" }}
              >
                {c.name}
              </span>
            )}
          </button>
        ))}

        <button
          type="button"
          onMouseEnter={() => setHoverId("own")}
          onMouseLeave={() => setHoverId((v) => (v === "own" ? null : v))}
          onClick={() => setActiveId("own")}
          style={{ left: `${xScale.value}%`, top: `${yScale.value}%` }}
          className="focus-ring absolute -translate-x-1/2 -translate-y-1/2"
          aria-label={data.name}
        >
          <span className="relative block h-4 w-4 rounded-full border-2" style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-accent)" }}>
            <motion.span
              variants={glowPulse}
              animate="visible"
              className="absolute -inset-1.5 rounded-full border"
              style={{ borderColor: "var(--brand-accent)" }}
            />
          </span>
          {hoverId === "own" && (
            <span
              className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[4px] border-2 px-2 py-1 text-[10px] font-semibold whitespace-nowrap"
              style={{ fontFamily: MONO_STACK, borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", color: "var(--brand-text)", boxShadow: "2px 2px 0 0 var(--brand-accent)" }}
            >
              {data.name}
            </span>
          )}
        </button>
      </div>

      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          {activeId === "own" ? (
            <motion.div key="own" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={SPRING_SOFT}>
              <Detail label="Differentiator" value={data.positioning.differentiator} accent />
              <Detail label="Reason to believe" value={data.positioning.reasonToBelieve} />
            </motion.div>
          ) : activeCompetitor ? (
            <motion.div key={activeCompetitor.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={SPRING_SOFT}>
              <Detail
                label={activeCompetitor.name}
                value={`Positioned toward ${activeCompetitor.y < 50 ? yScale.leftLabel : yScale.rightLabel}, ${activeCompetitor.x < 50 ? xScale.leftLabel : xScale.rightLabel} — the space ${data.name} isn't competing in.`}
              />
            </motion.div>
          ) : (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] italic" style={{ color: "var(--brand-muted)" }}>
              Click a point on the map for the reasoning behind it.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Detail({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="mb-3 rounded-[var(--radius-small)] border-2 p-5"
      style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: `3px 3px 0 0 ${accent ? "var(--brand-accent)" : "var(--brand-text)"}` }}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
        {label}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
        {value || "Not defined yet."}
      </p>
    </div>
  );
}

export function FieldPositioningSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="positioning"
      index="02"
      title="Positioning"
      subtitle="Where this brand sits, relative to the field."
      component={<PositioningQuadrant data={data} />}
      copy={<p>{data.positioning.statement}</p>}
    />
  );
}
