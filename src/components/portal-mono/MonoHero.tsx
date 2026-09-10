"use client";

import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { GrainOverlay } from "../ui/GrainOverlay";
import { SANS_STACK } from "@/lib/fonts";
import { staggerContainer, kineticWord, glowPulse, EASE_OUT } from "@/lib/motion";

export function MonoHero({ data }: { data: BrandData }) {
  const words = data.name.split(" ");

  return (
    <header className="relative flex min-h-screen flex-col justify-between overflow-hidden">
      <div className="absolute inset-0">
        {data.coverImage ? (
          <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full opacity-70" />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: "var(--brand-primary)" }} />
        )}
        {/* Painterly, organically-shaped color blooms — drift slowly so the wash reads as brushed
            pigment rather than a perfect vector gradient */}
        <motion.div
          className="absolute -left-24 top-[-10%] h-[55vw] w-[55vw] blur-[90px]"
          style={{
            background: "var(--brand-accent)",
            borderRadius: "42% 58% 63% 37% / 41% 46% 54% 59%",
            mixBlendMode: "soft-light",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], rotate: [0, 10, -6, 0], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 bottom-[-15%] h-[48vw] w-[48vw] blur-[90px]"
          style={{
            background: "var(--brand-secondary)",
            borderRadius: "63% 37% 45% 55% / 55% 40% 60% 45%",
            mixBlendMode: "soft-light",
          }}
          animate={{ x: [0, -30, 15, 0], y: [0, 25, -15, 0], rotate: [0, -8, 5, 0], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <GrainOverlay opacity={0.04} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)" }}
        />
      </div>

      <div className="relative flex items-center justify-between px-6 py-8 sm:px-12">
        <span className="text-[13px] font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: SANS_STACK, color: "#fff" }}>
          {data.name}
        </span>
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ fontFamily: SANS_STACK, color: "rgba(255,255,255,0.65)" }}>
          {data.industry || "Brand Guidelines"}
        </span>
      </div>

      <div className="relative px-6 pb-16 sm:px-12 sm:pb-24">
        <div className="relative">
          {/* Soft accent halo — a blurred duplicate of the name sitting behind the type so it reads
              as brushed-on light rather than a flat printed block */}
          <motion.div
            aria-hidden
            variants={glowPulse}
            animate="visible"
            className="pointer-events-none absolute inset-0 select-none text-[52px] leading-[0.98] font-bold blur-2xl sm:text-[92px]"
            style={{ fontFamily: SANS_STACK, color: "var(--brand-accent)" }}
          >
            {data.name}
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08, 0.1)}
            className="relative text-[52px] leading-[0.98] font-bold sm:text-[92px]"
            style={{ fontFamily: SANS_STACK, color: "#fff" }}
          >
            {words.map((word, i) => (
              <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-top">
                <motion.span variants={kineticWord} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>
        {data.essence && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + words.length * 0.08 }}
            className="mt-6 text-[16px] font-medium tracking-[0.08em] uppercase sm:text-[19px]"
            style={{ fontFamily: SANS_STACK, color: "rgba(255,255,255,0.82)" }}
          >
            {data.essence}
          </motion.p>
        )}
      </div>
    </header>
  );
}
