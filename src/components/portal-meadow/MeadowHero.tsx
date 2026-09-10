"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { SANS_STACK } from "@/lib/fonts";
import { staggerContainer, kineticWord, EASE_OUT } from "@/lib/motion";

/** Meadow's cover: soft drifting color-wash orbs in the brand's own primary/secondary/accent behind
 *  an italic serif wordmark — a dreamy, warm title page rather than a banner or a photo. */
export function MeadowHero({ data }: { data: BrandData }) {
  const words = data.name.split(" ");

  return (
    <header className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 left-[8%] h-[42vw] w-[42vw] rounded-full blur-[90px]"
          style={{ backgroundColor: "var(--brand-primary)", opacity: 0.3 }}
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-1/3 right-[5%] h-[38vw] w-[38vw] rounded-full blur-[90px]"
          style={{ backgroundColor: "var(--brand-secondary)", opacity: 0.32 }}
          animate={{ x: [0, -25, 15, 0], y: [0, 18, -12, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-0 left-1/3 h-[30vw] w-[30vw] rounded-full blur-[90px]"
          style={{ backgroundColor: "var(--brand-accent)", opacity: 0.24 }}
          animate={{ x: [0, 18, -18, 0], y: [0, -12, 10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative mb-6 text-[11px] font-medium tracking-[0.3em] uppercase"
        style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}
      >
        {data.industry || "Brand Guidelines"}
      </motion.span>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.08, 0.15)}
        className="relative flex flex-wrap items-center justify-center gap-x-4 text-[15vw] leading-[1.05] font-medium italic sm:text-[9vw] lg:text-[6.5vw]"
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.4 + words.length * 0.05 }}
          className="relative mt-5 max-w-md text-[16px] italic sm:text-[18px]"
          style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}
        >
          {data.essence}
        </motion.p>
      )}
    </header>
  );
}
