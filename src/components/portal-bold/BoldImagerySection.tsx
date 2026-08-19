import { BrandData, ImageExample } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";

function Grid({ label, examples }: { label: string; examples: ImageExample[] }) {
  if (examples.length === 0) return null;
  return (
    <div>
      <p className="mb-4 font-mono text-[12px] tracking-[0.15em] uppercase" style={{ color: "var(--brand-accent)" }}>
        {label}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {examples.map((ex) => (
          <div key={ex.id} className="aspect-square">
            <FilePreview file={ex.file} alt={ex.caption} fit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoldImagerySection({ data }: { data: BrandData }) {
  const { imagery } = data;
  const rows = [
    { label: "Style", text: imagery.photographyStyle },
    { label: "Lighting", text: imagery.lighting },
    { label: "Composition", text: imagery.composition },
    { label: "Color", text: imagery.colorTreatment },
  ].filter((r) => r.text);

  return (
    <BoldSection id="imagery" index="09" title="Imagery" subtitle="The photographic language the brand uses to show, not tell.">
      {rows.length > 0 && (
        <div className="mb-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="font-mono text-[11px] tracking-wide uppercase" style={{ color: "var(--brand-muted)" }}>
                {r.label}
              </p>
              <p className="mt-1 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-10">
        <Grid label="Do" examples={imagery.doExamples} />
        <Grid label="Don't" examples={imagery.dontExamples} />
      </div>
    </BoldSection>
  );
}
