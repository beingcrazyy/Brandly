"use client";

import { MONO_STACK } from "@/lib/fonts";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET } from "./summitTheme";

export interface Sheet {
  id: string;
  label: string;
}

/** A small fixed readout, bottom-left, showing which "sheet" of the document is in view —
 *  "03/10 — ARCHETYPE" — the way a technical drawing set numbers its plates. Purely informational,
 *  not a nav rail (the docked sidebar handles navigation). Matches `SheetIndex.tsx` exactly, driven
 *  by the same `activeSlug` the sidebar already tracks via `useActiveSection`. */
export function SummitSheetIndex({ sheets, activeIndex }: { sheets: Sheet[]; activeIndex: number }) {
  const current = sheets[activeIndex];

  return (
    <div className="fixed bottom-6 left-[19rem] z-30 hidden lg:block">
      <div className="flex items-center gap-2 border px-3 py-2 text-[11px]" style={{ fontFamily: MONO_STACK, borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", backgroundColor: SUMMIT_PAPER_SHEET, color: SUMMIT_INK }}>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span style={{ color: SUMMIT_INK_FAINT }}>/</span>
        <span style={{ color: SUMMIT_INK_FAINT }}>{String(sheets.length).padStart(2, "0")}</span>
        <span className="mx-1 h-3 w-px" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)" }} />
        <span className="tracking-[0.1em] uppercase" style={{ color: SUMMIT_INK_MUTED }}>
          {current?.label}
        </span>
      </div>
    </div>
  );
}
