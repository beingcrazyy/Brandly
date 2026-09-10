import { BrandData } from "@/lib/types";
import { AtelierSection } from "./AtelierSection";
import { PositioningMap } from "../brand/PositioningMap";

export function AtelierPositioningSection({ data }: { data: BrandData }) {
  return (
    <AtelierSection
      id="positioning"
      index="02"
      title="Positioning"
      subtitle="Where this brand sits, relative to the field."
      component={<PositioningMap data={data} variant="portal" />}
      tint
      copy={<p>{data.positioning.statement}</p>}
    />
  );
}
