import { AudienceProfile, BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";

function ProfileCard({ label, profile }: { label: string; profile: AudienceProfile }) {
  const rows = [
    { label: "Needs", text: profile.needs },
    { label: "Problems", text: profile.problems },
    { label: "Motivations", text: profile.motivations },
    { label: "Behaviors", text: profile.behaviors },
  ].filter((r) => r.text);

  return (
    <div
      className="overflow-hidden border"
      style={{ borderColor: "color-mix(in srgb, var(--brand-text) 12%, transparent)", borderRadius: "var(--radius-medium)" }}
    >
      <div className="flex items-center gap-4 p-7 pb-0">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-[20px] font-medium"
          style={{ fontFamily: "var(--font-primary)", backgroundColor: "var(--brand-accent)", color: "var(--brand-background)" }}
        >
          {(profile.name || "?").charAt(0)}
        </div>
        <div>
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-accent)" }}>
            {label}
          </p>
          <p className="text-[22px] font-medium" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
            {profile.name || "Untitled Audience"}
          </p>
        </div>
      </div>
      <p className="px-7 pt-3 text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
        {[profile.ageRange, profile.occupation, profile.location].filter(Boolean).join(" · ")}
      </p>
      <div className="p-7 pt-0">
        {rows.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {rows.map((r) => (
              <div key={r.label}>
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
    </div>
  );
}

export function AudienceSection({ data }: { data: BrandData }) {
  return (
    <PortalSection id="audience" index="03" title="Audience" subtitle="Who this brand is built for.">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ProfileCard label="Primary Audience" profile={data.audience.primary} />
        {data.audience.secondary && <ProfileCard label="Secondary Audience" profile={data.audience.secondary} />}
      </div>
    </PortalSection>
  );
}
