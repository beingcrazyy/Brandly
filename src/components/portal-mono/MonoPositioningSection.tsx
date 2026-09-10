import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { PositioningMap } from "../brand/PositioningMap";

export function MonoPositioningSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
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
