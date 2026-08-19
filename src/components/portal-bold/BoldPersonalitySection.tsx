import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { PersonalityAxes } from "../brand/PersonalityAxes";

export function BoldPersonalitySection({ data }: { data: BrandData }) {
  return (
    <BoldSection id="personality" index="04" title="Personality" subtitle="The human character behind the brand." dark>
      {data.personalityTraits.length > 0 && (
        <p className="mb-16 max-w-4xl text-[28px] leading-tight font-medium sm:text-[44px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}>
          {data.personalityTraits.map((t, i) => (
            <span key={t}>
              <span style={{ color: i % 2 === 0 ? "var(--brand-accent)" : "inherit" }}>{t}</span>
              {i < data.personalityTraits.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      )}

      {data.personalityScales.length > 0 && (
        <div className="flex max-w-2xl flex-col gap-8">
          {data.personalityScales.map((scale) => (
            <PersonalityAxes
              key={scale.id}
              scale={scale}
              accentColor="var(--brand-accent)"
              trackColor="color-mix(in srgb, var(--brand-background) 20%, transparent)"
              labelColor="color-mix(in srgb, var(--brand-background) 75%, transparent)"
            />
          ))}
        </div>
      )}
    </BoldSection>
  );
}
