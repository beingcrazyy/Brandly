"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { PORTAL_NAV } from "@/lib/portalNav";
import { BoldHero } from "./BoldHero";
import { BoldDnaSection } from "./BoldDnaSection";
import { BoldPositioningSection } from "./BoldPositioningSection";
import { BoldAudienceSection } from "./BoldAudienceSection";
import { BoldPersonalitySection } from "./BoldPersonalitySection";
import { BoldVoiceSection } from "./BoldVoiceSection";
import { BoldLogoSection } from "./BoldLogoSection";
import { BoldColorsSection } from "./BoldColorsSection";
import { BoldTypographySection } from "./BoldTypographySection";
import { BoldImagerySection } from "./BoldImagerySection";
import { BoldIconographySection } from "./BoldIconographySection";
import { BoldGraphicsSection } from "./BoldGraphicsSection";
import { BoldApplicationsSection } from "./BoldApplicationsSection";
import { BoldDownloadsSection } from "./BoldDownloadsSection";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft, ArrowUpRight } from "lucide-react";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  dna: BoldDnaSection,
  positioning: BoldPositioningSection,
  audience: BoldAudienceSection,
  personality: BoldPersonalitySection,
  voice: BoldVoiceSection,
  logo: BoldLogoSection,
  colors: BoldColorsSection,
  typography: BoldTypographySection,
  imagery: BoldImagerySection,
  iconography: BoldIconographySection,
  graphics: BoldGraphicsSection,
  applications: BoldApplicationsSection,
  downloads: BoldDownloadsSection,
};

function NavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {PORTAL_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            className="focus-ring flex items-center gap-3 rounded-full px-3 py-2 text-[13px] font-medium transition-colors"
            style={{
              fontFamily: "var(--font-secondary)",
              color: active ? "#fff" : "color-mix(in srgb, var(--brand-background) 55%, transparent)",
              backgroundColor: active ? "var(--brand-accent)" : "transparent",
            }}
          >
            <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function BoldPortalTemplate({
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

  return (
    <div style={{ ...tokensToStyle(tokens), backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }} className="min-h-screen scroll-smooth">
      {variant === "preview" && (
        <div className="sticky top-0 z-50 flex items-center justify-between bg-black px-4 py-2.5 text-white">
          <span className="text-[12px] font-medium tracking-wide uppercase opacity-80">Previewing draft — not published</span>
          {cmsHref && (
            <Link href={cmsHref} className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium hover:bg-white/20">
              <ArrowLeft size={13} /> Back to CMS
            </Link>
          )}
        </div>
      )}

      <div className="flex">
        <aside
          className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col justify-between overflow-y-auto px-5 py-8 lg:flex"
          style={{ backgroundColor: "var(--brand-primary)" }}
        >
          <div>
            <p className="mb-8 px-3 font-mono text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--brand-background)" }}>
              {data.name}
            </p>
            <NavList activeSlug={activeSlug} />
          </div>
          <div className="px-3 font-mono text-[10.5px]" style={{ color: "color-mix(in srgb, var(--brand-background) 45%, transparent)" }}>
            <p>Last updated {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <p className="mt-1 flex items-center gap-1">
              Powered by Brandly <ArrowUpRight size={10} />
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur lg:hidden"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand-primary) 92%, transparent)" }}
          >
            <span className="font-mono text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--brand-background)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-full p-1.5" style={{ color: "var(--brand-background)" }}>
              <Menu size={20} />
            </button>
          </div>

          <BoldHero data={data} />
          {PORTAL_NAV.map((item) => {
            const Section = SECTION_COMPONENTS[item.slug];
            return <Section key={item.slug} data={data} />;
          })}

          <footer className="flex items-center justify-between px-6 py-10 sm:px-12 lg:px-20" style={{ backgroundColor: "var(--brand-primary)" }}>
            <span className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: "var(--brand-background)" }}>
              {data.name}
            </span>
            <span className="font-mono text-[11px]" style={{ color: "color-mix(in srgb, var(--brand-background) 55%, transparent)" }}>
              Powered by Brandly
            </span>
          </footer>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="px-3 pb-6 pt-3">
          <NavList activeSlug={activeSlug} onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
