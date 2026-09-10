"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { SANS_STACK } from "@/lib/fonts";
import { EASE_OUT } from "@/lib/motion";
import { useTilt } from "@/lib/useTilt";
import { GrainOverlay } from "../ui/GrainOverlay";

const underlineDraw = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: 32, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.35 } },
};

/** Organic (non-circular) blob radii — matches AtelierSection's ambient blooms so the hero and body read as one painterly surface. */
const BLOB_A = "rounded-[62%_38%_55%_45%/45%_58%_42%_55%]";
const BLOB_B = "rounded-[40%_60%_45%_55%/55%_40%_60%_45%]";

/** Atelier's hero: a framed, inset photograph beside (not behind) the name — a boutique portfolio cover, not a full-bleed banner. */
export function AtelierHero({ data }: { data: BrandData }) {
  const { ref: tiltRef, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <header className="relative overflow-hidden px-6 pt-16 pb-16 sm:px-12 sm:pt-24 sm:pb-24">
      {/* Ambient glow blooms + grain, very low opacity, brand-token colored — organically shaped and
          slow-drifting so the backdrop reads as a painterly wash rather than a flat vector glow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute top-1/4 -left-32 h-96 w-96 blur-3xl ${BLOB_A}`}
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 14%, transparent)" }}
          animate={{ x: [0, 22, -10, 0], y: [0, -16, 12, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute -top-24 right-0 h-80 w-80 blur-3xl ${BLOB_B}`}
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-primary) 10%, transparent)" }}
          animate={{ x: [0, -20, 14, 0], y: [0, 14, -10, 0], scale: [1, 0.96, 1.04, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <GrainOverlay opacity={0.04} />

      <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          ref={tiltRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          style={{
            border: "1px solid color-mix(in srgb, var(--brand-accent) 20%, transparent)",
            rotateX,
            rotateY,
            transformPerspective: 900,
          }}
          className="w-full max-w-md flex-shrink-0 overflow-hidden rounded-2xl shadow-[0_30px_70px_-35px_rgba(0,0,0,0.45)] lg:w-[42%]"
        >
          <div className="aspect-[4/5] w-full">
            {data.coverImage ? (
              <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full" />
            ) : (
              <div className="h-full w-full" style={{ backgroundColor: "var(--brand-secondary)" }} />
            )}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="text-[12px] font-medium tracking-[0.2em] uppercase"
            style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}
          >
            {data.industry || "Brand Guidelines"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
            className="mt-3 text-[40px] leading-[1.05] font-semibold sm:text-[56px]"
            style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}
          >
            {data.name}
          </motion.h1>
          <motion.span
            aria-hidden
            variants={underlineDraw}
            className="mt-4 h-[2px] rounded-full"
            style={{ backgroundColor: "var(--brand-accent)" }}
          />
          {data.essence && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
              className="relative isolate mt-4 max-w-md text-[17px] italic before:absolute before:-z-10 before:top-[0.1em] before:left-[-0.5em] before:h-[1.4em] before:w-[60%] before:rounded-[55%_45%_60%_40%/50%_60%_40%_50%] before:bg-[var(--brand-accent)] before:opacity-[0.16] before:blur-lg before:content-[''] sm:text-[19px]"
              style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}
            >
              {data.essence}
            </motion.p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
