"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { TEMPLATE_NAV } from "@/lib/templateNav";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";
import { SummitGridPaper } from "./SummitGridPaper";
import { SummitRegistrationMarks } from "./SummitRegistrationMarks";
import { SummitCrosshair } from "./SummitCrosshair";
import { SummitSheetIndex } from "./SummitSheetIndex";
import { SummitSidebar } from "./SummitSidebar";
import { SummitHero } from "./SummitHero";
import { SummitFoundationSection } from "./SummitFoundationSection";
import { SummitPositioningSection } from "./SummitPositioningSection";
import { SummitArchetypeSection } from "./SummitArchetypeSection";
import { SummitPersonalitySection } from "./SummitPersonalitySection";
import { SummitAudienceSection } from "./SummitAudienceSection";
import { SummitValuesSection } from "./SummitValuesSection";
import { SummitVoiceSection } from "./SummitVoiceSection";
import { SummitMessagingSection } from "./SummitMessagingSection";
import { SummitVisualDirectionSection } from "./SummitVisualDirectionSection";
import { SummitFooter } from "./SummitFooter";
import { SUMMIT_INK, SUMMIT_PAPER_SHEET } from "./summitTheme";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: SummitFoundationSection,
  positioning: SummitPositioningSection,
  archetype: SummitArchetypeSection,
  personality: SummitPersonalitySection,
  audience: SummitAudienceSection,
  values: SummitValuesSection,
  voice: SummitVoiceSection,
  messaging: SummitMessagingSection,
  "visual-direction": SummitVisualDirectionSection,
};

function MobileNavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-0.5">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a key={item.slug} href={`#${item.slug}`} onClick={onNavigate} aria-current={active ? "true" : undefined} className="focus-ring flex items-baseline gap-3 rounded-[6px] px-3 py-2 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: active ? "var(--brand-text)" : "var(--brand-muted)", fontWeight: active ? 600 : 500 }}>
            <span className="text-[10.5px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/** Matches the blueprint's `BrandPortal.tsx` composition exactly: grid paper + registration marks +
 *  crosshair + sheet index behind everything, hero, the 9 sections, footer. The sidebar is this
 *  port's own addition (see SummitSidebar.tsx) since the source has none. */
export function SummitPortalTemplate({ data, variant = "live", cmsHref }: { data: BrandData; variant?: "live" | "preview"; cmsHref?: string }) {
  usePortalFonts(data.typography);
  const tokens = useMemo(() => buildTokens(data), [data]);
  const slugs = useMemo(() => TEMPLATE_NAV.map((i) => i.slug), []);
  const activeSlug = useActiveSection(slugs);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sheets = useMemo(() => [{ id: "hero", label: data.name }, ...TEMPLATE_NAV.map((i) => ({ id: i.slug, label: i.label }))], [data.name]);
  const activeIndex = Math.max(
    0,
    sheets.findIndex((s) => s.id === activeSlug)
  );

  return (
    <div style={{ ...tokensToStyle(tokens), color: SUMMIT_INK }} className="relative min-h-screen scroll-smooth">
      <SummitGridPaper />
      <SummitRegistrationMarks />
      <SummitCrosshair />
      <SummitSheetIndex sheets={sheets} activeIndex={activeIndex} />

      {variant === "preview" && (
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: SUMMIT_INK, color: SUMMIT_PAPER_SHEET }}>
          <span className="text-[12px] font-medium tracking-wide uppercase opacity-80">Previewing draft — not published</span>
          {cmsHref && (
            <Link href={cmsHref} className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-[12px] font-medium hover:bg-white/20">
              <ArrowLeft size={13} /> Back to CMS
            </Link>
          )}
        </div>
      )}

      <div className="relative z-10 flex">
        <SummitSidebar items={TEMPLATE_NAV} activeSlug={activeSlug} brandName={data.name} />

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden" style={{ borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 15%, transparent)", backgroundColor: "color-mix(in srgb, " + SUMMIT_PAPER_SHEET + " 85%, transparent)" }}>
            <span className="text-[15px]" style={{ fontFamily: "var(--font-primary)", color: SUMMIT_INK }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5" style={{ color: SUMMIT_INK }}>
              <Menu size={20} />
            </button>
          </div>

          <main className="relative z-10">
            <SummitHero data={data} />
            {TEMPLATE_NAV.map((item) => {
              const Section = SECTION_COMPONENTS[item.slug];
              return <Section key={item.slug} data={data} />;
            })}
            <SummitFooter data={data} />
          </main>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="px-3 pb-6">
          <MobileNavList activeSlug={activeSlug} onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
