"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SummitSpecPanel } from "./SummitSpecPanel";
import { SummitSectionHeading } from "./SummitSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { springIn, staggerContainer, staggerItem } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

// BrandData doesn't carry the brand's own map coordinate (only competitors do) — defaults to a
// distinct, deliberately "up and away from the pack" position, matching the source project exactly.
const BRAND_POSITION = { x: 50, y: 20 };
const TICKS = Array.from({ length: 11 }, (_, i) => i * 10);

export function SummitPositioningSection({ data }: { data: BrandData }) {
  const { positioning } = data;
  const [activeId, setActiveId] = useState<string | "brand" | null>(null);
  const [hoverId, setHoverId] = useState<string | "brand" | null>(null);

  const activeCompetitor = positioning.competitors.find((c) => c.id === activeId);
  const ink25 = "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)";
  const ink30 = "color-mix(in srgb, " + SUMMIT_INK + " 30%, transparent)";
  const ink10 = "color-mix(in srgb, " + SUMMIT_INK + " 10%, transparent)";
  const ink50 = "color-mix(in srgb, " + SUMMIT_INK + " 50%, transparent)";

  return (
    <section id="positioning" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <SummitSectionHeading plate="FIG. 02" eyebrow="Positioning" title="Where the brand stands, next to who else is standing there." description={positioning.statement} />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-0 border" style={{ borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET }} />

          {TICKS.map((t) => (
            <span key={`b-${t}`} className="absolute bottom-0 h-2 w-px" style={{ left: `${t}%`, backgroundColor: ink30 }} />
          ))}
          {TICKS.map((t) => (
            <span key={`l-${t}`} className="absolute left-0 h-px w-2" style={{ top: `${t}%`, backgroundColor: ink30 }} />
          ))}

          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2" style={{ backgroundColor: ink10 }} />
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ backgroundColor: ink10 }} />

          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
            Emotional
          </span>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
            Functional
          </span>
          <span className="absolute top-1/2 left-0 -translate-x-[calc(100%+0.75rem)] -translate-y-1/2 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
            Established
          </span>
          <span className="absolute top-1/2 right-0 translate-x-[calc(100%+0.75rem)] -translate-y-1/2 text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
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
                <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-transform duration-150 hover:scale-125" style={{ borderColor: ink50 }}>
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ink50 }} />
                </span>
                <AnimatePresence>
                  {hoverId === c.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-1/2 mt-2 -translate-x-1/2 border px-2 py-1 text-[10px] whitespace-nowrap"
                      style={{ fontFamily: MONO_STACK, borderColor: ink25, backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}
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
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: "var(--brand-accent)" }}>
                <span className="absolute h-full w-px" style={{ backgroundColor: "var(--brand-accent)" }} />
                <span className="absolute h-px w-full" style={{ backgroundColor: "var(--brand-accent)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand-accent)" }} />
              </span>
              <AnimatePresence>
                {hoverId === "brand" && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="tabular-nums absolute top-full left-1/2 mt-2 -translate-x-1/2 border px-2 py-1 text-[10px] whitespace-nowrap"
                    style={{ fontFamily: MONO_STACK, borderColor: "var(--brand-accent)", backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}
                  >
                    {data.name} · {BRAND_POSITION.x},{BRAND_POSITION.y}
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
                <SummitSpecPanel accent className="space-y-4 p-8">
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                    {data.name} — full reasoning
                  </p>
                  <Detail label="Category" value={positioning.category} />
                  <Detail label="Differentiator" value={positioning.differentiator} />
                  <Detail label="Competitive advantage" value={positioning.competitiveAdvantage} />
                  <Detail label="Reason to believe" value={positioning.reasonToBelieve} />
                </SummitSpecPanel>
              </motion.div>
            ) : activeCompetitor ? (
              <motion.div key={activeCompetitor.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <SummitSpecPanel className="p-8">
                  <p className="tabular-nums text-xs tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                    {activeCompetitor.name} · {activeCompetitor.x},{activeCompetitor.y}
                  </p>
                  <p className="mt-4" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}>
                    Positioned at the {activeCompetitor.y < 50 ? "emotional" : "functional"}, {activeCompetitor.x < 50 ? "established" : "disruptive"} corner of the map — the space {data.name} is
                    deliberately not competing in.
                  </p>
                </SummitSpecPanel>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SummitSpecPanel className="flex h-full min-h-[260px] items-center p-8">
                  <p style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK_FAINT }}>Click a point on the map for the full reasoning behind it.</p>
                </SummitSpecPanel>
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
      <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
        {label}
      </p>
      <p className="mt-1" style={{ fontFamily: "var(--font-secondary)", color: SUMMIT_INK }}>
        {value}
      </p>
    </div>
  );
}
