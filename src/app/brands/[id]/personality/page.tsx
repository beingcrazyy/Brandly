"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { TagInput } from "@/components/ui/TagInput";
import { PersonalityAxes } from "@/components/brand/PersonalityAxes";
import { useToast } from "@/components/ui/Toast";

export default function PersonalityPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({ personalityTraits: d.personalityTraits, personalityScales: d.personalityScales }),
    (d, v) => ({ ...d, ...v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Brand Personality"
      description="The human character of the brand, in traits and tension."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Personality Traits">
        <TagInput
          values={value.personalityTraits}
          onChange={(personalityTraits) => setValue({ ...value, personalityTraits })}
          placeholder="e.g. Confident — press Enter"
        />
      </FieldGroup>

      <FieldGroup title="Personality Scale" description="Drag the handle to place the brand between two poles.">
        <div className="flex flex-col gap-6">
          {value.personalityScales.map((scale, i) => (
            <div key={scale.id} className="rounded-[var(--radius-lab)] border border-[#E4DFD3] p-4">
              <PersonalityAxes
                scale={scale}
                editable
                onChange={(v) => {
                  const next = [...value.personalityScales];
                  next[i] = { ...scale, value: v };
                  setValue({ ...value, personalityScales: next });
                }}
                onLabelChange={(patch) => {
                  const next = [...value.personalityScales];
                  next[i] = { ...scale, ...patch };
                  setValue({ ...value, personalityScales: next });
                }}
              />
            </div>
          ))}
        </div>
      </FieldGroup>
    </SectionShell>
  );
}
