import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";

export function PositioningSection({ data }: { data: BrandData }) {
  const { positioning: p } = data;
  const rows = [
    { label: "Category", text: p.category },
    { label: "Differentiator", text: p.differentiator },
    { label: "Competitive Advantage", text: p.competitiveAdvantage },
    { label: "Brand Promise", text: p.promise },
    { label: "Reason to Believe", text: p.reasonToBelieve },
  ].filter((r) => r.text);

  return (
    <PortalSection id="positioning" index="02" title="Positioning" subtitle="Where the brand sits, and why it wins." tint>
      {p.statement && (
        <div
          className="relative overflow-hidden rounded-[2px] p-8 sm:p-10"
          style={{ backgroundColor: "var(--brand-primary)", borderRadius: "var(--radius-large)" }}
        >
          <span
            className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 55%, transparent)" }}
          />
          <p
            className="relative max-w-3xl text-[24px] leading-snug font-medium sm:text-[32px]"
            style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}
          >
            {p.statement}
          </p>
        </div>
      )}
      {rows.length > 0 && (
        <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label} className="border-l-2 pl-4" style={{ borderColor: "var(--brand-accent)" }}>
              <dt className="mb-1.5 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
                {r.label}
              </dt>
              <dd className="text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {r.text}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </PortalSection>
  );
}
