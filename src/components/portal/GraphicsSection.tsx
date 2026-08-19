import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";

export function GraphicsSection({ data }: { data: BrandData }) {
  if (data.graphics.length === 0) {
    return (
      <PortalSection id="graphics" index="11" title="Graphic Elements" subtitle="Patterns, textures and decorative marks.">
        <p className="text-[14px]" style={{ color: "var(--brand-muted)" }}>
          No graphic elements published yet.
        </p>
      </PortalSection>
    );
  }

  return (
    <PortalSection id="graphics" index="11" title="Graphic Elements" subtitle="Patterns, textures and decorative marks that extend the identity.">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {data.graphics.map((g) => (
          <div key={g.id}>
            <div
              className="flex aspect-square items-center justify-center overflow-hidden border"
              style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", borderRadius: "var(--radius-medium)" }}
            >
              <FilePreview file={g.file} alt={g.name} fit="cover" />
            </div>
            <p className="mt-3 text-[13px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
              {g.name}
            </p>
            <p className="text-[11px] tracking-wide uppercase" style={{ color: "var(--brand-accent)" }}>
              {g.category}
            </p>
          </div>
        ))}
      </div>
    </PortalSection>
  );
}
