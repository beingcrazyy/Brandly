"use client";

import { motion } from "framer-motion";
import { TemplateNavItem } from "@/lib/templateNav";
import { MONO_STACK } from "@/lib/fonts";
import { springTouch, springSnappy } from "./duskMotion";

/** The sidebar isn't part of cairn-brand-portal's own design (it has none) — restyled in the same
 *  glass language as the rest of this edition (`DuskGlassPanel`'s border/blur) so it reads as native
 *  chrome rather than a bolted-on control. */
export function DuskSidebar({ items, activeSlug, brandName }: { items: TemplateNavItem[]; activeSlug: string; brandName: string }) {
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.slug === activeSlug)
  );
  const progressPct = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  return (
    <aside className="sticky top-0 z-10 hidden h-screen w-72 flex-shrink-0 flex-col justify-between overflow-y-auto border-r border-white/10 bg-white/[0.02] px-8 py-10 backdrop-blur-xl lg:flex">
      <div>
        <p className="mb-10 text-lg text-white" style={{ fontFamily: "var(--font-primary)" }}>
          {brandName}
        </p>

        <nav aria-label="Section navigation" className="relative flex flex-col gap-[2px] pl-5">
          <div className="absolute top-0 -left-[1px] h-full w-px bg-white/10" />
          <motion.div className="absolute top-0 -left-[1px] w-px" style={{ backgroundColor: "var(--brand-accent)", boxShadow: "0 0 8px var(--brand-accent)" }} animate={{ height: `${progressPct}%` }} transition={springTouch} />

          {items.map((item, i) => {
            const active = activeSlug === item.slug;
            return (
              <a key={item.slug} href={`#${item.slug}`} aria-current={active ? "true" : undefined} className="focus-ring group relative flex items-center gap-3 py-2.5 pl-6">
                <span className="absolute -left-[4px] h-2 w-2 rounded-full transition-colors duration-200" style={{ backgroundColor: active ? "var(--brand-accent)" : "rgba(255,255,255,0.15)" }} />
                {active && <motion.span layoutId="dusk-sidebar-ring" className="absolute -left-[8px] h-4 w-4 rounded-full border" style={{ borderColor: "color-mix(in srgb, var(--brand-accent) 50%, transparent)" }} transition={springSnappy} />}
                <span className="text-[10px] tracking-widest text-white/30 uppercase" style={{ fontFamily: MONO_STACK }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px]" style={{ fontFamily: "var(--font-secondary)", color: active ? "white" : "rgba(255,255,255,0.5)", fontWeight: active ? 600 : 400 }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <p className="text-[11px] tracking-[0.2em] text-white/30 uppercase" style={{ fontFamily: MONO_STACK }}>
        Powered by Brandly
      </p>
    </aside>
  );
}
