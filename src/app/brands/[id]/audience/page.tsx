"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { AudienceFields } from "@/components/cms/AudienceFields";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Plus, X } from "lucide-react";

const BLANK = { name: "", ageRange: "", occupation: "", location: "", needs: "", problems: "", motivations: "", behaviors: "" };

export default function AudiencePage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.audience,
    (d, v) => ({ ...d, audience: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Target Audience"
      description="Who this brand is built for."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
    >
      <FieldGroup title="Primary Audience">
        <AudienceFields value={value.primary} onChange={(primary) => setValue({ ...value, primary })} />
      </FieldGroup>

      <FieldGroup title="Secondary Audience" description="Optional — a supporting segment worth designing for.">
        {value.secondary ? (
          <div className="flex flex-col gap-3">
            <AudienceFields value={value.secondary} onChange={(secondary) => setValue({ ...value, secondary })} />
            <Button variant="ghost" size="sm" className="self-start text-neutral-500" onClick={() => setValue({ ...value, secondary: null })}>
              <X size={14} /> Remove secondary audience
            </Button>
          </div>
        ) : (
          <Button variant="secondary" size="sm" className="self-start" onClick={() => setValue({ ...value, secondary: { ...BLANK } })}>
            <Plus size={14} /> Add Secondary Audience
          </Button>
        )}
      </FieldGroup>
    </SectionShell>
  );
}
