import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { Check, X } from "lucide-react";

export function BoldVoiceSection({ data }: { data: BrandData }) {
  const { voice } = data;

  return (
    <BoldSection id="voice" index="05" title="Voice & Tone" subtitle="How the brand sounds, in writing and in speech.">
      {voice.voice && (
        <p className="max-w-3xl text-[22px] leading-relaxed font-medium sm:text-[28px]" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
          {voice.voice}
        </p>
      )}

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {voice.soundsLike.length > 0 && (
          <div className="p-8" style={{ backgroundColor: "var(--brand-accent)" }}>
            <p className="mb-5 font-mono text-[12px] tracking-[0.15em] uppercase" style={{ color: "#fff", opacity: 0.85 }}>
              We sound like
            </p>
            <ul className="flex flex-col gap-3">
              {voice.soundsLike.map((v) => (
                <li key={v} className="flex items-center gap-2 text-[20px] font-bold uppercase" style={{ fontFamily: "var(--font-primary)", color: "#fff" }}>
                  <Check size={18} /> {v}
                </li>
              ))}
            </ul>
          </div>
        )}
        {voice.doesntSoundLike.length > 0 && (
          <div className="p-8" style={{ backgroundColor: "var(--brand-primary)" }}>
            <p className="mb-5 font-mono text-[12px] tracking-[0.15em] uppercase" style={{ color: "var(--brand-background)", opacity: 0.5 }}>
              We don&apos;t sound like
            </p>
            <ul className="flex flex-col gap-3">
              {voice.doesntSoundLike.map((v) => (
                <li key={v} className="flex items-center gap-2 text-[20px] font-bold uppercase opacity-40" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-background)" }}>
                  <X size={18} /> {v}
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
              <p className="font-mono text-[36px] font-bold" style={{ color: "color-mix(in srgb, var(--brand-text) 15%, transparent)" }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[16px] font-bold uppercase" style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}>
                {p.title}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {p.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </BoldSection>
  );
}
