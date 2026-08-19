import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { BrandDNADiagram } from "../brand/BrandDNADiagram";

export function BoldDnaSection({ data }: { data: BrandData }) {
  return (
    <BoldSection id="dna" index="01" title="Brand DNA" subtitle="Explore how purpose becomes values, personality and voice.">
      <BrandDNADiagram data={data} variant="portal" />

      {data.values.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[2px] sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: "var(--brand-text)" }}>
          {data.values.map((v, i) => (
            <div key={v.id} className="p-6" style={{ backgroundColor: "var(--brand-background)" }}>
              <p className="font-mono text-[24px] font-bold" style={{ color: "var(--brand-accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[17px] font-bold uppercase" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {v.name}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </BoldSection>
  );
}
