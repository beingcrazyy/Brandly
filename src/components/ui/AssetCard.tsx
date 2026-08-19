import { FileRef } from "@/lib/types";
import { FilePreview } from "./FilePreview";

export function AssetCard({
  name,
  subtitle,
  file,
  footer,
  aspect = "square",
}: {
  name: string;
  subtitle?: string;
  file: FileRef | null;
  footer?: React.ReactNode;
  aspect?: "square" | "wide";
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[#E4DFD3] bg-white transition-shadow hover:shadow-[0_6px_20px_rgba(20,20,15,0.06)]">
      <div className={`${aspect === "square" ? "aspect-square" : "aspect-[4/3]"} border-b border-[#E4DFD3] bg-black/[0.015] overflow-hidden`}>
        <FilePreview file={file} alt={name} className="p-6 transition-transform duration-500 group-hover:scale-[1.05]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div>
          <p className="truncate text-[13px] font-medium text-[#14140F]">{name}</p>
          {subtitle && <p className="truncate font-mono text-[11px] text-neutral-500">{subtitle}</p>}
        </div>
        {footer && <div className="mt-auto pt-1">{footer}</div>}
      </div>
    </div>
  );
}
