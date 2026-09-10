import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { PersonalityAxes } from "../brand/PersonalityAxes";

export function MonoPersonalitySection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="personality"
      index="04"
      title="Personality"
      subtitle="If the brand walked in the room, how would it feel?"
      component={
        <div className="flex flex-col gap-7">
          {data.personalityScales.map((scale) => (
            <PersonalityAxes key={scale.id} scale={scale} accentColor="var(--brand-accent)" trackColor="color-mix(in srgb, var(--brand-text) 15%, transparent)" />
          ))}
        </div>
      }
      copy={<p>{data.personalityTraits.join(" · ") || "No traits defined yet."}</p>}
    />
  );
}
