"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { FieldGroup } from "@/components/cms/FieldGroup";
import { ColorSystem } from "@/components/brand/ColorSystem";
import { ColorInspectorBody } from "@/components/brand/ColorInspectorBody";
import { Inspector } from "@/components/interaction/Inspector";
import { FontPicker } from "@/components/cms/FontPicker";
import { TypographyPreview } from "@/components/cms/TypographyPreview";
import { TypographyLab } from "@/components/brand/TypographyLab";
import { useToast } from "@/components/ui/Toast";
import { makeFileId } from "@/lib/files";
import { ColorToken, Typography } from "@/lib/types";

export default function VisualDirectionPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => ({ colors: d.colors, typography: d.typography }),
    (d, v) => ({ ...d, ...v })
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!value) return null;

  const colors = value.colors;
  const index = colors.findIndex((c) => c.id === selectedId);
  const selected = index >= 0 ? colors[index] : null;

  function setColors(colors: ColorToken[]) {
    setValue({ ...value!, colors });
  }
  function setTypography(typography: Typography) {
    setValue({ ...value!, typography });
  }

  function updateColor(patch: Partial<ColorToken>) {
    if (index < 0) return;
    setColors(colors.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }
  function removeColor() {
    if (index < 0) return;
    setColors(colors.filter((_, i) => i !== index));
    setSelectedId(null);
  }
  function moveColor(dir: -1 | 1) {
    if (index < 0) return;
    const target = index + dir;
    if (target < 0 || target >= colors.length) return;
    const next = [...colors];
    [next[index], next[target]] = [next[target], next[index]];
    setColors(next);
  }
  function addColor() {
    const created = { id: makeFileId(), name: "New Color", role: "neutral" as const, hex: "#1D1D1B", usage: "", description: "" };
    setColors([...colors, created]);
    setSelectedId(created.id);
  }

  return (
    <SectionShell
      title="Visual Direction"
      description="The colors and typefaces every template renders with."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-3xl"
    >
      <FieldGroup title="Colors" description="Roles map directly to design tokens — set one primary, one secondary, one accent. Click a swatch to edit.">
        <ColorSystem colors={colors} onSelect={(c) => setSelectedId(c.id)} onAdd={addColor} />
      </FieldGroup>

      <FieldGroup title="Live Type Preview">
        <TypographyPreview typography={value.typography} />
      </FieldGroup>

      <FieldGroup title="Typefaces">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FontPicker label="Primary Font" value={value.typography.primary} onChange={(primary) => setTypography({ ...value.typography, primary })} />
          <FontPicker label="Secondary Font" value={value.typography.secondary} onChange={(secondary) => setTypography({ ...value.typography, secondary })} />
        </div>
      </FieldGroup>

      <FieldGroup title="Typography Styles" description="Pick a style, then drag to tune it. The specimen updates live.">
        <TypographyLab typography={value.typography} onChange={setTypography} />
      </FieldGroup>

      <Inspector open={!!selected} onClose={() => setSelectedId(null)} eyebrow={selected?.role} title={selected?.name ?? ""}>
        {selected && (
          <ColorInspectorBody
            mode="editable"
            color={selected}
            onChange={updateColor}
            onDelete={removeColor}
            onMove={moveColor}
            canMoveUp={index > 0}
            canMoveDown={index < colors.length - 1}
          />
        )}
      </Inspector>
    </SectionShell>
  );
}
