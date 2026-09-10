import { BrandData } from "@/lib/types";
import { StudioSection } from "./StudioSection";
import { PositioningMap } from "../brand/PositioningMap";

export function StudioPositioningSection({ data }: { data: BrandData }) {
  return (
    <StudioSection
      id="positioning"
      index="02"
      title="Positioning"
      subtitle="Where this brand sits, relative to the field."
      data={data}
      tint
      component={<PositioningMap data={data} variant="portal" />}
      copy={<p>{data.positioning.statement}</p>}
    />
  );
}
