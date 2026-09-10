"use client";

import { motion } from "framer-motion";
import { TemplateNavItem } from "@/lib/templateNav";
import { MONO_STACK } from "@/lib/fonts";
import { SPRING_SOFT, SPRING_SNAPPY } from "@/lib/motion";

/** Field's signature nav: a full docked sidebar (not a floating rail) whose list sits against a
 *  dashed vertical "spine" — a waypoint marker per section, filling in behind the one currently in
 *  view — so the page reads as a route being walked, framed as a proper side nav rather than a
 *  minimal dot trail. */
export function FieldSidebar({ items, activeSlug, brandName }: { items: TemplateNavItem[]; activeSlug: string; brandName: string }) {
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.slug === activeSlug)
  );
  const progressPct = items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0;

  return (
    <aside
      className="sticky top-0 hidden h-screen w-72 flex-shrink-0 flex-col justify-between overflow-y-auto border-r-2 border-dashed px-8 py-10 lg:flex"
      style={{ borderColor: "color-mix(in srgb, var(--brand-text) 25%, transparent)" }}
    >
      <div>
        <div
          className="mb-10 inline-flex items-center rounded-[6px] border-2 px-3 py-1.5 text-[13px]"
          style={{ fontFamily: "var(--font-primary)", borderColor: "var(--brand-text)", color: "var(--brand-text)", boxShadow: "3px 3px 0 0 var(--brand-accent)" }}
        >
          {brandName}
        </div>

        <nav aria-label="Section navigation" className="relative flex flex-col gap-[2px] border-l-2 border-dashed pl-6" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 22%, transparent)" }}>
          <motion.div
            className="absolute top-0 -left-[2px] w-[2px]"
            style={{ backgroundColor: "var(--brand-accent)" }}
            animate={{ height: `${progressPct}%` }}
            transition={SPRING_SOFT}
          />
          {items.map((item, i) => {
            const active = activeSlug === item.slug;
            return (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                aria-current={active ? "true" : undefined}
                className="focus-ring group relative flex items-center gap-3 py-2.5 pl-6"
              >
                <span
                  className="absolute -left-[7px] h-3 w-3 rounded-full border-2 transition-colors duration-200"
                  style={{ borderColor: "var(--brand-text)", backgroundColor: active ? "var(--brand-accent)" : "var(--brand-background)" }}
                />
                {active && (
                  <motion.span
                    layoutId="field-sidebar-ring"
                    className="absolute -left-[10px] h-[18px] w-[18px] rounded-full border"
                    style={{ borderColor: "var(--brand-accent)" }}
                    transition={SPRING_SNAPPY}
                  />
                )}
                <span className="text-[10px] tracking-widest uppercase opacity-60" style={{ fontFamily: MONO_STACK, color: "var(--brand-text)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px]" style={{ fontFamily: "var(--font-secondary)", color: active ? "var(--brand-text)" : "var(--brand-muted)", fontWeight: active ? 600 : 400 }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: MONO_STACK, color: "var(--brand-muted)" }}>
        Powered by Brandly
      </p>
    </aside>
  );
}
