"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { BrandData } from "@/lib/types";
import { DuskGlassPanel } from "./DuskGlassPanel";
import { DuskSectionHeading } from "./DuskSectionHeading";
import { MONO_STACK } from "@/lib/fonts";
import { accordionContent, kineticWord, staggerContainer } from "./duskMotion";

export function DuskMessagingSection({ data }: { data: BrandData }) {
  const [open, setOpen] = useState<string | null>(data.messaging.pillars[0]?.id ?? null);
  const words = data.messaging.valueProposition.split(" ").filter(Boolean);

  return (
    <section id="messaging" className="scroll-mt-24 px-6 py-24 sm:px-12 lg:px-20">
      <DuskSectionHeading waypoint="WP-08" eyebrow="Messaging" title="What the brand actually says." />

      <motion.p variants={staggerContainer(0.04, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mt-12 flex flex-wrap gap-x-3 gap-y-1 text-3xl leading-[1.15] text-white sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-primary)" }}>
        {words.map((word, i) => (
          <span key={word + i} className="overflow-hidden pb-1">
            <motion.span custom={i} variants={kineticWord} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.p>

      <div className="mt-16 space-y-3">
        {data.messaging.pillars.map((pillar, i) => {
          const isOpen = open === pillar.id;
          return (
            <DuskGlassPanel key={pillar.id} className="overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : pillar.id)} className="focus-ring flex w-full items-center gap-5 px-6 py-6 text-left" aria-expanded={isOpen}>
                <span className="text-xs" style={{ fontFamily: MONO_STACK, color: "var(--brand-secondary)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-xl text-white sm:text-2xl" style={{ fontFamily: "var(--font-primary)" }}>
                  {pillar.title}
                </span>
                <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.3 }}>
                  <Plus className="h-5 w-5" style={{ color: "var(--brand-accent)" }} />
                </motion.span>
              </button>
              <motion.div initial={false} animate={isOpen ? "expanded" : "collapsed"} variants={accordionContent} className="overflow-hidden px-6">
                <p className="max-w-2xl pb-6 pl-10 text-white/65" style={{ fontFamily: "var(--font-secondary)" }}>
                  {pillar.description}
                </p>
              </motion.div>
            </DuskGlassPanel>
          );
        })}
      </div>
    </section>
  );
}
