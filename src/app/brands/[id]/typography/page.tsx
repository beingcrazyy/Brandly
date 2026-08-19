"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { FontPicker } from "@/components/cms/FontPicker";
import { TypographyPreview } from "@/components/cms/TypographyPreview";
import { TypographyLab } from "@/components/brand/TypographyLab";
import { useToast } from "@/components/ui/Toast";

export default function TypographyPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.typography,
    (d, v) => ({ ...d, typography: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Typography"
      description="The typefaces and scale that carry the brand's voice on the page."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Live Preview">
        <TypographyPreview typography={value} />
      </FieldGroup>

      <FieldGroup title="Typefaces">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FontPicker label="Primary Font" value={value.primary} onChange={(primary) => setValue({ ...value, primary })} />
          <FontPicker label="Secondary Font" value={value.secondary} onChange={(secondary) => setValue({ ...value, secondary })} />
        </div>
      </FieldGroup>

      <FieldGroup title="Typography Styles" description="Pick a style, then drag to tune it. The specimen updates live.">
        <TypographyLab typography={value} onChange={setValue} />
      </FieldGroup>
    </SectionShell>
  );
}
