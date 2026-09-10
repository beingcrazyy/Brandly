"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandData } from "@/lib/types";
import { buildTokens, tokensToStyle } from "@/lib/tokens";
import { usePortalFonts } from "@/lib/usePortalFonts";
import { useActiveSection } from "@/lib/useActiveSection";
import { TEMPLATE_NAV } from "@/lib/templateNav";
import { SANS_STACK, MONO_STACK } from "@/lib/fonts";
import { GrainOverlay } from "../ui/GrainOverlay";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";
import { FieldSidebar } from "./FieldSidebar";
import { FieldHero } from "./FieldHero";
import { FieldFoundationSection } from "./FieldFoundationSection";
import { FieldPositioningSection } from "./FieldPositioningSection";
import { FieldArchetypeSection } from "./FieldArchetypeSection";
import { FieldPersonalitySection } from "./FieldPersonalitySection";
import { FieldAudienceSection } from "./FieldAudienceSection";
import { FieldValuesSection } from "./FieldValuesSection";
import { FieldVoiceSection } from "./FieldVoiceSection";
import { FieldMessagingSection } from "./FieldMessagingSection";
import { FieldVisualDirectionSection } from "./FieldVisualDirectionSection";
import { FieldFooter } from "./FieldFooter";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: FieldFoundationSection,
  positioning: FieldPositioningSection,
  archetype: FieldArchetypeSection,
  personality: FieldPersonalitySection,
  audience: FieldAudienceSection,
  values: FieldValuesSection,
  voice: FieldVoiceSection,
  messaging: FieldMessagingSection,
  "visual-direction": FieldVisualDirectionSection,
};

/** Fixed, full-page backdrop of hairline topographic contour lines in the brand's own ink — a single
 *  atmosphere drawn from the "field notebook" subject rather than per-section decoration, so every
 *  section reads as a page of the same paper rather than its own scene. Drifts on a slow loop. */
function ContourBackdrop() {
  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1600 1600"
      preserveAspectRatio="xMidYMid slice"
      animate={{ x: [0, -12, 0], y: [0, 8, 0] }}
      transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
    >
      <g fill="none" stroke="var(--brand-text)" strokeOpacity={0.05} strokeWidth={1.4}>
        <path d="M-80 1240 C 320 1120, 520 1400, 920 1280 S 1520 1080, 1800 1200" />
        <path d="M-80 1040 C 360 920, 560 1200, 960 1080 S 1560 880, 1800 1000" />
        <path d="M-80 840 C 400 720, 600 1000, 1000 880 S 1600 680, 1800 800" />
        <path d="M-80 640 C 440 520, 640 800, 1040 680 S 1640 480, 1800 600" />
        <path d="M-80 440 C 480 320, 680 600, 1080 480 S 1680 280, 1800 400" />
        <path d="M-80 240 C 520 120, 720 400, 1120 280 S 1720 80, 1800 200" />
      </g>
    </motion.svg>
  );
}

function MobileNavList({ activeSlug, onNavigate }: { activeSlug: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Section navigation" className="flex flex-col gap-0.5">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            aria-current={active ? "true" : undefined}
            className="focus-ring flex items-baseline gap-3 rounded-[6px] px-3 py-2 text-[14px]"
            style={{ fontFamily: SANS_STACK, color: active ? "var(--brand-text)" : "var(--brand-muted)", fontWeight: active ? 600 : 500 }}
          >
            <span className="text-[10.5px]" style={{ fontFamily: MONO_STACK, opacity: 0.6 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function FieldPortalTemplate({
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
    <div style={{ ...tokensToStyle(tokens), backgroundColor: "var(--brand-background)", color: "var(--brand-text)" }} className="relative min-h-screen scroll-smooth">
      <ContourBackdrop />
      <GrainOverlay opacity={0.025} className="-z-10" />

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
        <FieldSidebar items={TEMPLATE_NAV} activeSlug={activeSlug} brandName={data.name} />

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-dashed px-6 py-4 backdrop-blur lg:hidden"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 20%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[15px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
              {data.name}
            </span>
            <button onClick={() => setDrawerOpen(true)} aria-label="Open navigation" className="focus-ring rounded-xl p-1.5" style={{ color: "var(--brand-text)" }}>
              <Menu size={20} />
            </button>
          </div>

          <main className="relative">
            <FieldHero data={data} />
            {TEMPLATE_NAV.map((item) => {
              const Section = SECTION_COMPONENTS[item.slug];
              return <Section key={item.slug} data={data} />;
            })}
            <FieldFooter data={data} />
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
