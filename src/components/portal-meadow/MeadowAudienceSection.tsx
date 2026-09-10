"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AudienceProfile, BrandData } from "@/lib/types";
import { MeadowSection } from "./MeadowSection";
import { SANS_STACK } from "@/lib/fonts";
import { SPRING_SNAPPY } from "@/lib/motion";

type TabKey = "needs" | "problems" | "motivations" | "behaviors";
const TABS: { key: TabKey; label: string }[] = [
  { key: "needs", label: "Goals" },
  { key: "problems", label: "Frustrations" },
  { key: "motivations", label: "Motivations" },
  { key: "behaviors", label: "Day in the life" },
];

function AudienceCard({ profile }: { profile: AudienceProfile }) {
  const [tab, setTab] = useState<TabKey>("needs");
  const line = "color-mix(in srgb, var(--brand-text) 10%, transparent)";

  return (
    <div className="mx-auto w-full max-w-xl rounded-[20px] p-6 sm:p-8" style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 70%, white)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-6" style={{ borderColor: line }}>
        <div>
          <p className="text-[19px] italic" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {profile.name || "Untitled audience"}
          </p>
          <p className="mt-1 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
            {[profile.occupation, profile.location].filter(Boolean).join(" · ")}
          </p>
        </div>
        {profile.ageRange && (
          <span className="rounded-full px-3 py-1 text-[11px]" style={{ fontFamily: SANS_STACK, backgroundColor: "color-mix(in srgb, var(--brand-secondary) 40%, white)", color: "var(--brand-text)" }}>
            {profile.ageRange}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b pb-6" style={{ borderColor: line }}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button key={t.key} type="button" onClick={() => setTab(t.key)} className="focus-ring relative rounded-full px-4 py-2 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: active ? "var(--brand-text)" : "var(--brand-muted)" }}>
              {active && <motion.span layoutId="meadow-audience-tab" className="absolute inset-0 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 22%, white)" }} transition={SPRING_SNAPPY} />}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.p key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
            {profile[tab] || "Not defined yet."}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MeadowAudienceSection({ data }: { data: BrandData }) {
  return (
    <MeadowSection
      id="audience"
      index="05"
      title="Audience"
      subtitle="Who this all has to work for."
      component={<AudienceCard profile={data.audience.primary} />}
      copy={<p>{data.audience.primary.needs}</p>}
    />
  );
}
