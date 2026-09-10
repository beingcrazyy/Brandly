"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { PositioningMap } from "@/components/brand/PositioningMap";

export default function PositioningPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { brand, value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.positioning,
    (d, v) => ({ ...d, positioning: v })
  );

  if (!value || !brand) return null;

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

      <FieldGroup title="Live Preview" description="Where this brand and its named competitors sit on the map — click the highlighted dot for detail.">
        <PositioningMap data={{ ...brand.draftData, positioning: value }} />
      </FieldGroup>

      <FieldGroup title="Competitive Landscape" description="Plot named competitors on the same two axes as Personality (0 = left label, 100 = right label) to see where this brand sits relative to them.">
        <RepeatableList
          items={value.competitors}
          onChange={(competitors) => setValue({ ...value, competitors })}
          makeItem={() => ({ id: makeFileId(), name: "", x: 50, y: 50 })}
          addLabel="Add Competitor"
          renderItem={(item, _i, update) => (
            <div className="grid grid-cols-[1fr_auto_auto] gap-3">
              <Input placeholder="Competitor name" value={item.name} onChange={(e) => update({ name: e.target.value })} />
              <Input
                type="number"
                min={0}
                max={100}
                className="w-20 text-center"
                value={item.x}
                onChange={(e) => update({ x: Math.min(100, Math.max(0, Number(e.target.value))) })}
                title="Position on the first personality axis (0-100)"
              />
              <Input
                type="number"
                min={0}
                max={100}
                className="w-20 text-center"
                value={item.y}
                onChange={(e) => update({ y: Math.min(100, Math.max(0, Number(e.target.value))) })}
                title="Position on the second personality axis (0-100)"
              />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
