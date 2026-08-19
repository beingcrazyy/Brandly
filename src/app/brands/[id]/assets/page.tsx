"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { AssetLibrary } from "@/components/cms/AssetLibrary";
import { useToast } from "@/components/ui/Toast";

export default function AssetsPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm(
    id,
    (d) => d.assets,
    (d, v) => ({ ...d, assets: v })
  );

  if (!value) return null;

  return (
    <SectionShell
      title="Asset Library"
      description="Every file the client can browse, search and download."
      dirty={dirty}
      onSave={() => {
        save();
        notify("Saved");
      }}
      width="max-w-5xl"
    >
      <AssetLibrary assets={value} onChange={setValue} />
    </SectionShell>
  );
}
