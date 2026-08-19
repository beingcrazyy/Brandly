"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { ColorSystem } from "@/components/brand/ColorSystem";
import { ColorInspectorBody } from "@/components/brand/ColorInspectorBody";
import { Inspector } from "@/components/interaction/Inspector";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { ColorToken } from "@/lib/types";

export default function ColorsPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.colors,
    (d, v) => ({ ...d, colors: v })
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!value) return null;

  const index = value.findIndex((c) => c.id === selectedId);
  const selected = index >= 0 ? value[index] : null;

  function update(patch: Partial<ColorToken>) {
    if (!value || index < 0) return;
    setValue(value.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function remove() {
    if (!value || index < 0) return;
    setValue(value.filter((_, i) => i !== index));
    setSelectedId(null);
  }

  function move(dir: -1 | 1) {
    if (!value || index < 0) return;
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    setValue(next);
  }

  function addColor() {
    if (!value) return;
    const created = { id: makeFileId(), name: "New Color", role: "neutral" as const, hex: "#1D1D1B", usage: "", description: "" };
    setValue([...value, created]);
    setSelectedId(created.id);
  }

  return (
    <SectionShell
      title="Color System"
      description="Every color role, with the exact values needed to reproduce it. Click a swatch to edit."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Colors" description="Roles map directly to design tokens — set one primary, one secondary, one accent.">
        <ColorSystem colors={value} onSelect={(c) => setSelectedId(c.id)} onAdd={addColor} />
      </FieldGroup>

      <Inspector open={!!selected} onClose={() => setSelectedId(null)} eyebrow={selected?.role} title={selected?.name ?? ""}>
        {selected && (
          <ColorInspectorBody
            mode="editable"
            color={selected}
            onChange={update}
            onDelete={remove}
            onMove={move}
            canMoveUp={index > 0}
            canMoveDown={index < value.length - 1}
          />
        )}
      </Inspector>
    </SectionShell>
  );
}
