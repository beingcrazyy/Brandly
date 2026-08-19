"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { PORTAL_NAV } from "@/lib/portalNav";
import { Hero } from "./Hero";
import { DnaSection } from "./DnaSection";
import { PositioningSection } from "./PositioningSection";
import { AudienceSection } from "./AudienceSection";
import { PersonalitySection } from "./PersonalitySection";
import { VoiceSection } from "./VoiceSection";
import { LogoSection } from "./LogoSection";
import { ColorsSection } from "./ColorsSection";
import { TypographySection } from "./TypographySection";
import { ImagerySection } from "./ImagerySection";
import { IconographySection } from "./IconographySection";
import { GraphicsSection } from "./GraphicsSection";
import { ApplicationsSection } from "./ApplicationsSection";
import { DownloadsSection } from "./DownloadsSection";
import { PortalFooter } from "./PortalFooter";
import { Drawer } from "../ui/Drawer";
import { FilePreview } from "../ui/FilePreview";
import { Menu, ArrowLeft } from "lucide-react";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  dna: DnaSection,
  positioning: PositioningSection,
  audience: AudienceSection,
  personality: PersonalitySection,
  voice: VoiceSection,
  logo: LogoSection,
  colors: ColorsSection,
  typography: TypographySection,
  imagery: ImagerySection,
  iconography: IconographySection,
  graphics: GraphicsSection,
  applications: ApplicationsSection,
  downloads: DownloadsSection,
};

function NavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {PORTAL_NAV.map((item) => {
        const active = activeSlug === item.slug;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            className="focus-ring border-l py-1.5 pr-3 pl-4 text-[13px] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-secondary)",
              color: active ? "var(--brand-text)" : "var(--brand-muted)",
              borderColor: active ? "var(--brand-accent)" : "transparent",
              fontWeight: active ? 600 : 500,
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function PortalTemplate({
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
  const slugs = useMemo(() => PORTAL_NAV.map((i) => i.slug), []);
  const activeSlug = useActiveSection(slugs);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const primaryLogo = data.logos.find((l) => l.variant === "primary")?.file ?? null;

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
          className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col justify-between overflow-y-auto border-r px-6 py-8 lg:flex"
          style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)" }}
        >
          <div>
            <div className="mb-8 flex items-center gap-2.5">
              {primaryLogo ? (
                <div className="h-7 w-auto max-w-[120px]">
                  <FilePreview file={primaryLogo} alt={data.name} className="h-full object-contain object-left" />
                </div>
              ) : (
                <span className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-primary)" }}>
                  {data.name}
                </span>
              )}
            </div>
            <NavList activeSlug={activeSlug} />
          </div>
          <div className="text-[11px]" style={{ color: "var(--brand-muted)" }}>
            <p>Last updated {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <p className="mt-1">Powered by Brandly</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-primary)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5" style={{ color: "var(--brand-text)" }}>
              <Menu size={20} />
            </button>
          </div>

          <Hero data={data} />
          {PORTAL_NAV.map((item) => {
            const Section = SECTION_COMPONENTS[item.slug];
            return <Section key={item.slug} data={data} />;
          })}
          <PortalFooter data={data} />
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
