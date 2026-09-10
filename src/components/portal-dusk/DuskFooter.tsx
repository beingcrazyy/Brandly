"use client";

import { BrandData } from "@/lib/types";
import { MONO_STACK } from "@/lib/fonts";

/** Matches cairn-brand-portal's footer in `BrandPortal.tsx` exactly. */
export function DuskFooter({ data }: { data: BrandData }) {
  return (
    <footer className="relative flex flex-col items-center gap-3 border-t border-white/10 px-6 py-16 text-center">
      <span className="text-2xl text-white" style={{ fontFamily: "var(--font-primary)" }}>
        {data.name}
      </span>
      <span className="text-xs tracking-[0.3em] text-white/40 uppercase" style={{ fontFamily: MONO_STACK }}>
        {data.tagline}
      </span>
    </footer>
  );
}
