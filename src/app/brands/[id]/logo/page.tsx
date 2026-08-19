"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { UploadField } from "@/components/ui/UploadField";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { LogoVariant } from "@/lib/types";

const VARIANTS: LogoVariant[] = ["primary", "secondary", "monogram", "symbol", "light", "dark", "horizontal", "vertical"];

export default function LogoPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({ logos: d.logos, logoGuidelines: d.logoGuidelines }),
    (d, v) => ({ ...d, ...v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Logo"
      description="Every approved lockup, with the context to use it correctly."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Logo Variants">
        <RepeatableList
          items={value.logos}
          onChange={(logos) => setValue({ ...value, logos })}
          makeItem={() => ({
            id: makeFileId(),
            variant: "secondary" as LogoVariant,
            name: "New Logo Variant",
            description: "",
            file: null,
            recommendedBackground: "light" as const,
            usageNotes: "",
          })}
          addLabel="Add Logo Variant"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" />
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Variant" className="capitalize" value={item.variant} onChange={(e) => update({ variant: e.target.value as LogoVariant })}>
                    {VARIANTS.map((v) => (
                      <option key={v} value={v} className="capitalize">
                        {v}
                      </option>
                    ))}
                  </Select>
                  <Select
                    label="Recommended Background"
                    value={item.recommendedBackground}
                    onChange={(e) => update({ recommendedBackground: e.target.value as typeof item.recommendedBackground })}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="brand">Brand color</option>
                  </Select>
                </div>
                <Input label="Name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
                <Textarea label="Description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
                <Textarea label="Usage Notes" value={item.usageNotes} onChange={(e) => update({ usageNotes: e.target.value })} rows={2} />
              </div>
            </div>
          )}
        />
      </FieldGroup>

      <FieldGroup title="Logo Guidelines">
        <div className="grid grid-cols-3 gap-3">
          <Input
            type="number"
            label="Clear Space (px)"
            value={value.logoGuidelines.clearSpace}
            onChange={(e) => setValue({ ...value, logoGuidelines: { ...value.logoGuidelines, clearSpace: Number(e.target.value) } })}
          />
          <Input
            type="number"
            label="Minimum Width (px)"
            value={value.logoGuidelines.minWidth}
            onChange={(e) => setValue({ ...value, logoGuidelines: { ...value.logoGuidelines, minWidth: Number(e.target.value) } })}
          />
          <Input
            type="number"
            label="Minimum Height (px)"
            value={value.logoGuidelines.minHeight}
            onChange={(e) => setValue({ ...value, logoGuidelines: { ...value.logoGuidelines, minHeight: Number(e.target.value) } })}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Incorrect Usage" description="Show clients exactly what to avoid.">
        <RepeatableList
          items={value.logoGuidelines.incorrectExamples}
          onChange={(incorrectExamples) => setValue({ ...value, logoGuidelines: { ...value.logoGuidelines, incorrectExamples } })}
          makeItem={() => ({ id: makeFileId(), file: null, title: "", description: "" })}
          addLabel="Add Example"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" />
              <div className="flex flex-col gap-3">
                <Input label="Title" value={item.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Don't stretch or distort" />
                <Textarea label="Description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
              </div>
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
