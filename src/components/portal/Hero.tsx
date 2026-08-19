import { BrandData } from "@/lib/types";
import { FilePreview } from "../ui/FilePreview";

export function Hero({ data }: { data: BrandData }) {
  const primaryLogo = data.logos.find((l) => l.variant === "primary")?.file ?? data.logos[0]?.file ?? null;
  const swatches = data.colors.slice(0, 5);

  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-28 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 85% 0%, color-mix(in srgb, var(--brand-accent) 38%, transparent), transparent 70%)," +
            "radial-gradient(ellipse 55% 45% at 5% 100%, color-mix(in srgb, var(--brand-primary) 16%, transparent), transparent 70%)," +
            "linear-gradient(180deg, var(--brand-secondary), var(--brand-background) 55%)",
        }}
      />
      {data.coverImage && (
        <div className="absolute inset-0 -z-10 opacity-[0.85]">
          <FilePreview file={data.coverImage} alt="" fit="cover" className="h-full w-full" />
        </div>
      )}
      <div className="animate-fade-in mx-auto max-w-5xl">
        {primaryLogo && (
          <div className="mb-10 h-10 w-auto max-w-[180px]">
            <FilePreview file={primaryLogo} alt={`${data.name} logo`} className="h-full w-full object-contain object-left" />
          </div>
        )}
        <p
          className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.1em] uppercase"
          style={{
            fontFamily: "var(--font-secondary)",
            color: "var(--brand-accent)",
            backgroundColor: "color-mix(in srgb, var(--brand-accent) 14%, transparent)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand-accent)" }} />
          {data.industry || "Digital Brand System"}
        </p>
        <h1
          className="max-w-3xl text-[48px] leading-[1.02] font-medium sm:text-[76px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
        >
          {data.name}
        </h1>
        {data.tagline && (
          <p
            className="mt-6 max-w-xl border-l-2 pl-4 text-[20px] sm:text-[24px]"
            style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)", opacity: 0.85, borderColor: "var(--brand-accent)" }}
          >
            {data.tagline}
          </p>
        )}
        {data.positioning.statement && (
          <p
            className="mt-8 max-w-2xl text-[15px] leading-relaxed sm:text-[17px]"
            style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}
          >
            {data.positioning.statement}
          </p>
        )}
        {swatches.length > 0 && (
          <div className="mt-10 flex items-center gap-2">
            {swatches.map((c) => (
              <span
                key={c.id}
                title={c.name}
                className="h-7 w-7 rounded-full shadow-sm"
                style={{
                  backgroundColor: c.hex,
                  boxShadow: "0 0 0 2px var(--brand-background), 0 0 0 3px color-mix(in srgb, var(--brand-text) 15%, transparent)",
                }}
              />
            ))}
            <span className="ml-1 font-mono text-[11px] tracking-wide uppercase" style={{ color: "var(--brand-muted)" }}>
              Palette
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
