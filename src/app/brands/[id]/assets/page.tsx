"use client";

import { useParams } from "next/navigation";
import { useSectionForm } from "@/lib/useSectionForm";
import { SectionShell } from "@/components/cms/SectionShell";
import { AssetLibrary } from "@/components/cms/AssetLibrary";
import { useToast } from "@/components/ui/Toast";
import type { LibraryAsset, AssetFolder } from "@/lib/types";

type AssetsSlice = { assets: LibraryAsset[]; assetFolders: AssetFolder[] };

export default function AssetsPage() {
  const { id } = useParams<{ id: string }>();
  const notify = useToast();
  const { value, setValue, dirty, save } = useSectionForm<AssetsSlice>(
    id,
    (d) => ({ assets: d.assets, assetFolders: d.assetFolders }),
    (d, v) => ({ ...d, assets: v.assets, assetFolders: v.assetFolders })
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
      <AssetLibrary
        assets={value.assets}
        assetFolders={value.assetFolders}
        onChange={(assets, assetFolders) => setValue({ assets, assetFolders })}
      />
    </SectionShell>
  );
}
