"use client";

import { motion } from "framer-motion";
import { BrandData, BrandValue } from "@/lib/types";
import { MeadowSection } from "./MeadowSection";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

const ROTATION = ["var(--brand-accent)", "var(--brand-primary)", "color-mix(in srgb, var(--brand-secondary) 70%, var(--brand-text) 30%)"];

function ValueCard({ value, i }: { value: BrandValue; i: number }) {
  const color = ROTATION[i % ROTATION.length];
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="rounded-[18px] p-6" style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 60%, white)" }}>
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold" style={{ backgroundColor: `color-mix(in srgb, ${color} 22%, white)`, color: "var(--brand-text)" }}>
        {value.icon || String(i + 1).padStart(2, "0")}
      </div>
      <p className="text-[16px] italic" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
        {value.name}
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
        {value.description}
      </p>
    </motion.div>
  );
}

export function MeadowValuesSection({ data }: { data: BrandData }) {
  return (
    <MeadowSection
      id="values"
      index="06"
      title="Values"
      subtitle="What the brand won't compromise on."
      component={
        data.values.length === 0 ? (
          <p style={{ color: "var(--brand-muted)" }}>No values defined yet.</p>
        ) : (
          <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="grid gap-5 sm:grid-cols-2">
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
