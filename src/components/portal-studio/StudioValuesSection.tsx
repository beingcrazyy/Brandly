import { BrandData } from "@/lib/types";
import { StudioSection } from "./StudioSection";
import { ValuesGrid } from "../brand/ValuesGrid";

export function StudioValuesSection({ data }: { data: BrandData }) {
  return (
    <StudioSection
      id="values"
      index="06"
      title="Values"
      subtitle="What this brand won't compromise on."
      data={data}
      component={<ValuesGrid values={data.values} variant="portal" />}
      copy={<p>Click any value for the full thinking behind it.</p>}
    />
  );
}
