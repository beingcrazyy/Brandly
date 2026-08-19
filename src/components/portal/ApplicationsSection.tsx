import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";

export function ApplicationsSection({ data }: { data: BrandData }) {
  if (data.applications.length === 0) {
    return (
      <PortalSection id="applications" index="12" title="Applications" subtitle="The brand applied to real touchpoints." tint>
        <p className="text-[14px]" style={{ color: "var(--brand-muted)" }}>
          No applications published yet.
        </p>
      </PortalSection>
    );
  }

  return (
    <PortalSection id="applications" index="12" title="Applications" subtitle="The brand applied to real, tangible touchpoints." tint>
      <div className="flex flex-col gap-16">
        {data.applications.map((app, i) => (
          <div key={app.id} className={`grid grid-cols-1 items-center gap-8 sm:grid-cols-2 ${i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
            <div
              className="aspect-[4/3] overflow-hidden"
              style={{ borderRadius: "var(--radius-large)" }}
            >
              <FilePreview file={app.file} alt={app.title} fit="cover" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
                {app.category}
              </span>
              <h3 className="mt-2 text-[24px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {app.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {app.description}
              </p>
              {app.usageNotes && (
                <p className="mt-4 text-[13px] italic" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                  {app.usageNotes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </PortalSection>
  );
}
