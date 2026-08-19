import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";
import { ChevronDown } from "lucide-react";

export function BoldHero({ data }: { data: BrandData }) {
  const logo = data.logos.find((l) => l.variant === "light")?.file ?? data.logos.find((l) => l.variant === "primary")?.file ?? null;
  const swatches = data.colors.slice(0, 6);

  return (
    <section
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-10 sm:px-12 lg:px-20"
      style={{ backgroundColor: "var(--brand-primary)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 90% 100%, color-mix(in srgb, var(--brand-accent) 45%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        {logo ? (
          <div className="h-8 w-auto max-w-[150px]">
            <FilePreview file={logo} alt={data.name} className="h-full w-full object-contain object-left" />
          </div>
        ) : (
          <span className="font-mono text-[13px] tracking-[0.2em] uppercase" style={{ color: "var(--brand-background)" }}>
            {data.name}
          </span>
        )}
        <span
          className="rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase"
          style={{ backgroundColor: "color-mix(in srgb, var(--brand-background) 12%, transparent)", color: "var(--brand-background)" }}
        >
          {data.industry || "Brand System"}
        </span>
      </div>

      <div className="relative">
        <h1
          className="max-w-5xl text-[64px] leading-[0.9] font-bold uppercase sm:text-[120px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}
        >
          {data.name}
        </h1>
        {data.tagline && (
          <p
            className="mt-6 max-w-xl text-[22px] font-medium sm:text-[28px]"
            style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-accent)" }}
          >
            {data.tagline}
          </p>
        )}
      </div>

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        {data.positioning.statement && (
          <p
            className="max-w-md text-[14px] leading-relaxed"
            style={{ fontFamily: "var(--font-secondary)", color: "color-mix(in srgb, var(--brand-background) 70%, transparent)" }}
          >
            {data.positioning.statement}
          </p>
        )}
        <div className="flex items-center gap-4">
          {swatches.length > 0 && (
            <div className="flex items-center gap-1.5">
              {swatches.map((c) => (
                <span key={c.id} title={c.name} className="h-6 w-6 rounded-full" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          )}
          <ChevronDown size={18} style={{ color: "var(--brand-background)" }} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
