"use client";

import { BrandData } from "@/lib/types";
import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_INK_FAINT } from "./summitTheme";

/** Matches the blueprint's footer in `BrandPortal.tsx` exactly. */
export function SummitFooter({ data }: { data: BrandData }) {
  return (
    <footer className="relative flex flex-col items-center gap-3 border-t px-6 py-16 text-center" style={{ borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 15%, transparent)" }}>
      <span className="text-2xl" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
        {data.name}
      </span>
      <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
        {data.tagline}
      </span>
    </footer>
  );
}
