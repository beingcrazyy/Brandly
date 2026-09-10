import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { VisualDirectionPanel } from "../brand/VisualDirectionPanel";
import { fontStack } from "@/lib/fonts";

export function MonoVisualDirectionSection({ data }: { data: BrandData }) {
  const { typography } = data;
  return (
    <MonoSection
      id="visual-direction"
      index="09"
      title="Visual Direction"
      subtitle="The colors and type that carry this brand."
      tint
      component={
        <div className="flex flex-col gap-8">
          <VisualDirectionPanel data={data} />
          <div className="border-t pt-6" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)" }}>
            <p style={{ fontFamily: fontStack(typography.primary.family), color: "var(--brand-text)" }} className="text-[40px] leading-none font-medium">
              Aa
            </p>
            <p className="mt-2 text-[12px] tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
              {typography.primary.family} · {typography.secondary.family}
            </p>
          </div>
        </div>
      }
      copy={<p>Click any swatch for exact values and contrast ratios.</p>}
    />
  );
}
