"use client";

import { motion, Variants } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { SANS_STACK } from "@/lib/fonts";
import { isLight } from "@/lib/color";
import { staggerContainer, EASE_OUT } from "@/lib/motion";
import { GrainOverlay } from "../ui/GrainOverlay";

const DARK_INK = "#14140F";
const LIGHT_INK = "#F6F4EE";

/** Studio's headline gets a heavier, snappier spring than the shared kineticWord/popIn —
 *  this template's personality is confidence, so the reveal should feel like a pop, not a drift. */
const wordPop: Variants = {
  hidden: { opacity: 0, y: "115%", rotate: -3 },
  visible: { opacity: 1, y: "0%", rotate: 0, transition: { type: "spring", stiffness: 420, damping: 24 } },
};

const fadeChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Studio's cover: a full-bleed photo (or a solid brand-primary fallback) topped with a bold,
 *  opaque brand-accent panel sliding up from the bottom third — a confident pitch-deck cover,
 *  not a quiet editorial one. Large drifting brand-tone glow blobs keep the panel from reading
 *  as a flat color fill, and the headline pops in word-by-word with a heavy spring. */
export function StudioHero({ data }: { data: BrandData }) {
  const accentHex = data.colors.find((c) => c.role === "accent")?.hex ?? data.colors.find((c) => c.role === "primary")?.hex ?? "#1D1D1B";
  const onAccent = isLight(accentHex) ? DARK_INK : LIGHT_INK;
  const words = data.name.split(" ");

  return (
    <header className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        {data.coverImage ? (
          <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full" />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: "var(--brand-primary)" }} />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "var(--brand-accent)" }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -left-1/4 h-[70vw] w-[70vw] blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--brand-secondary), transparent 70%)", opacity: 0.4 }}
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            borderRadius: [
              "42% 58% 65% 35% / 45% 40% 60% 55%",
              "58% 42% 38% 62% / 55% 62% 38% 45%",
              "42% 58% 65% 35% / 45% 40% 60% 55%",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -bottom-2/3 h-[55vw] w-[55vw] blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--brand-primary), transparent 70%)", opacity: 0.35 }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            borderRadius: [
              "63% 37% 30% 70% / 50% 45% 55% 50%",
              "35% 65% 60% 40% / 40% 55% 45% 60%",
              "63% 37% 30% 70% / 50% 45% 55% 50%",
            ],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <GrainOverlay opacity={0.05} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08, 0.15)}
          className="relative flex flex-col items-start gap-5 px-6 py-14 sm:px-12 sm:py-20"
        >
          <motion.span
            variants={fadeChild}
            className="rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: SANS_STACK, color: onAccent, borderColor: `color-mix(in srgb, ${onAccent} 40%, transparent)` }}
          >
            {data.industry || "Brand Guidelines"}
          </motion.span>

          <div className="relative">
            <p
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 scale-110 text-[56px] leading-[0.92] font-black uppercase tracking-tight blur-2xl select-none sm:text-[104px]"
              style={{ fontFamily: SANS_STACK, color: "var(--brand-secondary)", opacity: 0.55 }}
            >
              {data.name}
            </p>
            <h1
              className="text-[56px] leading-[0.92] font-black uppercase tracking-tight sm:text-[104px]"
              style={{ fontFamily: SANS_STACK, color: onAccent }}
            >
              {words.map((word, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-top last:mr-0">
                  <motion.span variants={wordPop} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {data.essence && (
            <motion.span
              variants={fadeChild}
              className="rounded-full px-4 py-2 text-[14px] font-semibold sm:text-[16px]"
              style={{ fontFamily: SANS_STACK, backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }}
            >
              {data.essence}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}
