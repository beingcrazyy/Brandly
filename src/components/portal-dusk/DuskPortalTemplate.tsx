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
import { DuskGradientMesh } from "./DuskGradientMesh";
import { DuskGrain } from "./DuskGrain";
import { DuskParticleField } from "./DuskParticleField";
import { DuskSidebar } from "./DuskSidebar";
import { DuskHero } from "./DuskHero";
import { DuskFoundationSection } from "./DuskFoundationSection";
import { DuskPositioningSection } from "./DuskPositioningSection";
import { DuskArchetypeSection } from "./DuskArchetypeSection";
import { DuskPersonalitySection } from "./DuskPersonalitySection";
import { DuskAudienceSection } from "./DuskAudienceSection";
import { DuskValuesSection } from "./DuskValuesSection";
import { DuskVoiceSection } from "./DuskVoiceSection";
import { DuskMessagingSection } from "./DuskMessagingSection";
import { DuskVisualDirectionSection } from "./DuskVisualDirectionSection";
import { DuskFooter } from "./DuskFooter";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: DuskFoundationSection,
  positioning: DuskPositioningSection,
  archetype: DuskArchetypeSection,
  personality: DuskPersonalitySection,
  audience: DuskAudienceSection,
  values: DuskValuesSection,
  voice: DuskVoiceSection,
  messaging: DuskMessagingSection,
  "visual-direction": DuskVisualDirectionSection,
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

/** Matches cairn-brand-portal's `BrandPortal.tsx` composition exactly: gradient mesh + grain +
 *  particle field behind everything, hero, the 9 sections, footer. The sidebar is this port's own
 *  addition (see DuskSidebar.tsx) since the source has none. */
export function DuskPortalTemplate({ data, variant = "live", cmsHref }: { data: BrandData; variant?: "live" | "preview"; cmsHref?: string }) {
  usePortalFonts(data.typography);
  const tokens = useMemo(() => buildTokens(data), [data]);
  const slugs = useMemo(() => TEMPLATE_NAV.map((i) => i.slug), []);
  const activeSlug = useActiveSection(slugs);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const accentHex = data.colors.find((c) => c.role === "accent")?.hex ?? "#FF7A3D";

  return (
    <div style={{ ...tokensToStyle(tokens), color: "white" }} className="relative min-h-screen scroll-smooth">
      <DuskGradientMesh />
      <DuskGrain />
      <DuskParticleField accentHex={accentHex} />

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

      <div className="relative z-10 flex">
        <DuskSidebar items={TEMPLATE_NAV} activeSlug={activeSlug} brandName={data.name} />

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-4 backdrop-blur lg:hidden">
            <span className="text-[15px] text-white" style={{ fontFamily: "var(--font-primary)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5 text-white">
              <Menu size={20} />
            </button>
          </div>

          <main className="relative z-10">
            <DuskHero data={data} />
            {TEMPLATE_NAV.map((item) => {
              const Section = SECTION_COMPONENTS[item.slug];
              return <Section key={item.slug} data={data} />;
            })}
            <DuskFooter data={data} />
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
