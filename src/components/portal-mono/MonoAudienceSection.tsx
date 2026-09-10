import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { AudiencePersonaCard } from "../brand/AudiencePersonaCard";

export function MonoAudienceSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="audience"
      index="05"
      title="Audience"
      subtitle="Who this brand is built for."
      tint
      component={<AudiencePersonaCard profile={data.audience.primary} label="Primary Audience" variant="portal" />}
      copy={<p>{data.audience.primary.needs}</p>}
    />
  );
}
