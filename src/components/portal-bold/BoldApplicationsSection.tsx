import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";

export function BoldApplicationsSection({ data }: { data: BrandData }) {
  return (
    <BoldSection id="applications" index="12" title="Applications" subtitle="The brand applied to real, tangible touchpoints." dark>
      {data.applications.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.applications.map((app) => (
            <div key={app.id} className="overflow-hidden">
              <div className="aspect-[4/3]">
                <FilePreview file={app.file} alt={app.title} fit="cover" />
              </div>
              <div className="pt-4">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
                  {app.category}
                </span>
                <p className="mt-1 text-[20px] font-bold uppercase" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}>
                  {app.title}
                </p>
                <p className="mt-2 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: "color-mix(in srgb, var(--brand-background) 70%, transparent)" }}>
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </BoldSection>
  );
}
