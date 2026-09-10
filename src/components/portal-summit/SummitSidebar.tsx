"use client";

import { motion } from "framer-motion";
import { TemplateNavItem } from "@/lib/templateNav";
import { MONO_STACK } from "@/lib/fonts";
import { springTouch, springSnappy } from "./summitMotion";
import { SUMMIT_INK, SUMMIT_INK_FAINT, SUMMIT_INK_MUTED, SUMMIT_PAPER_SHEET, SUMMIT_PLATES } from "./summitTheme";

/** The sidebar isn't part of the blueprint's own design (it has none) — restyled in the same
 *  spec-sheet language as the rest of this edition (`SummitSpecPanel`'s hairline border + corner
 *  brackets) so it reads as a native drawing-set index rather than a bolted-on control. */
export function SummitSidebar({ items, activeSlug, brandName }: { items: TemplateNavItem[]; activeSlug: string; brandName: string }) {
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.slug === activeSlug)
  );
  const progressPct = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;
  const ink15 = "color-mix(in srgb, " + SUMMIT_INK + " 15%, transparent)";
  const ink20 = "color-mix(in srgb, " + SUMMIT_INK + " 20%, transparent)";

  return (
    <aside className="sticky top-0 z-10 hidden h-screen w-72 flex-shrink-0 flex-col justify-between overflow-y-auto border-r px-8 py-10 lg:flex" style={{ borderColor: ink15, backgroundColor: SUMMIT_PAPER_SHEET }}>
      <div>
        <p className="mb-10 text-lg" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
          {brandName}
        </p>

        <nav aria-label="Section navigation" className="relative flex flex-col gap-[2px] pl-5">
          <div className="absolute top-0 -left-[1px] h-full w-px" style={{ backgroundColor: ink20 }} />
          <motion.div className="absolute top-0 -left-[1px] w-px" style={{ backgroundColor: "var(--brand-accent)" }} animate={{ height: `${progressPct}%` }} transition={springTouch} />

          {items.map((item) => {
            const active = activeSlug === item.slug;
            return (
              <a key={item.slug} href={`#${item.slug}`} aria-current={active ? "true" : undefined} className="focus-ring group relative flex items-center gap-3 py-2.5 pl-6">
                <span className="absolute -left-[4px] h-2 w-2 rounded-full transition-colors duration-200" style={{ backgroundColor: active ? "var(--brand-accent)" : ink20 }} />
                {active && <motion.span layoutId="summit-sidebar-ring" className="absolute -left-[8px] h-4 w-4 rounded-full border" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} transition={springSnappy} />}
                <span className="tabular-nums text-[10px] tracking-widest uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
                  {SUMMIT_PLATES[item.slug] ?? ""}
                </span>
                <span className="text-[13.5px]" style={{ fontFamily: "var(--font-secondary)", color: active ? SUMMIT_INK : SUMMIT_INK_MUTED, fontWeight: active ? 600 : 400 }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: SUMMIT_INK_FAINT }}>
        Powered by Brandly
      </p>
    </aside>
  );
}
