"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { GrainOverlay } from "../ui/GrainOverlay";
import { MONO_STACK } from "@/lib/fonts";
import { staggerContainer, kineticWord, EASE_OUT } from "@/lib/motion";

/** Field's cover: centered, field-notebook-plain — a hard-shadow industry stamp, the brand's own
 *  display font carrying the name (kinetic word reveal), an italic essence line beneath. The brand's
 *  cover photo (if any) sits low-opacity behind everything, washed out toward the page background so
 *  it reads as a faint field photograph rather than a banner. */
export function FieldHero({ data }: { data: BrandData }) {
  const words = data.name.split(" ");

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {data.coverImage && (
        <div className="absolute inset-0 -z-10">
          <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full opacity-[0.16]" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 0%, var(--brand-background) 85%)" }}
          />
        </div>
      )}
      <GrainOverlay opacity={0.035} />

      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        className="mb-6 rounded-full border-2 px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
        style={{
          fontFamily: MONO_STACK,
          borderColor: "var(--brand-text)",
          backgroundColor: "var(--brand-background)",
          color: "var(--brand-text)",
          boxShadow: "3px 3px 0 0 var(--brand-accent)",
        }}
      >
        {data.industry || "Brand Guidelines"}
      </motion.span>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.09, 0.15)}
        className="flex flex-wrap items-center justify-center gap-x-5 text-[15vw] leading-[0.95] font-medium tracking-tight sm:text-[11vw] lg:text-[9vw]"
        style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden pb-1">
            <motion.span variants={kineticWord} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {data.essence && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 + words.length * 0.05 }}
          className="mt-7 max-w-lg text-[17px] italic sm:text-[19px]"
          style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}
        >
          {data.essence}
        </motion.p>
      )}
    </header>
  );
}
