import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { BrandPyramid } from "../brand/BrandPyramid";

export function MonoFoundationSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="foundation"
      index="01"
      title="Foundation"
      subtitle="Everything the brand does ladders up to one idea."
      component={<BrandPyramid data={data} variant="portal" />}
      copy={
        <>
          {data.essence && <p className="mb-3 text-[17px] font-medium" style={{ color: "var(--brand-text)" }}>“{data.essence}”</p>}
          <p>{data.purpose}</p>
        </>
      }
    />
  );
}
