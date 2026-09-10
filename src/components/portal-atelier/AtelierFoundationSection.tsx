import { BrandData } from "@/lib/types";
import { AtelierSection } from "./AtelierSection";
import { BrandPyramid } from "../brand/BrandPyramid";

export function AtelierFoundationSection({ data }: { data: BrandData }) {
  return (
    <AtelierSection
      id="foundation"
      index="01"
      title="Foundation"
      subtitle="Everything the brand does ladders up to one idea."
      component={<BrandPyramid data={data} variant="portal" />}
      copy={
        <>
          {data.essence && <p>“{data.essence}”</p>}
          <p>{data.purpose}</p>
        </>
      }
    />
  );
}
