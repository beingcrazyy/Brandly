import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";

export function BoldGraphicsSection({ data }: { data: BrandData }) {
  return (
    <BoldSection id="graphics" index="11" title="Graphic Elements" subtitle="Patterns, textures and decorative marks that extend the identity.">
      {data.graphics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {data.graphics.map((g) => (
            <div key={g.id}>
              <div className="aspect-square overflow-hidden">
                <FilePreview file={g.file} alt={g.name} fit="cover" />
              </div>
              <p className="mt-3 text-[13px] font-bold uppercase" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {g.name}
              </p>
              <p className="font-mono text-[11px] tracking-wide uppercase" style={{ color: "var(--brand-accent)" }}>
                {g.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </BoldSection>
  );
}
