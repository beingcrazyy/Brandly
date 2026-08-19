"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Input, Textarea } from "@/components/ui/Field";
import { UploadField } from "@/components/ui/UploadField";
import { useToast } from "@/components/ui/Toast";

export default function OverviewPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({
      name: d.name,
      description: d.description,
      tagline: d.tagline,
      mission: d.mission,
      vision: d.vision,
      story: d.story,
      website: d.website,
      industry: d.industry,
      coverImage: d.coverImage,
    }),
    (d, v) => ({ ...d, ...v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Overview"
      description="The foundational identity fields for this brand."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Identity">
        <Input label="Brand Name" value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} />
        <Textarea
          label="Brand Description"
          value={value.description}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
          rows={3}
        />
        <Input label="Tagline" value={value.tagline} onChange={(e) => setValue({ ...value, tagline: e.target.value })} placeholder="A short, memorable line" />
      </FieldGroup>

      <FieldGroup title="Strategy">
        <Textarea label="Mission" value={value.mission} onChange={(e) => setValue({ ...value, mission: e.target.value })} rows={3} />
        <Textarea label="Vision" value={value.vision} onChange={(e) => setValue({ ...value, vision: e.target.value })} rows={3} />
        <Textarea
          label="Brand Story"
          helper="The narrative behind the brand — this reads as the long-form story on the portal."
          value={value.story}
          onChange={(e) => setValue({ ...value, story: e.target.value })}
          rows={6}
        />
      </FieldGroup>

      <FieldGroup title="Details">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Website" value={value.website} onChange={(e) => setValue({ ...value, website: e.target.value })} placeholder="https://" />
          <Input label="Industry" value={value.industry} onChange={(e) => setValue({ ...value, industry: e.target.value })} />
        </div>
        <UploadField
          label="Brand Cover Image"
          value={value.coverImage}
          onChange={(f) => setValue({ ...value, coverImage: f })}
          helper="Used in the portal hero and on the dashboard card."
        />
      </FieldGroup>
    </SectionShell>
  );
}
