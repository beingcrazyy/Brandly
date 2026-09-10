"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AudienceProfile, BrandData } from "@/lib/types";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED } from "./summitTheme";

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
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-3, 3]), { stiffness: 150, damping: 20 });

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

  const ink15 = "color-mix(in srgb, " + SUMMIT_INK + " 15%, transparent)";

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 1200 }} className="mx-auto mt-14 w-full max-w-2xl">
      <motion.div style={{ rotateX, rotateY }}>
        <SummitSpecPanel className="p-8 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b pb-6" style={{ fontFamily: MONO_STACK, borderColor: ink15 }}>
            <div>
              <p className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                {profile.name}
              </p>
              <p className="mt-2 text-xs tracking-widest uppercase" style={{ color: SUMMIT_INK_FAINT }}>
                Occupation: <span style={{ color: SUMMIT_INK_MUTED }}>{profile.occupation}</span>
              </p>
              <p className="mt-1 text-xs tracking-widest uppercase" style={{ color: SUMMIT_INK_FAINT }}>
                Location: <span style={{ color: SUMMIT_INK_MUTED }}>{profile.location}</span>
              </p>
            </div>
            <span className="tabular-nums border px-3 py-1 text-xs" style={{ borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", color: SUMMIT_INK }}>
              AGE {profile.ageRange}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-1 border-b pb-6" style={{ borderColor: ink15 }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="focus-ring relative px-3 py-1.5 text-xs tracking-wide uppercase transition-colors"
                style={{ fontFamily: MONO_STACK, color: tab === t.id ? SUMMIT_INK : SUMMIT_INK_FAINT }}
              >
                {tab === t.id && <motion.span layoutId="summit-audience-tab-brackets" className="absolute inset-0 border" style={{ borderColor: "var(--brand-accent)" }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">[{t.label}]</span>
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[110px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base leading-relaxed sm:text-lg"
                style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}
              >
                {profile[tab]}
              </motion.p>
            </AnimatePresence>
          </div>
        </SummitSpecPanel>
      </motion.div>
    </div>
  );
}

export function SummitAudienceSection({ data }: { data: BrandData }) {
  return (
    <section id="audience" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 05" eyebrow="Audience" title="Who this all has to work for." />
      <AudienceCard profile={data.audience.primary} />
    </section>
  );
}
