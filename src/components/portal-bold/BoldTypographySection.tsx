import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { fontStack } from "@/lib/fonts";

export function BoldTypographySection({ data }: { data: BrandData }) {
  const { typography } = data;

  return (
    <BoldSection id="typography" index="08" title="Typography" subtitle="The typefaces and scale that carry the brand's voice." dark>
      <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {[typography.primary, typography.secondary].map((font, i) => (
          <div key={i}>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--brand-accent)" }}>
              {i === 0 ? "Primary" : "Secondary"}
            </p>
            <p
              className="mt-2 text-[56px] leading-none sm:text-[80px]"
              style={{ fontFamily: fontStack(font.family), color: "var(--brand-background)" }}
            >
              Aa
            </p>
            <p className="mt-2 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: "color-mix(in srgb, var(--brand-background) 65%, transparent)" }}>
              {font.family}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {typography.styles.map((style) => {
          const font = style.fontRef === "secondary" ? typography.secondary : typography.primary;
          return (
            <div key={style.id} className="border-t py-6" style={{ borderColor: "color-mix(in srgb, var(--brand-background) 15%, transparent)" }}>
              <span className="mb-2 block font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
                {style.name} · {style.size}px
              </span>
              <p
                style={{
                  fontFamily: fontStack(font.family),
                  fontWeight: style.weight,
                  fontSize: `clamp(20px, ${style.size / 2}px + 2vw, ${style.size}px)`,
                  lineHeight: style.lineHeight,
                  letterSpacing: `${style.letterSpacing}em`,
                  color: "var(--brand-background)",
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          );
        })}
      </div>
    </BoldSection>
  );
}
