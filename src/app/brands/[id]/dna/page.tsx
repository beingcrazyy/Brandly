"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Textarea, Input } from "@/components/ui/Field";
import { RepeatableList } from "@/components/ui/RepeatableList";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { BrandDNADiagram } from "@/components/brand/BrandDNADiagram";

export default function DnaPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { brand, value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({ purpose: d.purpose, essence: d.essence, values: d.values }),
    (d, v) => ({ ...d, ...v })
  );

  if (!value || !brand) return null;

  return (
    <SectionShell
      title="Brand DNA"
      description="The purpose and values that anchor every other decision."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Live Preview" description="How this reads on the published portal — click a node to explore it.">
        <BrandDNADiagram data={brand.draftData} />
      </FieldGroup>

      <FieldGroup title="Brand Essence" description="A two-to-four word distillation of the brand — the line everything else ladders up to.">
        <Input value={value.essence} onChange={(e) => setValue({ ...value, essence: e.target.value })} placeholder="e.g. Fewer, better." />
      </FieldGroup>

      <FieldGroup title="Purpose" description="Why the brand exists, beyond making money.">
        <Textarea value={value.purpose} onChange={(e) => setValue({ ...value, purpose: e.target.value })} rows={4} />
      </FieldGroup>

      <FieldGroup title="Core Values" description="The principles that guide every decision the brand makes.">
        <RepeatableList
          items={value.values}
          onChange={(values) => setValue({ ...value, values })}
          makeItem={() => ({ id: makeFileId(), name: "", description: "", icon: "" })}
          addLabel="Add Value"
          renderItem={(item, _i, update) => (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <Input placeholder="Value name, e.g. Clarity" value={item.name} onChange={(e) => update({ name: e.target.value })} />
                <Input placeholder="Icon" value={item.icon ?? ""} onChange={(e) => update({ icon: e.target.value })} className="w-20 text-center" />
              </div>
              <Textarea placeholder="Short description" value={item.description} onChange={(e) => update({ description: e.target.value })} rows={2} />
            </div>
          )}
        />
      </FieldGroup>
    </SectionShell>
  );
}
