import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";

export function PortalFooter({ data }: { data: BrandData }) {
  const logo = data.logos.find((l) => l.variant === "primary")?.file ?? null;

  return (
    <footer
      className="border-t px-6 py-12 sm:px-10 lg:px-16"
      style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          {logo && <div className="h-6 w-auto max-w-[100px]"><FilePreview file={logo} alt={data.name} className="h-full object-contain object-left" /></div>}
          <div>
            <p className="text-[13px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
              {data.name}
            </p>
            {data.website && (
              <a href={data.website} target="_blank" rel="noreferrer" className="text-[12px] hover:underline" style={{ color: "var(--brand-muted)" }}>
                {data.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
        <p className="text-[12px]" style={{ color: "var(--brand-muted)" }}>
          Powered by Brandly
        </p>
      </div>
    </footer>
  );
}
