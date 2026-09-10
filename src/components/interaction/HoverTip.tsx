"use client";

import { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  show: boolean;
  eyebrow?: string;
  title: string;
  detail?: string;
  /** Absolute position (left/top, typically percentages) of the anchor point this tip should float above. */
  style?: CSSProperties;
}

/** Brandly's own floating hover-preview chrome — same fixed paper/ink treatment as Inspector, regardless of the host template's brand tokens. Shows a quick preview before a click opens the full Inspector.
 *  The outer div owns the static "center above the anchor" transform; the inner motion.div owns only the animated micro-motion, so the two transforms don't fight each other. */
export function HoverTip({ show, eyebrow, title, detail, style }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+10px)]" style={style}>
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="max-w-[220px] min-w-[140px] rounded-[8px] border border-[#E4DFD3] bg-white px-3 py-2 shadow-lg"
          >
            {eyebrow && <p className="mb-0.5 font-mono text-[10px] tracking-[0.08em] text-[var(--accent-terracotta)] uppercase">{eyebrow}</p>}
            <p className="text-[12.5px] leading-snug font-medium text-[#14140F]">{title}</p>
            {detail && <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-neutral-500">{detail}</p>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
