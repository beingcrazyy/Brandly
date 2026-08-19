import { BrandData, TypeStyle } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { fontStack } from "@/lib/fonts";
import { CopyButton } from "../ui/CopyButton";

const SAMPLE = "The quick brown fox jumps over the lazy dog.";

function Specimen({ style, data }: { style: TypeStyle; data: BrandData }) {
  const font = style.fontRef === "secondary" ? data.typography.secondary : data.typography.primary;
  const css = `font-family: ${fontStack(font.family)};\nfont-weight: ${style.weight};\nfont-size: ${style.size}px;\nline-height: ${style.lineHeight};\nletter-spacing: ${style.letterSpacing}em;`;

  return (
    <div className="flex flex-col gap-3 border-b py-8" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
          {style.name} · {style.size}px / {font.family} {style.weight}
        </span>
        <CopyButton value={css} label="Copy CSS" />
      </div>
      <p
        style={{
          fontFamily: fontStack(font.family),
          fontWeight: style.weight,
          fontSize: `clamp(20px, ${style.size / 2}px + 2vw, ${style.size}px)`,
          lineHeight: style.lineHeight,
          letterSpacing: `${style.letterSpacing}em`,
          color: "var(--brand-text)",
        }}
      >
        {SAMPLE}
      </p>
    </div>
  );
}

export function TypographySection({ data }: { data: BrandData }) {
  const { typography } = data;

  return (
    <PortalSection id="typography" index="08" title="Typography" subtitle="The typefaces and scale that carry the brand's voice." tint>
      <div className="mb-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {[typography.primary, typography.secondary].map((font, i) => (
          <div key={i} className="flex items-end justify-between border-b pb-6" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)" }}>
            <div>
              <p className="text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-muted)" }}>
                {i === 0 ? "Primary" : "Secondary"}
              </p>
              <p className="mt-1 text-[15px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {font.family}
              </p>
            </div>
            <span style={{ fontFamily: fontStack(font.family), fontWeight: 500, color: "var(--brand-text)" }} className="text-[56px] leading-none">
              Aa
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {typography.styles.map((style) => (
          <Specimen key={style.id} style={style} data={data} />
        ))}
      </div>
    </PortalSection>
  );
}
