"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT_ONCE, EASE_OUT } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";
import { GrainOverlay } from "../ui/GrainOverlay";

/** Organic (non-circular) blob radii so ambient glows read as painterly blooms rather than perfect discs. */
const BLOB_A = "rounded-[62%_38%_55%_45%/45%_58%_42%_55%]";
const BLOB_B = "rounded-[40%_60%_45%_55%/55%_40%_60%_45%]";

const underlineDraw = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: 32, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 } },
};

/**
 * Atelier's signature layout: the interactive component sits inside a soft, rounded
 * "glass" stage — generous corners, a hairline accent-tinted ring, a soft shadow, and
 * a faint ambient glow/grain behind it — never a hard-edged card. Supporting copy sits
 * beneath in a narrow column; the first line reads as an italic pull-quote that settles
 * in just after the heading, with anything after it in normal weight.
 */
export function AtelierSection({
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
      className="relative scroll-mt-20 overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        backgroundColor: tint ? "color-mix(in srgb, var(--brand-secondary) 30%, var(--brand-background))" : "var(--brand-background)",
      }}
    >
      {/* Ambient glow blooms + grain, very low opacity, brand-token colored — organically shaped and
          slow-drifting so the backdrop reads as a painterly wash rather than a flat vector glow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute -top-24 -left-24 h-72 w-72 blur-3xl ${BLOB_A}`}
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 16%, transparent)" }}
          animate={{ x: [0, 24, -8, 0], y: [0, -14, 10, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute -right-24 bottom-0 h-80 w-80 blur-3xl ${BLOB_B}`}
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-primary) 10%, transparent)" }}
          animate={{ x: [0, -18, 12, 0], y: [0, 16, -10, 0], scale: [1, 0.96, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <GrainOverlay opacity={0.04} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={fadeUp}
        className="relative flex flex-col items-center"
      >
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-[11px] font-medium tracking-[0.22em] uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
            {index}
          </span>
          <h2 className="text-[28px] leading-tight font-semibold sm:text-[36px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
            {title}
          </h2>
          <motion.span
            aria-hidden
            variants={underlineDraw}
            className="mt-1 h-[2px] rounded-full"
            style={{ backgroundColor: "var(--brand-accent)" }}
          />
          {subtitle && (
            <p className="mt-2 max-w-md text-[15px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="w-full rounded-3xl p-8 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-12"
          style={{
            border: "1px solid color-mix(in srgb, var(--brand-accent) 25%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--brand-background) 88%, transparent)",
          }}
        >
          {component}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          className="mt-8 w-full max-w-lg text-[15px] leading-relaxed [&>p:first-child]:relative [&>p:first-child]:isolate [&>p:first-child]:mb-3 [&>p:first-child]:text-[18px] [&>p:first-child]:leading-snug [&>p:first-child]:font-normal [&>p:first-child]:text-[var(--brand-text)] [&>p:first-child]:italic [&>p:first-child]:before:absolute [&>p:first-child]:before:-z-10 [&>p:first-child]:before:top-[0.15em] [&>p:first-child]:before:left-[-0.5em] [&>p:first-child]:before:h-[1.5em] [&>p:first-child]:before:w-[65%] [&>p:first-child]:before:rounded-[55%_45%_60%_40%/50%_60%_40%_50%] [&>p:first-child]:before:bg-[var(--brand-accent)] [&>p:first-child]:before:opacity-[0.16] [&>p:first-child]:before:blur-lg [&>p:first-child]:before:content-['']"
          style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}
        >
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
