"use client";

import { BrandData, IconAsset } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";
import { useFileUrl } from "@/lib/useFileUrl";
import { downloadFile } from "@/lib/files";
import { downloadSvgAsPng } from "@/lib/svgToPng";

function IconCard({ icon }: { icon: IconAsset }) {
  const url = useFileUrl(icon.file?.fileId);

  return (
    <div className="flex flex-col items-center gap-3 border p-6 text-center" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", borderRadius: "var(--radius-medium)" }}>
      <div className="flex h-10 w-10 items-center justify-center" style={{ color: "var(--brand-text)" }}>
        <FilePreview file={icon.file} alt={icon.name} />
      </div>
      <p className="text-[13px] font-medium" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
        {icon.name}
      </p>
      <div className="flex gap-3 text-[11px] font-medium tracking-wide uppercase" style={{ color: "var(--brand-accent)" }}>
        <button className="focus-ring hover:underline" onClick={() => icon.file && downloadFile(icon.file.fileId, icon.file.name)}>
          SVG
        </button>
        <button className="focus-ring hover:underline" onClick={() => url && downloadSvgAsPng(url, `${icon.name}.png`)}>
          PNG
        </button>
      </div>
    </div>
  );
}

export function IconographySection({ data }: { data: BrandData }) {
  const { iconography: icon } = data;
  const rows = [
    { label: "Style", text: icon.style },
    { label: "Stroke Width", text: `${icon.strokeWidth}px` },
    { label: "Corners", text: icon.cornerTreatment },
    { label: "Fill", text: icon.fillStyle },
    { label: "Size Guidance", text: icon.sizeGuidance },
  ].filter((r) => r.text);

  return (
    <PortalSection id="iconography" index="10" title="Iconography" subtitle="A consistent, functional icon system." tint>
      {rows.length > 0 && (
        <dl className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-5">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "var(--brand-muted)" }}>
                {r.label}
              </dt>
              <dd className="mt-1 text-[14px] capitalize" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {r.text}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {icon.icons.length > 0 && (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6">
          {icon.icons.map((ic) => (
            <IconCard key={ic.id} icon={ic} />
          ))}
        </div>
      )}
    </PortalSection>
  );
}
