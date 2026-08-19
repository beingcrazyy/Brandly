"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { TagInput } from "@/components/ui/TagInput";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";

export default function VoicePage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.voice,
    (d, v) => ({ ...d, voice: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Voice & Tone"
      description="How the brand sounds, in writing and in speech."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Brand Voice">
        <Textarea value={value.voice} onChange={(e) => setValue({ ...value, voice: e.target.value })} rows={3} />
      </FieldGroup>

      <FieldGroup title="We Sound Like">
        <TagInput values={value.soundsLike} onChange={(soundsLike) => setValue({ ...value, soundsLike })} />
      </FieldGroup>

      <FieldGroup title="We Don't Sound Like">
        <TagInput values={value.doesntSoundLike} onChange={(doesntSoundLike) => setValue({ ...value, doesntSoundLike })} />
      </FieldGroup>

      <FieldGroup title="Writing Principles">
        <RepeatableList
          items={value.writingPrinciples}
          onChange={(writingPrinciples) => setValue({ ...value, writingPrinciples })}
          makeItem={() => ({ id: makeFileId(), title: "", explanation: "" })}
          addLabel="Add Principle"
          renderItem={(item, _i, update) => (
            <div className="flex flex-col gap-3">
              <Input placeholder="Title, e.g. Keep it clear" value={item.title} onChange={(e) => update({ title: e.target.value })} />
              <Textarea placeholder="Explanation" value={item.explanation} onChange={(e) => update({ explanation: e.target.value })} rows={2} />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
