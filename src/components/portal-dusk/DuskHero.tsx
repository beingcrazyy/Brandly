"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { staggerContainer, kineticWord } from "./duskMotion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { MONO_STACK } from "@/lib/fonts";
import { DUSK_CANVAS } from "./duskTheme";

/** Matches cairn-brand-portal's `Hero.tsx` exactly: a sticky 130vh scene, the headline scaling up
 *  and fading as you scroll past it, words rising out of a mask on load. */
export function DuskHero({ data }: { data: BrandData }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.35]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.06em"]);

  const words = data.name.split(" ");

  return (
    <section ref={ref} className="relative flex h-[130vh] w-full flex-col">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        {data.coverImage ? (
          <div className="absolute inset-0 -z-10">
            <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full opacity-40" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DUSK_CANVAS}, color-mix(in srgb, ${DUSK_CANVAS} 60%, transparent), color-mix(in srgb, ${DUSK_CANVAS} 20%, transparent))` }} />
          </div>
        ) : null}

        <motion.p
          style={{ opacity: contentOpacity, fontFamily: MONO_STACK, color: "var(--brand-secondary)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-6 text-xs uppercase tracking-[0.3em]"
        >
          {data.industry}
        </motion.p>

        <motion.h1
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          animate="show"
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity, letterSpacing }}
          className="flex flex-wrap items-center justify-center gap-x-6 text-center text-[15vw] font-medium leading-[0.9] text-white sm:text-[13vw] lg:text-[10vw]"
        >
          {words.map((word, i) => (
            <span key={word + i} className="overflow-hidden pb-2">
              <motion.span custom={i} variants={kineticWord} className="inline-block" style={{ fontFamily: "var(--font-primary)" }}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          style={{ opacity: contentOpacity, fontFamily: "var(--font-secondary)", color: "rgba(255,255,255,0.7)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 max-w-xl text-center text-lg sm:text-xl"
        >
          {data.essence}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity: contentOpacity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO_STACK }}>
            Scroll
          </span>
          <motion.span animate={reduced ? undefined : { y: [0, 14, 0], opacity: [0, 1, 0] }} transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
