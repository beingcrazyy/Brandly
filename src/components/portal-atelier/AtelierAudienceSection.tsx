import { BrandData } from "@/lib/types";
import { AtelierSection } from "./AtelierSection";
import { AudiencePersonaCard } from "../brand/AudiencePersonaCard";

export function AtelierAudienceSection({ data }: { data: BrandData }) {
  return (
    <AtelierSection
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
