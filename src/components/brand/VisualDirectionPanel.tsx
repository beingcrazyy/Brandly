"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrandData, ColorToken } from "@/lib/types";
import { ColorSystem } from "./ColorSystem";
import { ColorInspectorBody } from "./ColorInspectorBody";
import { Inspector } from "../interaction/Inspector";
import { GrainOverlay } from "../ui/GrainOverlay";
import { buildTokens } from "@/lib/tokens";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

/** The color half of Visual Direction — a shared swatch-grid + Inspector, reused by every template and by the CMS's own Visual Direction page. */
export function VisualDirectionPanel({ data }: { data: BrandData }) {
  const [active, setActive] = useState<ColorToken | null>(null);
  const tokens = useMemo(() => buildTokens(data), [data]);
  const bleedClass = `vd-bleed-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  if (data.colors.length === 0) {
    return (
      <p className="text-[14px]" style={{ color: "var(--brand-muted)" }}>
        No colors defined yet.
      </p>
    );
  }

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className={`relative overflow-hidden ${bleedClass}`}
      >
        {/* Swatches bleed into each other on hover: a blurred pseudo-element inherits each button's own
            background hue and glows past its hard edge, rather than a crisp rectangle. */}
        <style>{`
          .${bleedClass} button { position: relative; isolation: isolate; }
          .${bleedClass} button::after {
            content: ""; position: absolute; inset: -22%; background-color: inherit;
            border-radius: inherit; filter: blur(26px) saturate(1.35); opacity: 0; z-index: -1;
            transition: opacity 300ms ease; pointer-events: none;
          }
          .${bleedClass} button:hover::after, .${bleedClass} button:focus-visible::after { opacity: 0.6; }
        `}</style>
        <GrainOverlay opacity={0.035} />
        <ColorSystem colors={data.colors} onSelect={setActive} variant="portal" />
      </motion.div>
      <Inspector open={!!active} onClose={() => setActive(null)} eyebrow={active?.role} title={active?.name ?? ""}>
        {active && <ColorInspectorBody mode="readOnly" color={active} background={tokens["--brand-background"]} text={tokens["--brand-text"]} />}
      </Inspector>
    </>
  );
}
