"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";

export default function PositioningPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.positioning,
    (d, v) => ({ ...d, positioning: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Positioning"
      description="Where the brand sits in the market, and why it wins."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Positioning Statement">
        <Textarea
          value={value.statement}
          onChange={(e) => setValue({ ...value, statement: e.target.value })}
          rows={4}
          placeholder="For [audience], [brand] is the [category] that [differentiator]."
        />
      </FieldGroup>
      <FieldGroup title="Category">
        <Input value={value.category} onChange={(e) => setValue({ ...value, category: e.target.value })} />
      </FieldGroup>
      <FieldGroup title="Differentiator">
        <Textarea value={value.differentiator} onChange={(e) => setValue({ ...value, differentiator: e.target.value })} rows={2} />
      </FieldGroup>
      <FieldGroup title="Competitive Advantage">
        <Textarea value={value.competitiveAdvantage} onChange={(e) => setValue({ ...value, competitiveAdvantage: e.target.value })} rows={2} />
      </FieldGroup>
      <FieldGroup title="Brand Promise">
        <Textarea value={value.promise} onChange={(e) => setValue({ ...value, promise: e.target.value })} rows={2} />
      </FieldGroup>
      <FieldGroup title="Reason to Believe">
        <Textarea value={value.reasonToBelieve} onChange={(e) => setValue({ ...value, reasonToBelieve: e.target.value })} rows={2} />
      </FieldGroup>
    </SectionShell>
  );
}
