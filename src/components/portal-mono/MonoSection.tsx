"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, SPRING_SOFT } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";
import { GrainOverlay } from "../ui/GrainOverlay";

/** Mono's signature layout: the interactive component sits in a hairline-bordered "stage," in full focus — supporting copy comes directly beneath, never beside. */
export function MonoSection({
  id,
  index,
  title,
  subtitle,
  component,
  copy,
  tint = false,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
  copy: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-20 overflow-hidden border-t px-6 sm:px-10 lg:px-16"
      style={{
        borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        backgroundColor: tint ? "color-mix(in srgb, var(--brand-secondary) 40%, var(--brand-background))" : "transparent",
      }}
    >
      {/* Painterly backdrop — a single organically-shaped, slow-drifting color bloom plus fine grain,
          so the "stage" reads as toned/brushed rather than a flat rendered panel */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-1/3 h-[36vw] w-[36vw] opacity-[0.09] blur-[100px]"
        style={{
          background: "var(--brand-primary)",
          borderRadius: "58% 42% 39% 61% / 47% 53% 47% 53%",
        }}
        animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0], rotate: [0, 6, -4, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <GrainOverlay opacity={0.04} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(0.12)}
        className="relative flex flex-col items-center"
      >
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <motion.span variants={fadeUp} className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-accent)" }}>
            {index}
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[30px] leading-tight font-bold sm:text-[38px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={fadeUp} className="max-w-md text-[15px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          whileHover={{ borderColor: "color-mix(in srgb, var(--brand-accent) 45%, transparent)" }}
          transition={SPRING_SOFT}
          className="w-full rounded-[var(--radius-small)] border p-6 sm:p-10"
          style={{ borderColor: "color-mix(in srgb, var(--brand-text) 14%, transparent)" }}
        >
          {component}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 w-full max-w-xl text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
