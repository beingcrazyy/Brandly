"use client";

import { useMemo, useState } from "react";
import { BrandData, ColorToken } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { ColorSystem } from "../brand/ColorSystem";
import { ColorInspectorBody } from "../brand/ColorInspectorBody";
import { Inspector } from "../interaction/Inspector";
import { buildTokens } from "@/lib/tokens";

export function BoldColorsSection({ data }: { data: BrandData }) {
  const [active, setActive] = useState<ColorToken | null>(null);
  const tokens = useMemo(() => buildTokens(data), [data]);

  return (
    <BoldSection id="colors" index="07" title="Colors" subtitle="Select a swatch for exact values, contrast and usage.">
      {data.colors.length === 0 ? (
        <p style={{ color: "var(--brand-muted)" }} className="text-[14px]">
          No colors defined yet.
        </p>
      ) : (
        <ColorSystem colors={data.colors} onSelect={setActive} />
      )}

      <Inspector open={!!active} onClose={() => setActive(null)} eyebrow={active?.role} title={active?.name ?? ""}>
        {active && <ColorInspectorBody mode="readOnly" color={active} background={tokens["--brand-background"]} text={tokens["--brand-text"]} />}
      </Inspector>
    </BoldSection>
  );
}
