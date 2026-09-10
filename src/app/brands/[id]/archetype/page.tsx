"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { ArchetypeWheel } from "@/components/brand/ArchetypeWheel";
import { ARCHETYPES } from "@/lib/archetypes";
import { ArchetypeId } from "@/lib/types";

export default function ArchetypePage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { brand, value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.archetype,
    (d, v) => ({ ...d, archetype: v })
  );

  if (!value || !brand) return null;

  function setPrimary(next: ArchetypeId | ""){
    const primary = next || null;
    setValue({ primary, secondary: value!.secondary === primary ? null : value!.secondary });
  }
  function setSecondary(next: ArchetypeId | ""){
    setValue({ ...value!, secondary: next || null });
  }

  return (
    <SectionShell
      title="Archetype"
      description="The Jungian archetype the brand leans on — its underlying character and motivation."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Live Preview" description="Click any wedge to read its desire, fear and description — or assign it from there.">
        <ArchetypeWheel
          primary={value.primary}
          secondary={value.secondary}
          brandName={brand.draftData.name}
          onPickPrimary={(archetypeId) => setPrimary(archetypeId)}
          onPickSecondary={(archetypeId) => setSecondary(archetypeId)}
        />
      </FieldGroup>

      <FieldGroup title="Primary Archetype" description="The dominant character — most of the brand's decisions should trace back to this.">
        <Select value={value.primary ?? ""} onChange={(e) => setPrimary(e.target.value as ArchetypeId | "")}>
          <option value="">— None —</option>
          {ARCHETYPES.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </Select>
      </FieldGroup>

      <FieldGroup title="Secondary Archetype" description="An optional supporting note — keeps the primary from tipping into cliché.">
        <Select value={value.secondary ?? ""} onChange={(e) => setSecondary(e.target.value as ArchetypeId | "")}>
          <option value="">— None —</option>
          {ARCHETYPES.filter((a) => a.id !== value.primary).map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </Select>
      </FieldGroup>
    </SectionShell>
  );
}
