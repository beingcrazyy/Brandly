"use client";

import { motion } from "framer-motion";
import { TemplateNavItem } from "@/lib/templateNav";
import { SANS_STACK } from "@/lib/fonts";
import { SPRING_SOFT, SPRING_SNAPPY } from "@/lib/motion";

/** Meadow's docked sidebar: soft rounded-pill markers on a barely-there track, the active pill
 *  filled in the brand's accent — warm and quiet, matching the rest of the theme's soft-cutout cards. */
export function MeadowSidebar({ items, activeSlug, brandName }: { items: TemplateNavItem[]; activeSlug: string; brandName: string }) {
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.slug === activeSlug)
  );
  const progressPct = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col justify-between overflow-y-auto px-7 py-10 lg:flex">
      <div>
        <p className="mb-10 text-[16px] italic" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
          {brandName}
        </p>

        <nav aria-label="Section navigation" className="relative flex flex-col gap-1">
          <div className="absolute top-1 left-0 h-[calc(100%-8px)] w-[3px] rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 8%, transparent)" }} />
          <motion.div className="absolute top-1 left-0 w-[3px] rounded-full" style={{ backgroundColor: "var(--brand-accent)" }} animate={{ height: `${progressPct}%` }} transition={SPRING_SOFT} />

          {items.map((item) => {
            const active = activeSlug === item.slug;
            return (
              <a key={item.slug} href={`#${item.slug}`} aria-current={active ? "true" : undefined} className="focus-ring relative flex items-center gap-3 rounded-full py-2 pr-3 pl-5">
                {active && (
                  <motion.span
                    layoutId="meadow-sidebar-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 16%, var(--brand-background))" }}
                    transition={SPRING_SNAPPY}
                  />
                )}
                <span className="relative text-[13.5px]" style={{ fontFamily: "var(--font-secondary)", color: active ? "var(--brand-text)" : "var(--brand-muted)" }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
        Powered by Brandly
      </p>
    </aside>
  );
}
