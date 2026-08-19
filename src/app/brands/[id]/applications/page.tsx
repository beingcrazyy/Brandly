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
import { ApplicationCategory } from "@/lib/types";

const CATEGORIES: ApplicationCategory[] = ["Social Media", "Stationery", "Packaging", "Website", "Advertising", "Presentation"];

export default function ApplicationsPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.applications,
    (d, v) => ({ ...d, applications: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Applications"
      description="The brand applied to real, tangible touchpoints."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Application Mockups">
        <RepeatableList
          items={value}
          onChange={setValue}
          makeItem={() => ({ id: makeFileId(), category: "Social Media" as ApplicationCategory, title: "New Application", description: "", file: null, usageNotes: "" })}
          addLabel="Add Application"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="wide" />
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Title" value={item.title} onChange={(e) => update({ title: e.target.value })} />
                  <Select label="Category" value={item.category} onChange={(e) => update({ category: e.target.value as ApplicationCategory })}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <Textarea label="Description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
                <Textarea label="Usage Notes" value={item.usageNotes} onChange={(e) => update({ usageNotes: e.target.value })} rows={2} />
              </div>
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
