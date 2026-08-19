"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { useToast } from "@/components/ui/Toast";
import { TemplateId } from "@/lib/types";
import { Check, Lock } from "lucide-react";

const AVAILABLE: { id: TemplateId; name: string; blurb: string; bg: string; fg: string }[] = [
  { id: "editorial", name: "Editorial", blurb: "Large typography, generous whitespace, asymmetric grid. Quiet and literary.", bg: "#1D1D1B", fg: "#F4F0E8" },
  { id: "bold", name: "Bold", blurb: "Full-bleed color blocks, oversized type, high contrast. Graphic and confident.", bg: "#B66A50", fg: "#FFFFFF" },
];

const LOCKED: TemplateId[] = ["minimal", "corporate", "luxury"];

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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  <p className="font-serif text-[26px] leading-tight">Aa</p>
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

      <FieldGroup title="Coming Soon">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {LOCKED.map((id) => (
            <div key={id} className="flex flex-col overflow-hidden rounded-2xl border border-dashed border-[#DDD6C6] bg-black/[0.015]">
              <div className="flex aspect-[4/3] items-center justify-center text-neutral-300">
                <Lock size={18} strokeWidth={1.5} />
              </div>
              <div className="p-4">
                <p className="text-[13px] font-medium text-neutral-400 capitalize">{id}</p>
              </div>
            </div>
          ))}
        </div>
      </FieldGroup>
    </SectionShell>
  );
}
