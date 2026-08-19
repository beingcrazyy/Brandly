import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";
import { X } from "lucide-react";

const BG_STYLE: Record<string, React.CSSProperties> = {
  light: { backgroundColor: "#FFFFFF" },
  dark: { backgroundColor: "#14140F" },
  brand: { backgroundColor: "var(--brand-primary)" },
};

export function LogoSection({ data }: { data: BrandData }) {
  const { logoGuidelines: g } = data;

  return (
    <PortalSection id="logo" index="06" title="Logo" subtitle="Every approved lockup, and how to use it well.">
      {data.logos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.logos.map((logo) => (
            <div key={logo.id}>
              <div
                className="flex aspect-[16/10] items-center justify-center border p-10"
                style={{ ...BG_STYLE[logo.recommendedBackground], borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)", borderRadius: "var(--radius-medium)" }}
              >
                <FilePreview file={logo.file} alt={logo.name} className="p-4" />
              </div>
              <p className="mt-3 text-[14px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {logo.name}
              </p>
              {logo.description && (
                <p className="mt-0.5 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                  {logo.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
            Clear Space
          </p>
          <p className="mt-1 text-[28px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {g.clearSpace}px
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
            Minimum Width
          </p>
          <p className="mt-1 text-[28px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {g.minWidth}px
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
            Minimum Height
          </p>
          <p className="mt-1 text-[28px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {g.minHeight}px
          </p>
        </div>
      </div>

      {g.incorrectExamples.length > 0 && (
        <div className="mt-16">
          <p className="mb-6 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-muted)" }}>
            Incorrect Usage
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {g.incorrectExamples.map((ex) => (
              <div key={ex.id}>
                <div
                  className="relative flex aspect-square items-center justify-center border bg-white p-8"
                  style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)", borderRadius: "var(--radius-medium)" }}
                >
                  <FilePreview file={ex.file} alt={ex.title} />
                  <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                    <X size={13} />
                  </div>
                </div>
                <p className="mt-3 text-[14px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                  {ex.title}
                </p>
                <p className="mt-0.5 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                  {ex.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PortalSection>
  );
}
