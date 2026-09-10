"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { springIn, staggerContainer, staggerItem } from "./duskMotion";

// BrandData doesn't carry the brand's own map coordinate (only competitors do) — defaults to a
// distinct, deliberately "up and away from the pack" position, matching the source project exactly.
const BRAND_POSITION = { x: 50, y: 20 };

export function DuskPositioningSection({ data }: { data: BrandData }) {
  const { positioning } = data;
  const [activeId, setActiveId] = useState<string | "brand" | null>(null);
  const [hoverId, setHoverId] = useState<string | "brand" | null>(null);

  const activeCompetitor = positioning.competitors.find((c) => c.id === activeId);

  return (
    <section id="positioning" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-02" eyebrow="Positioning" title="Where the brand stands, next to who else is standing there." description={positioning.statement} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.02]" />
          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/10" />
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/10" />

          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
            Emotional
          </span>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
            Functional
          </span>
          <span className="absolute top-1/2 left-0 -translate-x-[calc(100%+0.75rem)] -translate-y-1/2 text-[10px] tracking-widest text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
            Established
          </span>
          <span className="absolute top-1/2 right-0 translate-x-[calc(100%+0.75rem)] -translate-y-1/2 text-[10px] tracking-widest text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
            Disruptive
          </span>

          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }} className="absolute inset-0">
            {positioning.competitors.map((c) => (
              <motion.button
                key={c.id}
                variants={staggerItem}
                onMouseEnter={() => setHoverId(c.id)}
                onMouseLeave={() => setHoverId((v) => (v === c.id ? null : v))}
                onClick={() => setActiveId(c.id)}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className="focus-ring absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={c.name}
              >
                <span className="block h-3 w-3 rounded-full transition-transform duration-200 hover:scale-125" style={{ backgroundColor: "color-mix(in srgb, var(--brand-neutral) 70%, transparent)", boxShadow: "0 0 0 4px color-mix(in srgb, var(--brand-neutral) 10%, transparent)" }} />
                <AnimatePresence>
                  {hoverId === c.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md border border-white/10 px-2 py-1 text-[10px] whitespace-nowrap"
                      style={{ fontFamily: MONO_STACK, backgroundColor: "rgba(14,16,21,0.9)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {c.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}

            <motion.button
              variants={springIn}
              onMouseEnter={() => setHoverId("brand")}
              onMouseLeave={() => setHoverId((v) => (v === "brand" ? null : v))}
              onClick={() => setActiveId("brand")}
              style={{ left: `${BRAND_POSITION.x}%`, top: `${BRAND_POSITION.y}%` }}
              className="focus-ring absolute -translate-x-1/2 -translate-y-1/2"
              aria-label={data.name}
            >
              <span className="relative block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--brand-accent)", boxShadow: "0 0 24px -6px var(--brand-accent)" }}>
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <AnimatePresence>
                {hoverId === "brand" && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md border px-2 py-1 text-[10px] whitespace-nowrap"
                    style={{ fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, var(--brand-accent) 30%, transparent)", backgroundColor: "rgba(14,16,21,0.9)", color: "var(--brand-accent)" }}
                  >
                    {data.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {activeId === "brand" ? (
              <motion.div key="brand-detail" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <DuskGlassPanel className="space-y-4 p-8">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-accent)" }}>
                    {data.name} — full reasoning
                  </p>
                  <Detail label="Category" value={positioning.category} />
                  <Detail label="Differentiator" value={positioning.differentiator} />
                  <Detail label="Competitive advantage" value={positioning.competitiveAdvantage} />
                  <Detail label="Reason to believe" value={positioning.reasonToBelieve} />
                </DuskGlassPanel>
              </motion.div>
            ) : activeCompetitor ? (
              <motion.div key={activeCompetitor.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <DuskGlassPanel className="p-8">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "rgba(255,255,255,0.5)" }}>
                    {activeCompetitor.name}
                  </p>
                  <p className="mt-4" style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.7)" }}>
                    Positioned at the {activeCompetitor.y < 50 ? "emotional" : "functional"}, {activeCompetitor.x < 50 ? "established" : "disruptive"} corner of the map — the space {data.name} is
                    deliberately not competing in.
                  </p>
                </DuskGlassPanel>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DuskGlassPanel className="flex h-full min-h-[260px] items-center p-8">
                  <p style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.4)" }}>Click a point on the map for the full reasoning behind it.</p>
                </DuskGlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: "rgba(255,255,255,0.4)" }}>
        {label}
      </p>
      <p className="mt-1" style={{ fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.75)" }}>
        {value}
      </p>
    </div>
  );
}
