import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { Check, X } from "lucide-react";

export function VoiceSection({ data }: { data: BrandData }) {
  const { voice } = data;

  return (
    <PortalSection id="voice" index="05" title="Voice & Tone" subtitle="How the brand sounds, in writing and in speech." tint>
      {voice.voice && (
        <p
          className="max-w-2xl text-[18px] leading-relaxed sm:text-[20px]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
        >
          {voice.voice}
        </p>
      )}

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {voice.soundsLike.length > 0 && (
          <div className="p-6" style={{ backgroundColor: "var(--brand-accent)", borderRadius: "var(--radius-medium)" }}>
            <p className="mb-4 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-background)", opacity: 0.85 }}>
              We sound like
            </p>
            <ul className="flex flex-col gap-2.5">
              {voice.soundsLike.map((v) => (
                <li
                  key={v}
                  className="flex items-center gap-2 text-[15px] font-medium"
                  style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-background)" }}
                >
                  <Check size={15} /> {v}
                </li>
              ))}
            </ul>
          </div>
        )}
        {voice.doesntSoundLike.length > 0 && (
          <div
            className="border p-6"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 15%, transparent)", borderRadius: "var(--radius-medium)" }}
          >
            <p className="mb-4 text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--brand-muted)" }}>
              We don&apos;t sound like
            </p>
            <ul className="flex flex-col gap-2.5">
              {voice.doesntSoundLike.map((v) => (
                <li
                  key={v}
                  className="flex items-center gap-2 text-[15px] opacity-60"
                  style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}
                >
                  <X size={15} /> {v}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {voice.writingPrinciples.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {voice.writingPrinciples.map((p, i) => (
            <div key={p.id}>
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[12px]"
                style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 16%, transparent)", color: "var(--brand-accent)" }}
              >
                {i + 1}
              </div>
              <p className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {p.title}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {p.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </PortalSection>
  );
}
