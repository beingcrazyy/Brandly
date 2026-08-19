import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { BrandDNADiagram } from "../brand/BrandDNADiagram";

function Block({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <div>
      <p className="mb-2 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
        {label}
      </p>
      <p className="text-[16px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
        {text}
      </p>
    </div>
  );
}

export function DnaSection({ data }: { data: BrandData }) {
  return (
    <PortalSection id="dna" index="01" title="Brand DNA" subtitle="Explore how purpose becomes values, personality and voice — click any node.">
      <BrandDNADiagram data={data} variant="portal" />

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <Block label="Purpose" text={data.purpose} />
        <Block label="Mission" text={data.mission} />
        <Block label="Vision" text={data.vision} />
      </div>

      {data.story && (
        <p
          className="mt-14 max-w-3xl text-[20px] leading-relaxed sm:text-[24px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
        >
          {data.story}
        </p>
      )}

      {data.values.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.values.map((v, i) => (
            <div
              key={v.id}
              className="overflow-hidden border"
              style={{
                borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)",
                borderRadius: "var(--radius-medium)",
              }}
            >
              <div className="h-1.5" style={{ backgroundColor: "var(--brand-accent)" }} />
              <div className="p-6">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full font-mono text-[13px]"
                  style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 16%, transparent)", color: "var(--brand-accent)" }}
                >
                  {v.icon || String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[17px] font-semibold" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                  {v.name}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalSection>
  );
}
