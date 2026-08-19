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
import { GraphicCategory } from "@/lib/types";

const CATEGORIES: GraphicCategory[] = ["pattern", "texture", "shape", "illustration", "decorative"];

export default function GraphicsPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.graphics,
    (d, v) => ({ ...d, graphics: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Graphic Elements"
      description="Patterns, textures, shapes and decorative marks that extend the identity."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Graphics">
        <RepeatableList
          items={value}
          onChange={setValue}
          makeItem={() => ({ id: makeFileId(), name: "New Element", description: "", category: "pattern" as GraphicCategory, file: null })}
          addLabel="Add Graphic Element"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" />
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
                  <Select
                    label="Category"
                    className="capitalize"
                    value={item.category}
                    onChange={(e) => update({ category: e.target.value as GraphicCategory })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="capitalize">
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <Textarea label="Description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
              </div>
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
