"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { BrandData } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, kineticWord } from "@/lib/motion";

/** Field's Messaging stage: the value proposition set kinetically, word by word, in the brand's own
 *  display font, followed by a stack of hard-shadow accordions for each pillar. */
function MessagingBoard({ data }: { data: BrandData }) {
  const [open, setOpen] = useState<string | null>(data.messaging.pillars[0]?.id ?? null);
  const words = data.messaging.valueProposition.split(" ").filter(Boolean);

  return (
    <div className="flex flex-col gap-12">
      {words.length > 0 && (
        <motion.p
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap gap-x-2.5 gap-y-1 text-[26px] leading-[1.2] sm:text-[32px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
        >
          {words.map((word, i) => (
            <span key={word + i} className="overflow-hidden pb-1">
              <motion.span custom={i} variants={kineticWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
      )}

      <div className="space-y-3">
        {data.messaging.pillars.map((pillar, i) => {
          const isOpen = open === pillar.id;
          return (
            <div
              key={pillar.id}
              className="overflow-hidden rounded-[var(--radius-small)] border-2"
              style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: `3px 3px 0 0 ${isOpen ? "var(--brand-accent)" : "var(--brand-text)"}` }}
            >
              <button type="button" onClick={() => setOpen(isOpen ? null : pillar.id)} className="focus-ring flex w-full items-center gap-5 px-6 py-5 text-left" aria-expanded={isOpen}>
                <span className="text-[11px]" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[18px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                  {pillar.title}
                </span>
                <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.3 }}>
                  <Plus size={18} style={{ color: "var(--brand-text)" }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
                    <p className="px-6 pb-5 pl-10 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                      {pillar.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FieldMessagingSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="messaging"
      index="08"
      title="Messaging"
      subtitle="What we say, and why it holds up."
      component={<MessagingBoard data={data} />}
      copy={<p>Click a pillar for the full reasoning behind it.</p>}
    />
  );
}
