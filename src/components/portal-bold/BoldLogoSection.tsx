import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";

const BG_STYLE: Record<string, React.CSSProperties> = {
  light: { backgroundColor: "#FFFFFF" },
  dark: { backgroundColor: "#0A0A0A" },
  brand: { backgroundColor: "var(--brand-primary)" },
};

export function BoldLogoSection({ data }: { data: BrandData }) {
  const { logoGuidelines: g } = data;

  return (
    <BoldSection id="logo" index="06" title="Logo" subtitle="Every approved lockup, and how to use it well." dark>
      {data.logos.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.logos.map((logo) => (
            <div key={logo.id} className="flex aspect-[16/10] items-center justify-center p-10" style={BG_STYLE[logo.recommendedBackground]}>
              <FilePreview file={logo.file} alt={logo.name} className="p-4" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 grid grid-cols-3 gap-6">
        {[
          { label: "Clear Space", value: `${g.clearSpace}px` },
          { label: "Min Width", value: `${g.minWidth}px` },
          { label: "Min Height", value: `${g.minHeight}px` },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-mono text-[32px] font-bold sm:text-[48px]" style={{ color: "var(--brand-accent)" }}>
              {s.value}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: "color-mix(in srgb, var(--brand-background) 60%, transparent)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </BoldSection>
  );
}
