import { BrandData } from "@/lib/types";
import { StudioSection } from "./StudioSection";
import { AudiencePersonaCard } from "../brand/AudiencePersonaCard";

export function StudioAudienceSection({ data }: { data: BrandData }) {
  return (
    <StudioSection
      id="audience"
      index="05"
      title="Audience"
      subtitle="Who this brand is built for."
      data={data}
      component={<AudiencePersonaCard profile={data.audience.primary} label="Primary Audience" variant="portal" />}
      copy={<p>{data.audience.primary.needs}</p>}
    />
  );
}
