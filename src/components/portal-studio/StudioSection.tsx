"use client";

import { motion, Variants } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT_ONCE, SPRING_SNAPPY } from "@/lib/motion";
import { SANS_STACK } from "@/lib/fonts";
import { BrandData } from "@/lib/types";
import { isLight } from "@/lib/color";
import { GrainOverlay } from "../ui/GrainOverlay";

/** Near-black / near-white ink pair for text placed on an arbitrary brand color (primary/accent) —
 *  mirrors the same contrast pattern ColorSystem.tsx already uses for swatch labels, since
 *  var(--brand-text)/var(--brand-muted) are only calibrated for contrast against var(--brand-background). */
const DARK_INK = "#14140F";
const LIGHT_INK = "#F6F4EE";

/** Slight tilt-and-pop settle for the component "stage" card — Studio's whole personality is
 *  bold and confident, so its stage shouldn't just fade in, it should land. */
const stagePop: Variants = {
  hidden: { opacity: 0, scale: 0.92, rotate: -2.5 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 240, damping: 20 } },
};

/** Studio's signature layout: full-bleed section bands that alternate between the brand background
 *  and a bold, opaque brand-primary "tint" band, with the interactive component staged on a large,
 *  elevated, always-light-surfaced card so it stays legible regardless of the section's own backdrop.
 *  Large drifting brand-tone glow blobs sit behind each band so the alternating bands feel alive
 *  rather than a flat color fill. */
export function StudioSection({
  id,
  index,
  title,
  subtitle,
  component,
  copy,
  tint = false,
  data,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
  copy: React.ReactNode;
  tint?: boolean;
  data: BrandData;
}) {
  const primaryHex = data.colors.find((c) => c.role === "primary")?.hex ?? "#1D1D1B";
  const accentHex = data.colors.find((c) => c.role === "accent")?.hex ?? primaryHex;
  const onPrimary = isLight(primaryHex) ? DARK_INK : LIGHT_INK;
  const onAccent = isLight(accentHex) ? DARK_INK : LIGHT_INK;

  const headingColor = tint ? onPrimary : "var(--brand-text)";
  const subtitleColor = tint ? `color-mix(in srgb, ${onPrimary} 70%, transparent)` : "var(--brand-muted)";

  return (
    <section
      id={id}
      className="relative scroll-mt-20 overflow-hidden px-6 sm:px-10 lg:px-16"
      style={{
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        backgroundColor: tint ? "var(--brand-primary)" : "var(--brand-background)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-1/5 h-[50vw] w-[50vw] blur-3xl"
        style={{
          background: `radial-gradient(ellipse, ${tint ? "var(--brand-accent)" : "var(--brand-primary)"}, transparent 70%)`,
          opacity: tint ? 0.28 : 0.14,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          borderRadius: [
            "44% 56% 62% 38% / 42% 48% 52% 58%",
            "60% 40% 40% 60% / 55% 60% 40% 45%",
            "44% 56% 62% 38% / 42% 48% 52% 58%",
          ],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/5 -bottom-1/3 h-[42vw] w-[42vw] blur-3xl"
        style={{
          background: `radial-gradient(ellipse, ${tint ? "var(--brand-secondary)" : "var(--brand-accent)"}, transparent 70%)`,
          opacity: tint ? 0.24 : 0.12,
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -25, 0],
          borderRadius: [
            "61% 39% 35% 65% / 48% 42% 58% 52%",
            "38% 62% 58% 42% / 40% 58% 42% 60%",
            "61% 39% 35% 65% / 48% 42% 58% 52%",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <GrainOverlay opacity={0.05} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(0.1)}
        className="relative flex flex-col items-start"
      >
        <div className="mb-8 flex flex-col items-start gap-3">
          <motion.span
            variants={fadeUp}
            className="rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.24em] uppercase"
            style={{ fontFamily: SANS_STACK, backgroundColor: "var(--brand-accent)", color: onAccent }}
          >
            {index}
          </motion.span>
          <div className="relative">
            <p
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 scale-110 text-[40px] leading-[0.98] font-black uppercase tracking-tight blur-2xl select-none sm:text-[56px]"
              style={{ fontFamily: SANS_STACK, color: tint ? "var(--brand-secondary)" : "var(--brand-accent)", opacity: 0.45 }}
            >
              {title}
            </p>
            <motion.h2
              variants={fadeUp}
              className="text-[40px] leading-[0.98] font-black uppercase tracking-tight sm:text-[56px]"
              style={{ fontFamily: SANS_STACK, color: headingColor }}
            >
              {title}
            </motion.h2>
          </div>
          {subtitle && (
            <motion.p variants={fadeUp} className="max-w-xl text-[16px]" style={{ fontFamily: "var(--font-secondary)", color: subtitleColor }}>
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={stagePop}
          className="w-full rounded-2xl border p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-10"
          style={{
            backgroundColor: "var(--brand-background)",
            borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)",
          }}
        >
          {component}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 max-w-2xl text-[16px] leading-relaxed"
          style={{ fontFamily: "var(--font-secondary)", color: tint ? subtitleColor : "var(--brand-muted)" }}
        >
          {copy}
        </motion.div>
      </motion.div>
    </section>
  );
}
