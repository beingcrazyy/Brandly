"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { UploadField } from "@/components/ui/UploadField";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";

export default function ImageryPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.imagery,
    (d, v) => ({ ...d, imagery: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Imagery"
      description="The photographic language the brand uses to show, not tell."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Guidelines">
        <Textarea label="Photography Style" value={value.photographyStyle} onChange={(e) => setValue({ ...value, photographyStyle: e.target.value })} rows={2} />
        <Textarea label="Lighting" value={value.lighting} onChange={(e) => setValue({ ...value, lighting: e.target.value })} rows={2} />
        <Textarea label="Composition" value={value.composition} onChange={(e) => setValue({ ...value, composition: e.target.value })} rows={2} />
        <Textarea label="Color Treatment" value={value.colorTreatment} onChange={(e) => setValue({ ...value, colorTreatment: e.target.value })} rows={2} />
        <Textarea label="Subjects" value={value.subjects} onChange={(e) => setValue({ ...value, subjects: e.target.value })} rows={2} />
      </FieldGroup>

      <FieldGroup title="Do Examples">
        <RepeatableList
          items={value.doExamples}
          onChange={(doExamples) => setValue({ ...value, doExamples })}
          makeItem={() => ({ id: makeFileId(), file: null, caption: "" })}
          addLabel="Add Example"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" />
              <Input placeholder="Caption" value={item.caption} onChange={(e) => update({ caption: e.target.value })} />
            </div>
          )}
        />
      </FieldGroup>

      <FieldGroup title="Don't Examples">
        <RepeatableList
          items={value.dontExamples}
          onChange={(dontExamples) => setValue({ ...value, dontExamples })}
          makeItem={() => ({ id: makeFileId(), file: null, caption: "" })}
          addLabel="Add Example"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
              <UploadField value={item.file} onChange={(file) => update({ file })} shape="square" />
              <Input placeholder="Caption" value={item.caption} onChange={(e) => update({ caption: e.target.value })} />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
