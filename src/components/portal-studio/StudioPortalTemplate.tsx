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
import { isLight } from "@/lib/color";
import { SPRING_SNAPPY } from "@/lib/motion";
import { StudioHero } from "./StudioHero";
import { StudioFoundationSection } from "./StudioFoundationSection";
import { StudioPositioningSection } from "./StudioPositioningSection";
import { StudioArchetypeSection } from "./StudioArchetypeSection";
import { StudioPersonalitySection } from "./StudioPersonalitySection";
import { StudioAudienceSection } from "./StudioAudienceSection";
import { StudioValuesSection } from "./StudioValuesSection";
import { StudioVoiceSection } from "./StudioVoiceSection";
import { StudioMessagingSection } from "./StudioMessagingSection";
import { StudioVisualDirectionSection } from "./StudioVisualDirectionSection";
import { StudioFooter } from "./StudioFooter";
import { Drawer } from "../ui/Drawer";
import { Menu, ArrowLeft } from "lucide-react";

const DARK_INK = "#14140F";
const LIGHT_INK = "#F6F4EE";

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ data: BrandData }>> = {
  foundation: StudioFoundationSection,
  positioning: StudioPositioningSection,
  archetype: StudioArchetypeSection,
  personality: StudioPersonalitySection,
  audience: StudioAudienceSection,
  values: StudioValuesSection,
  voice: StudioVoiceSection,
  messaging: StudioMessagingSection,
  "visual-direction": StudioVisualDirectionSection,
};

function NavList({
  activeSlug,
  onNavigate,
  accentInk,
  layoutId,
}: {
  activeSlug: string;
  onNavigate?: () => void;
  accentInk: string;
  layoutId: string;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {TEMPLATE_NAV.map((item, i) => {
        const active = activeSlug === item.slug;
        return (
          <motion.a
            key={item.slug}
            href={`#${item.slug}`}
            onClick={onNavigate}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
            transition={SPRING_SNAPPY}
            className="focus-ring relative flex items-center gap-3 rounded-full px-4 py-2 text-[13px]"
            style={{
              fontFamily: SANS_STACK,
              color: active ? accentInk : "var(--brand-muted)",
              fontWeight: active ? 700 : 600,
            }}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full"
                style={{ backgroundColor: "var(--brand-accent)" }}
                transition={SPRING_SNAPPY}
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

export function StudioPortalTemplate({
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

  const accentHex = data.colors.find((c) => c.role === "accent")?.hex ?? data.colors.find((c) => c.role === "primary")?.hex ?? "#1D1D1B";
  const accentInk = isLight(accentHex) ? DARK_INK : LIGHT_INK;

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
            <p className="mb-8 text-[15px] font-black tracking-tight uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
              {data.name}
            </p>
            <NavList activeSlug={activeSlug} accentInk={accentInk} layoutId="studio-nav-pill-desktop" />
          </div>
          <div className="text-[11px]" style={{ fontFamily: SANS_STACK, color: "var(--brand-muted)" }}>
            <p>Last updated {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
            <p className="mt-1">Powered by Brandly</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur lg:hidden"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand-background) 92%, transparent)" }}
          >
            <span className="text-[14px] font-black tracking-tight uppercase" style={{ fontFamily: SANS_STACK, color: "var(--brand-text)" }}>
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

          <StudioHero data={data} />
          {TEMPLATE_NAV.map((item) => {
            const Section = SECTION_COMPONENTS[item.slug];
            return <Section key={item.slug} data={data} />;
          })}
          <StudioFooter data={data} />
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="px-3 pb-6">
          <NavList activeSlug={activeSlug} onNavigate={() => setDrawerOpen(false)} accentInk={accentInk} layoutId="studio-nav-pill-mobile" />
        </div>
      </Drawer>
    </div>
  );
}
