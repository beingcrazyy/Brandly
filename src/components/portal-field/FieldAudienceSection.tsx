"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AudienceProfile, BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { useTilt } from "@/lib/useTilt";
import { SPRING_SNAPPY } from "@/lib/motion";

type TabKey = "needs" | "problems" | "motivations" | "behaviors";
const TABS: { key: TabKey; label: string }[] = [
  { key: "needs", label: "Goals" },
  { key: "problems", label: "Frustrations" },
  { key: "motivations", label: "Motivations" },
  { key: "behaviors", label: "Day in the life" },
];

/** Field's Audience stage: a pointer-tilted field-notebook card, its header a dashed rule away from
 *  a tabbed readout of the persona's own words. */
function AudienceCard({ profile }: { profile: AudienceProfile }) {
  const [tab, setTab] = useState<TabKey>("needs");
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(4);

  return (
    <div className="mx-auto w-full max-w-xl" style={{ perspective: 1200 }}>
      <motion.div
        ref={ref as unknown as React.Ref<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="rounded-[var(--radius-small)] p-6 will-change-transform sm:p-8"
      >
        <div
          className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-dashed pb-6"
          style={{ borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)" }}
        >
          <div>
            <p className="text-[22px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
              {profile.name || "Untitled audience"}
            </p>
            <p className="mt-1 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
              {[profile.occupation, profile.location].filter(Boolean).join(" · ")}
            </p>
          </div>
          {profile.ageRange && (
            <span
              className="rounded-full border-2 px-3 py-1 text-[11px]"
              style={{ fontFamily: MONO_STACK, borderColor: "var(--brand-text)", backgroundColor: "color-mix(in srgb, var(--brand-secondary) 40%, var(--brand-background))", color: "var(--brand-text)" }}
            >
              {profile.ageRange}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b-2 border-dashed pb-6" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)" }}>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="focus-ring relative rounded-full px-4 py-2 text-[13px]"
                style={{ fontFamily: "var(--font-secondary)", color: active ? "var(--brand-text)" : "var(--brand-muted)" }}
              >
                {active && (
                  <motion.span
                    layoutId="field-audience-tab"
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: "var(--brand-text)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 28%, transparent)" }}
                    transition={SPRING_SNAPPY}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] leading-relaxed"
              style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}
            >
              {profile[tab] || "Not defined yet."}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function FieldAudienceSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="audience"
      index="05"
      title="Audience"
      subtitle="Who this brand is built for."
      component={<AudienceCard profile={data.audience.primary} />}
      copy={<p>{data.audience.primary.needs}</p>}
    />
  );
}
