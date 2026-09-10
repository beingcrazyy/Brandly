"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { MONO_STACK } from "@/lib/fonts";

const TAG_COLORS = [
  "var(--brand-accent)",
  "var(--brand-primary)",
  // A brand's secondary is often a pale near-background tint (a swatch, not a shadow color) — mixing
  // in some text ink keeps this rotation slot visible as a hard shadow regardless of how pale it is.
  "color-mix(in srgb, var(--brand-secondary) 65%, var(--brand-text) 35%)",
];

/** Rotates the brand's own primary/secondary/accent across the 9 waypoints instead of one fixed
 *  accent — stays inside the brand's own palette while reading as more colorful than a single hue. */
function tagColor(index: string): string {
  const n = parseInt(index, 10) || 1;
  return TAG_COLORS[(n - 1) % TAG_COLORS.length];
}

/** Field's signature surface: an opaque "paper" card with a crisp, full-opacity ink border and a
 *  hard, unblurred offset shadow drawn in the section's rotating brand color — a field-notebook
 *  page, not glass or a soft hairline. Waypoint tag + display-font headline sit above; the component
 *  stages inside the hard-shadow card; copy sits underneath in a quieter, shadowless card. */
export function FieldSection({
  id,
  index,
  title,
  subtitle,
  component,
  copy,
}: {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  component: React.ReactNode;
  copy: React.ReactNode;
}) {
  const accent = tagColor(index);

  return (
    <section id={id} className="relative scroll-mt-24 px-6 py-20 sm:px-10 sm:py-28 lg:px-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(0.1)}
        className="relative flex flex-col"
      >
        <motion.div
          variants={fadeUp}
          className="mb-5 flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase"
          style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}
        >
          <span
            className="rounded-[4px] border-2 px-2.5 py-1"
            style={{
              borderColor: "var(--brand-text)",
              backgroundColor: "var(--brand-background)",
              color: "var(--brand-text)",
              boxShadow: `3px 3px 0 0 ${accent}`,
            }}
          >
            WP-{index}
          </span>
          <span>{title}</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-[34px] leading-[1.08] font-medium sm:text-[46px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
        >
          {subtitle}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          whileHover={{ x: -2, y: -2, boxShadow: `8px 8px 0 0 ${accent}` }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="mt-12 rounded-[var(--radius-small)] border-2 p-6 sm:p-10"
          style={{
            borderColor: "var(--brand-text)",
            backgroundColor: "var(--brand-background)",
            boxShadow: `6px 6px 0 0 ${accent}`,
          }}
        >
          {component}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 rounded-[var(--radius-small)] border p-6 text-[15px] leading-relaxed sm:p-8"
          style={{
            borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--brand-text) 3%, var(--brand-background))",
            color: "var(--brand-muted)",
            fontFamily: "var(--font-secondary)",
          }}
        >
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
