import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { ValuesGrid } from "../brand/ValuesGrid";

export function MonoValuesSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="values"
      index="06"
      title="Values"
      subtitle="What this brand won't compromise on."
      component={<ValuesGrid values={data.values} variant="portal" />}
      copy={<p>Click any value for the full thinking behind it.</p>}
    />
  );
}
