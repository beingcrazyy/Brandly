import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { ArchetypeWheel } from "../brand/ArchetypeWheel";
import { findArchetype } from "@/lib/archetypes";

export function MonoArchetypeSection({ data }: { data: BrandData }) {
  const primary = findArchetype(data.archetype.primary);
  return (
    <MonoSection
      id="archetype"
      index="03"
      title="Archetype"
      subtitle="The character the brand plays."
      component={<ArchetypeWheel primary={data.archetype.primary} secondary={data.archetype.secondary} brandName={data.name} variant="portal" />}
      copy={<p>{primary ? primary.description : "No primary archetype set yet."}</p>}
    />
  );
}
