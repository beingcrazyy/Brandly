"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { TEMPLATE_NAV } from "@/lib/templateNav";
import { SANS_STACK } from "@/lib/fonts";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";
import { MeadowSidebar } from "./MeadowSidebar";
import { MeadowHero } from "./MeadowHero";
import { MeadowFoundationSection } from "./MeadowFoundationSection";
import { MeadowPositioningSection } from "./MeadowPositioningSection";
import { MeadowArchetypeSection } from "./MeadowArchetypeSection";
import { MeadowPersonalitySection } from "./MeadowPersonalitySection";
import { MeadowAudienceSection } from "./MeadowAudienceSection";
import { MeadowValuesSection } from "./MeadowValuesSection";
import { MeadowVoiceSection } from "./MeadowVoiceSection";
import { MeadowMessagingSection } from "./MeadowMessagingSection";
import { MeadowVisualDirectionSection } from "./MeadowVisualDirectionSection";
import { MeadowFooter } from "./MeadowFooter";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: MeadowFoundationSection,
  positioning: MeadowPositioningSection,
  archetype: MeadowArchetypeSection,
  personality: MeadowPersonalitySection,
  audience: MeadowAudienceSection,
  values: MeadowValuesSection,
  voice: MeadowVoiceSection,
  messaging: MeadowMessagingSection,
  "visual-direction": MeadowVisualDirectionSection,
};

function MobileNavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-0.5">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a key={item.slug} href={`#${item.slug}`} onClick={onNavigate} aria-current={active ? "true" : undefined} className="focus-ring flex items-baseline gap-3 rounded-full px-3 py-2 text-[14px]" style={{ fontFamily: SANS_STACK, color: active ? "var(--brand-text)" : "var(--brand-muted)", fontWeight: active ? 600 : 500 }}>
            <span className="text-[10.5px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function MeadowPortalTemplate({ data, variant = "live", cmsHref }: { data: BrandData; variant?: "live" | "preview"; cmsHref?: string }) {
  usePortalFonts(data.typography);
  const tokens = useMemo(() => buildTokens(data), [data]);
  const slugs = useMemo(() => TEMPLATE_NAV.map((i) => i.slug), []);
  const activeSlug = useActiveSection(slugs);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ ...tokensToStyle(tokens), backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }} className="relative min-h-screen scroll-smooth">
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
        <MeadowSidebar items={TEMPLATE_NAV} activeSlug={activeSlug} brandName={data.name} />

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur lg:hidden"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[15px] italic" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5" style={{ color: "var(--brand-text)" }}>
              <Menu size={20} />
            </button>
          </div>

          <main className="relative">
            <MeadowHero data={data} />
            {TEMPLATE_NAV.map((item) => {
              const Section = SECTION_COMPONENTS[item.slug];
              return <Section key={item.slug} data={data} />;
            })}
            <MeadowFooter data={data} />
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
