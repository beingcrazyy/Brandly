import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";

export function BoldPositioningSection({ data }: { data: BrandData }) {
  const { positioning: p } = data;
  const rows = [
    { label: "Category", text: p.category },
    { label: "Differentiator", text: p.differentiator },
    { label: "Competitive Advantage", text: p.competitiveAdvantage },
    { label: "Brand Promise", text: p.promise },
    { label: "Reason to Believe", text: p.reasonToBelieve },
  ].filter((r) => r.text);

  return (
    <BoldSection id="positioning" index="02" title="Positioning" subtitle="Where the brand sits, and why it wins." dark>
      {p.statement && (
        <p
          className="max-w-4xl text-[28px] leading-tight font-medium sm:text-[42px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}
        >
          {p.statement}
        </p>
      )}
      {rows.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <div key={r.label}>
              <p
                className="mb-2 inline-block rounded-full px-2.5 py-1 font-mono text-[11px] tracking-[0.1em] uppercase"
                style={{ backgroundColor: "var(--brand-accent)", color: "#fff" }}
              >
                {r.label}
              </p>
              <p
                className="text-[15px] leading-relaxed"
                style={{ fontFamily: "var(--font-secondary)", color: "color-mix(in srgb, var(--brand-background) 85%, transparent)" }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </BoldSection>
  );
}
