"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrandData, BrandValue } from "@/lib/types";
import { FieldSection } from "./FieldSection";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

/** Field-only value card — a folded-notebook-corner accent that unfolds on hover, in the value's own
 *  rotating brand color, instead of a plain bordered tile. */
function ValueCard({ value, i }: { value: BrandValue; i: number }) {
  const [hovered, setHovered] = useState(false);
  const colors = ["var(--brand-accent)", "var(--brand-primary)", "var(--brand-secondary)"];
  const color = colors[i % colors.length];

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: -2, y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative overflow-hidden rounded-[var(--radius-small)] border-2 p-6"
      style={{ borderColor: "var(--brand-text)", backgroundColor: "var(--brand-background)", boxShadow: `4px 4px 0 0 ${color}` }}
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={{ clipPath: hovered ? "polygon(58% 0%, 100% 0%, 100% 42%)" : "polygon(88% 0%, 100% 0%, 100% 12%)" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: color }}
      />
      <div className="relative">
        <div
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border-2 text-[12px] font-semibold"
          style={{ borderColor: "var(--brand-text)", color: "var(--brand-text)" }}
        >
          {value.icon || String(i + 1).padStart(2, "0")}
        </div>
        <p className="text-[17px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
          {value.name}
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FieldValuesSection({ data }: { data: BrandData }) {
  return (
    <FieldSection
      id="values"
      index="06"
      title="Values"
      subtitle="What this brand won't compromise on."
      component={
        data.values.length === 0 ? (
          <p style={{ color: "var(--brand-muted)" }}>No values defined yet.</p>
        ) : (
          <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="grid gap-6 sm:grid-cols-2">
            {data.values.map((v, i) => (
              <ValueCard key={v.id} value={v} i={i} />
            ))}
          </motion.div>
        )
      }
      copy={<p>Every value here is a line this brand won&apos;t cross for growth.</p>}
    />
  );
}
