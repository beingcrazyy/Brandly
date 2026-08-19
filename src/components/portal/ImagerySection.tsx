import { BrandData, ImageExample } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";
import { Check, X } from "lucide-react";

function ExampleGrid({ label, examples, positive }: { label: string; examples: ImageExample[]; positive: boolean }) {
  if (examples.length === 0) return null;
  return (
    <div>
      <p className="mb-4 flex items-center gap-1.5 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: positive ? "var(--brand-accent)" : "var(--brand-muted)" }}>
        {positive ? <Check size={13} /> : <X size={13} />} {label}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {examples.map((ex) => (
          <div key={ex.id}>
            <div className="aspect-square overflow-hidden" style={{ borderRadius: "var(--radius-medium)" }}>
              <FilePreview file={ex.file} alt={ex.caption} fit="cover" />
            </div>
            {ex.caption && (
              <p className="mt-2 text-[12px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {ex.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImagerySection({ data }: { data: BrandData }) {
  const { imagery } = data;
  const rows = [
    { label: "Photography Style", text: imagery.photographyStyle },
    { label: "Lighting", text: imagery.lighting },
    { label: "Composition", text: imagery.composition },
    { label: "Color Treatment", text: imagery.colorTreatment },
    { label: "Subjects", text: imagery.subjects },
  ].filter((r) => r.text);

  return (
    <PortalSection id="imagery" index="09" title="Imagery" subtitle="The photographic language the brand uses to show, not tell.">
      {rows.length > 0 && (
        <dl className="mb-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="mb-1.5 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
                {r.label}
              </dt>
              <dd className="text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {r.text}
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div className="flex flex-col gap-10">
        <ExampleGrid label="Do" examples={imagery.doExamples} positive />
        <ExampleGrid label="Don't" examples={imagery.dontExamples} positive={false} />
      </div>
    </PortalSection>
  );
}
