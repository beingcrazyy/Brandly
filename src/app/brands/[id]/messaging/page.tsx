"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { MessagingPillars } from "@/components/brand/MessagingPillars";

export default function MessagingPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.messaging,
    (d, v) => ({ ...d, messaging: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Messaging"
      description="The value proposition and supporting pillars everything else in market gets written against."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Live Preview" description="How this reads on the published portal.">
        <MessagingPillars valueProposition={value.valueProposition} pillars={value.pillars} variant="lab" />
      </FieldGroup>

      <FieldGroup title="Value Proposition" description="One sentence — the promise the brand makes to the market.">
        <Textarea value={value.valueProposition} onChange={(e) => setValue({ ...value, valueProposition: e.target.value })} rows={3} />
      </FieldGroup>

      <FieldGroup title="Messaging Pillars" description="The 2-4 supporting reasons that back up the value proposition.">
        <RepeatableList
          items={value.pillars}
          onChange={(pillars) => setValue({ ...value, pillars })}
          makeItem={() => ({ id: makeFileId(), title: "", description: "" })}
          addLabel="Add Pillar"
          renderItem={(item, _i, update) => (
            <div className="flex flex-col gap-3">
              <Input placeholder="Pillar title" value={item.title} onChange={(e) => update({ title: e.target.value })} />
              <Textarea placeholder="Short description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
