"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AudienceProfile, BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const TABS = [
  { id: "needs", label: "Goals" },
  { id: "problems", label: "Frustrations" },
  { id: "motivations", label: "Motivations" },
  { id: "behaviors", label: "Day in the life" },
] as const;

function AudienceCard({ profile }: { profile: AudienceProfile }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("needs");
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rx.set((e.clientX - rect.left) / rect.width - 0.5);
    ry.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 1200 }} className="mx-auto mt-14 w-full max-w-2xl">
      <motion.div style={{ rotateX, rotateY }}>
        <DuskGlassPanel className="p-8 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-2xl text-white sm:text-3xl" style={{ fontFamily: "var(--font-primary)" }}>
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-white/50" style={{ fontFamily: "var(--font-secondary)" }}>
                {profile.occupation} · {profile.location}
              </p>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs" style={{ fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, var(--brand-secondary) 30%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-secondary) 10%, transparent)", color: "var(--brand-secondary)" }}>
              {profile.ageRange}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-6">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className="focus-ring relative rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white" style={{ fontFamily: "var(--font-secondary)" }}>
                {tab === t.id && <motion.span layoutId="dusk-audience-tab-pill" className="absolute inset-0 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 20%, transparent)" }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[110px]">
            <AnimatePresence mode="wait">
              <motion.p key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="text-base leading-relaxed text-white/75 sm:text-lg" style={{ fontFamily: "var(--font-secondary)" }}>
                {profile[tab]}
              </motion.p>
            </AnimatePresence>
          </div>
        </DuskGlassPanel>
      </motion.div>
    </div>
  );
}

export function DuskAudienceSection({ data }: { data: BrandData }) {
  return (
    <section id="audience" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-05" eyebrow="Audience" title="Who this all has to work for." />
      <AudienceCard profile={data.audience.primary} />
    </section>
  );
}
