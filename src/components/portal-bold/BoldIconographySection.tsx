"use client";

import { BrandData, IconAsset } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";
import { useFileUrl } from "@/lib/useFileUrl";
import { downloadFile } from "@/lib/files";
import { downloadSvgAsPng } from "@/lib/svgToPng";

function IconTile({ icon }: { icon: IconAsset }) {
  const url = useFileUrl(icon.file?.fileId);
  return (
    <div className="flex flex-col items-center gap-3 p-6 text-center" style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 8%, transparent)" }}>
      <div className="flex h-10 w-10 items-center justify-center" style={{ color: "var(--brand-background)" }}>
        <FilePreview file={icon.file} alt={icon.name} />
      </div>
      <p className="text-[13px] font-medium" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-background)" }}>
        {icon.name}
      </p>
      <div className="flex gap-3 font-mono text-[11px] tracking-wide uppercase" style={{ color: "var(--brand-accent)" }}>
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

export function BoldIconographySection({ data }: { data: BrandData }) {
  const { iconography } = data;
  return (
    <BoldSection id="iconography" index="10" title="Iconography" subtitle="A consistent, functional icon system." dark>
      {iconography.icons.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">
          {iconography.icons.map((ic) => (
            <IconTile key={ic.id} icon={ic} />
          ))}
        </div>
      )}
    </BoldSection>
  );
}
