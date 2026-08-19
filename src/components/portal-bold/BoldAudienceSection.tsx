import { AudienceProfile, BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";

function ProfileBlock({ label, profile }: { label: string; profile: AudienceProfile }) {
  const rows = [
    { label: "Needs", text: profile.needs },
    { label: "Problems", text: profile.problems },
    { label: "Motivations", text: profile.motivations },
    { label: "Behaviors", text: profile.behaviors },
  ].filter((r) => r.text);

  return (
    <div className="flex-1">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[12px] tracking-[0.15em] uppercase" style={{ color: "var(--brand-accent)" }}>
          {label}
        </span>
      </div>
      <p className="mt-2 text-[30px] font-bold uppercase sm:text-[40px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
        {profile.name || "Untitled"}
      </p>
      <p className="mt-1 text-[14px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
        {[profile.ageRange, profile.occupation, profile.location].filter(Boolean).join(" · ")}
      </p>
      {rows.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.label} className="border-t pt-3" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 15%, transparent)" }}>
              <p className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "var(--brand-muted)" }}>
                {r.label}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BoldAudienceSection({ data }: { data: BrandData }) {
  return (
    <BoldSection id="audience" index="03" title="Audience" subtitle="Who this brand is built for.">
      <div className="flex flex-col gap-14 sm:flex-row sm:gap-10">
        <ProfileBlock label="Primary" profile={data.audience.primary} />
        {data.audience.secondary && <ProfileBlock label="Secondary" profile={data.audience.secondary} />}
      </div>
    </BoldSection>
  );
}
