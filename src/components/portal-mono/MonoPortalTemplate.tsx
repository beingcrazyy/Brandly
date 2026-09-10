"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { TEMPLATE_NAV } from "@/lib/templateNav";
import { SANS_STACK } from "@/lib/fonts";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { MonoHero } from "./MonoHero";
import { MonoFoundationSection } from "./MonoFoundationSection";
import { MonoPositioningSection } from "./MonoPositioningSection";
import { MonoArchetypeSection } from "./MonoArchetypeSection";
import { MonoPersonalitySection } from "./MonoPersonalitySection";
import { MonoAudienceSection } from "./MonoAudienceSection";
import { MonoValuesSection } from "./MonoValuesSection";
import { MonoVoiceSection } from "./MonoVoiceSection";
import { MonoMessagingSection } from "./MonoMessagingSection";
import { MonoVisualDirectionSection } from "./MonoVisualDirectionSection";
import { MonoFooter } from "./MonoFooter";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: MonoFoundationSection,
  positioning: MonoPositioningSection,
  archetype: MonoArchetypeSection,
  personality: MonoPersonalitySection,
  audience: MonoAudienceSection,
  values: MonoValuesSection,
  voice: MonoVoiceSection,
  messaging: MonoMessagingSection,
  "visual-direction": MonoVisualDirectionSection,
};

/** Used in the mobile drawer only, where there's room for the label to always be visible. */
function NavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-0.5">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <motion.a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            whileHover={{ x: 3 }}
            transition={SPRING_SNAPPY}
            aria-current={active ? "true" : undefined}
            className="focus-ring relative flex items-baseline gap-3 py-1.5 pr-3 pl-4 text-[13px]"
            style={{
              fontFamily: SANS_STACK,
              color: active ? "var(--brand-text)" : "var(--brand-muted)",
              fontWeight: active ? 600 : 500,
            }}
          >
            {active && (
              <motion.span
                layoutId="mono-nav-indicator"
                transition={SPRING_SOFT}
                className="absolute inset-y-0 left-0 w-px"
                style={{ backgroundColor: "var(--brand-accent)" }}
              />
            )}
            <span className="text-[10.5px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </motion.a>
        );
      })}
    </nav>
  );
}

/** Desktop-only "index rail" — replaces a boxed docs sidebar with a slim ledger-style column: quiet
 *  tabular numerals by default, the active one gets a short tick, the label reveals on hover/keyboard
 *  focus (never hover-only — `group-focus-visible` covers keyboard nav). The accessible name is always
 *  present via `aria-label` regardless of the visual reveal state. */
function IndexRail({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-1">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            aria-label={item.label}
            aria-current={active ? "true" : undefined}
            className="focus-ring group relative flex items-center gap-2.5 py-2"
          >
            <span
              className="w-6 flex-shrink-0 text-[13px] font-semibold tabular-nums"
              style={{ fontFamily: SANS_STACK, color: active ? "var(--brand-text)" : "var(--brand-muted)", opacity: active ? 1 : 0.5 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {active && <span className="h-px w-3 flex-shrink-0" style={{ backgroundColor: "var(--brand-accent)" }} />}
            <span
              aria-hidden
              className="max-w-0 overflow-hidden text-[13px] whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-200 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100"
              style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export function MonoPortalTemplate({
  data,
  variant = "live",
  cmsHref,
}: {
  data: BrandData;
  variant?: "live" | "preview";
  cmsHref?: string;
}) {
  usePortalFonts(data.typography);
  const tokens = useMemo(() => buildTokens(data), [data]);
  const slugs = useMemo(() => TEMPLATE_NAV.map((i) => i.slug), []);
  const activeSlug = useActiveSection(slugs);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ ...tokensToStyle(tokens), backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }} className="min-h-screen scroll-smooth">
      {/* Quiet, precise craftsmanship signal: a hairline accent rule tracking scroll progress, fixed above everything */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: "var(--brand-accent)" }}
      />
      {variant === "preview" && (
        <div className="sticky top-0 z-50 flex items-center justify-between bg-[#14140F] px-4 py-2.5 text-white">
          <span className="text-[12px] font-medium tracking-wide uppercase opacity-80">Previewing draft — not published</span>
          {cmsHref && (
            <Link href={cmsHref} className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-[12px] font-medium hover:bg-white/20">
              <ArrowLeft size={13} /> Back to CMS
            </Link>
          )}
        </div>
      )}

      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-24 flex-shrink-0 flex-col items-center gap-10 overflow-y-auto py-8 lg:flex">
          <div
            aria-hidden
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold"
            style={{ fontFamily: SANS_STACK, color: "var(--brand-text)", borderColor: "color-mix(in srgb, var(--brand-text) 20%, transparent)" }}
          >
            {data.name.charAt(0).toUpperCase()}
          </div>
          <IndexRail activeSlug={activeSlug} />
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[14px] font-semibold" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5" style={{ color: "var(--brand-text)" }}>
              <Menu size={20} />
            </button>
          </div>

          <MonoHero data={data} />
          {TEMPLATE_NAV.map((item) => {
            const Section = SECTION_COMPONENTS[item.slug];
            return <Section key={item.slug} data={data} />;
          })}
          <MonoFooter data={data} />
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="px-3 pb-6">
          <NavList activeSlug={activeSlug} onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
