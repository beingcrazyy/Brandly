"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { useToast } from "@/components/ui/Toast";
import { TemplateId } from "@/lib/types";
import { Check } from "lucide-react";

const AVAILABLE: { id: TemplateId; name: string; blurb: string; bg: string; fg: string }[] = [
  { id: "mono", name: "Mono", blurb: "Minimal, monochrome, hairline borders. Quiet confidence, sans-serif throughout.", bg: "#14140F", fg: "#F6F4EE" },
  { id: "studio", name: "Studio", blurb: "Full-bleed color blocks, bold uppercase type, elevated cards. Vivid and confident.", bg: "#B66A50", fg: "#FFFFFF" },
  { id: "atelier", name: "Atelier", blurb: "Warm, soft, boutique. Glass panels and gentle rhythm — still entirely sans-serif.", bg: "#F4F0E8", fg: "#1D1D1B" },
  { id: "field", name: "Field", blurb: "Field-notebook editorial. Hard ink borders, offset shadows, a waypoint trail rail.", bg: "#F2F3EF", fg: "#15181A" },
  { id: "dusk", name: "Dusk", blurb: "Dark, technical, one bright accent. Boxy hairline cards on a near-black canvas.", bg: "#0B0B0D", fg: "#F2F1EE" },
  { id: "summit", name: "Summit", blurb: "Quiet hairline minimalism, a serif wordmark, field-coded sections. No shadows, no noise.", bg: "#FAFAF7", fg: "#1D1D1B" },
  { id: "meadow", name: "Meadow", blurb: "Warm, soft, rounded. Drifting color-wash orbs and paper-cutout cards.", bg: "#F6F1E7", fg: "#3A2E22" },
];

export default function TemplatePage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({ template: d.template }),
    (d, v) => ({ ...d, ...v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Template"
      description="How this brand's data renders as a portal. Switching templates never changes your content."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Available Templates">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE.map((t) => {
            const active = value.template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setValue({ template: t.id })}
                className={`focus-ring flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all ${
                  active ? "border-[var(--accent-terracotta)]" : "border-transparent hover:border-[#DDD6C6]"
                }`}
              >
                <div className="flex aspect-[4/3] flex-col justify-between p-5" style={{ backgroundColor: t.bg, color: t.fg }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.2em] uppercase opacity-60">{t.name}</span>
                    {active && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <p className="text-[26px] leading-tight font-bold">Aa</p>
                </div>
                <div className="p-4">
                  <p className="text-[14px] font-semibold text-[#14140F]">{t.name}</p>
                  <p className="mt-1 text-[12.5px] text-neutral-500">{t.blurb}</p>
                </div>
              </button>
            );
          })}
        </div>
      </FieldGroup>
    </SectionShell>
  );
}
