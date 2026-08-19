"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input, Select } from "@/components/ui/Field";
import { UploadField } from "@/components/ui/UploadField";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";

export default function IconographyPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.iconography,
    (d, v) => ({ ...d, iconography: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Iconography"
      description="The rules and the library that keep icons consistent."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Style Guidelines">
        <Textarea label="Icon Style" value={value.style} onChange={(e) => setValue({ ...value, style: e.target.value })} rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            step={0.5}
            label="Stroke Width"
            value={value.strokeWidth}
            onChange={(e) => setValue({ ...value, strokeWidth: Number(e.target.value) })}
          />
          <Select label="Corner Treatment" value={value.cornerTreatment} onChange={(e) => setValue({ ...value, cornerTreatment: e.target.value as typeof value.cornerTreatment })}>
            <option value="rounded">Rounded</option>
            <option value="sharp">Sharp</option>
          </Select>
        </div>
        <Select label="Fill Style" value={value.fillStyle} onChange={(e) => setValue({ ...value, fillStyle: e.target.value as typeof value.fillStyle })}>
          <option value="outline">Outline</option>
          <option value="filled">Filled</option>
        </Select>
        <Input label="Size Guidance" value={value.sizeGuidance} onChange={(e) => setValue({ ...value, sizeGuidance: e.target.value })} />
        <Textarea label="Usage Notes" value={value.usageNotes} onChange={(e) => setValue({ ...value, usageNotes: e.target.value })} rows={2} />
      </FieldGroup>

      <FieldGroup title="Icon Library">
        <RepeatableList
          items={value.icons}
          onChange={(icons) => setValue({ ...value, icons })}
          makeItem={() => ({ id: makeFileId(), name: "New Icon", file: null })}
          addLabel="Add Icon"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[120px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" accept=".svg,.png" />
              <Input label="Name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
