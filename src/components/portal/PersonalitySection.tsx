import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { PersonalityAxes } from "../brand/PersonalityAxes";

export function PersonalitySection({ data }: { data: BrandData }) {
  return (
    <PortalSection id="personality" index="04" title="Personality" subtitle="The human character behind the brand.">
      {data.personalityTraits.length > 0 && (
        <div className="mb-14 flex flex-wrap gap-3">
          {data.personalityTraits.map((trait, i) => {
            const useAccent = i % 2 === 0;
            return (
              <span
                key={trait}
                className="px-4 py-2 text-[14px] font-medium"
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: useAccent ? "var(--brand-background)" : "var(--brand-text)",
                  backgroundColor: useAccent ? "var(--brand-accent)" : "color-mix(in srgb, var(--brand-text) 8%, transparent)",
                  borderRadius: "var(--radius-large)",
                }}
              >
                {trait}
              </span>
            );
          })}
        </div>
      )}

      {data.personalityScales.length > 0 && (
        <div className="flex max-w-2xl flex-col gap-8">
          {data.personalityScales.map((scale) => (
            <PersonalityAxes
              key={scale.id}
              scale={scale}
              accentColor="var(--brand-accent)"
              trackColor="color-mix(in srgb, var(--brand-text) 15%, transparent)"
            />
          ))}
        </div>
      )}
    </PortalSection>
  );
}
