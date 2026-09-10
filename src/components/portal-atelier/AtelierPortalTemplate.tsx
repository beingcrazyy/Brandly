"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { TEMPLATE_NAV } from "@/lib/templateNav";
import { SANS_STACK } from "@/lib/fonts";
import { SPRING_SOFT, SPRING_SNAPPY } from "@/lib/motion";
import { AtelierHero } from "./AtelierHero";
import { AtelierFoundationSection } from "./AtelierFoundationSection";
import { AtelierPositioningSection } from "./AtelierPositioningSection";
import { AtelierArchetypeSection } from "./AtelierArchetypeSection";
import { AtelierPersonalitySection } from "./AtelierPersonalitySection";
import { AtelierAudienceSection } from "./AtelierAudienceSection";
import { AtelierValuesSection } from "./AtelierValuesSection";
import { AtelierVoiceSection } from "./AtelierVoiceSection";
import { AtelierMessagingSection } from "./AtelierMessagingSection";
import { AtelierVisualDirectionSection } from "./AtelierVisualDirectionSection";
import { AtelierFooter } from "./AtelierFooter";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: AtelierFoundationSection,
  positioning: AtelierPositioningSection,
  archetype: AtelierArchetypeSection,
  personality: AtelierPersonalitySection,
  audience: AtelierAudienceSection,
  values: AtelierValuesSection,
  voice: AtelierVoiceSection,
  messaging: AtelierMessagingSection,
  "visual-direction": AtelierVisualDirectionSection,
};

function NavList({
  activeSlug,
  onNavigate,
  layoutId,
}: {
  activeSlug: string;
  onNavigate?: () => void;
  layoutId: string;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            className="focus-ring relative flex items-baseline gap-3 rounded-2xl px-4 py-2 text-[13px]"
            style={{
              fontFamily: SANS_STACK,
              color: active ? "var(--brand-text)" : "var(--brand-muted)",
              fontWeight: active ? 600 : 500,
            }}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_SOFT}
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 12%, transparent)" }}
              />
            )}
            <span className="relative text-[10.5px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            <span className="relative">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function AtelierPortalTemplate({
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

  return (
    <div style={{ ...tokensToStyle(tokens), backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }} className="min-h-screen scroll-smooth">
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
        <aside
          className="sticky top-0 relative hidden h-screen w-64 flex-shrink-0 flex-col justify-between overflow-y-auto overflow-x-hidden border-r px-6 py-8 lg:flex"
          style={{ borderColor: "color-mix(in srgb, var(--brand-text) 8%, transparent)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 12%, transparent)" }}
          />
          <div className="relative">
            <p className="mb-8 text-[14px] font-semibold" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
              {data.name}
            </p>
            <NavList activeSlug={activeSlug} layoutId="atelier-nav-active-sidebar" />
          </div>
          <div className="text-[11px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
            <p>Last updated {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <p className="mt-1">Powered by Brandly</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 8%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[14px] font-semibold" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
              {data.name}
            </span>
            <motion.button
              onClick={() => setDrawerOpen(true)}
              whileTap={{ scale: 0.88 }}
              transition={SPRING_SNAPPY}
              aria-label="Open navigation"
              className="focus-ring rounded-xl p-1.5"
              style={{ color: "var(--brand-text)" }}
            >
              <Menu size={20} />
            </motion.button>
          </div>

          <AtelierHero data={data} />
          {TEMPLATE_NAV.map((item) => {
            const Section = SECTION_COMPONENTS[item.slug];
            return <Section key={item.slug} data={data} />;
          })}
          <AtelierFooter data={data} />
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="px-3 pb-6">
          <NavList activeSlug={activeSlug} onNavigate={() => setDrawerOpen(false)} layoutId="atelier-nav-active-drawer" />
        </div>
      </Drawer>
    </div>
  );
}
