"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { staggerContainer, kineticWord } from "./summitMotion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SummitMagneticButton } from "./SummitMagneticButton";
import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER, SUMMIT_PAPER_SHEET } from "./summitTheme";

/** Matches `Hero.tsx` exactly: a sticky 130vh scene, the headline scaling up and fading as you
 *  scroll past it, a "SPEC. {industry}" plate, and a magnetic button that scrolls to Foundation. */
export function SummitHero({ data }: { data: BrandData }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.25]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const words = data.name.split(" ");

  return (
    <section ref={ref} className="relative h-[130vh] w-full">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        {data.coverImage ? (
          <div className="absolute inset-0 -z-10">
            <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full opacity-20" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${SUMMIT_PAPER}, color-mix(in srgb, ${SUMMIT_PAPER} 70%, transparent), color-mix(in srgb, ${SUMMIT_PAPER} 30%, transparent))` }} />
          </div>
        ) : null}

        <motion.p
          style={{ opacity: contentOpacity, fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 border px-4 py-1.5 text-xs tracking-[0.25em] uppercase"
        >
          SPEC. {data.industry}
        </motion.p>

        <motion.h1
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          animate="show"
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="flex flex-wrap items-center justify-center gap-x-6 text-center text-[15vw] leading-[0.9] font-medium tracking-tight sm:text-[13vw] lg:text-[10vw]"
        >
          {words.map((word, i) => (
            <span key={word + i} className="overflow-hidden pb-2">
              <motion.span custom={i} variants={kineticWord} className="inline-block" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          style={{ opacity: contentOpacity, fontFamily: "var(--font-secondary)", color: SUMMIT_INK_MUTED }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 max-w-xl text-center text-lg sm:text-xl"
        >
          {data.essence}
        </motion.p>

        <motion.div style={{ opacity: contentOpacity }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }} className="mt-10">
          <SummitMagneticButton onClick={() => document.getElementById("foundation")?.scrollIntoView({ behavior: "smooth" })}>Open the spec sheet</SummitMagneticButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} style={{ opacity: contentOpacity }} className="absolute bottom-10 flex flex-col items-center gap-2" >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
            Scroll
          </span>
          <motion.span animate={reduced ? undefined : { y: [0, 14, 0], opacity: [0, 1, 0] }} transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-4 w-4" style={{ color: SUMMIT_INK_FAINT }} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
