"use client";

import { useMemo, useRef, useState } from "react";
import { LibraryAsset, AssetType, FileRef } from "@/lib/types";
import { AssetCard } from "../ui/AssetCard";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input, Textarea, Select } from "../ui/Field";
import { UploadField } from "../ui/UploadField";
import { Tabs } from "../ui/Tabs";
import { downloadFile, deleteFile, makeFileId, putFile } from "@/lib/files";
import { useToast } from "../ui/Toast";
import { FolderOpen, Plus, Search, Download, RefreshCw, Trash2 } from "lucide-react";

const TYPES: AssetType[] = ["logo", "font", "icon", "illustration", "photography", "social", "presentation", "document", "misc"];
const FILTERS = ["All", ...TYPES] as const;

function blank(): Omit<LibraryAsset, "id" | "uploadedAt"> {
  return { name: "", type: "misc", category: "", description: "", file: null };
}

export function AssetLibrary({ assets, onChange }: { assets: LibraryAsset[]; onChange: (assets: LibraryAsset[]) => void }) {
  const notify = useToast();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState(blank());
  const replaceInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const filtered = useMemo(
    () =>
      assets.filter((a) => {
        const matchesFilter = filter === "All" || a.type === filter;
        const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [assets, query, filter]
  );

  function addAsset() {
    if (!draft.name || !draft.file) return;
    const asset: LibraryAsset = { id: makeFileId(), uploadedAt: new Date().toISOString(), ...draft };
    onChange([asset, ...assets]);
    setDraft(blank());
    setAddOpen(false);
    notify("Asset uploaded");
  }

  async function replaceFile(assetId: string, file: File) {
    const fileId = makeFileId();
    await putFile(fileId, file, file.name);
    const ref: FileRef = { fileId, name: file.name, mimeType: file.type };
    onChange(assets.map((a) => (a.id === assetId ? { ...a, file: ref } : a)));
    notify("Asset replaced");
  }

  function removeAsset(asset: LibraryAsset) {
    if (asset.file) deleteFile(asset.file.fileId);
    onChange(assets.filter((a) => a.id !== asset.id));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs options={FILTERS} value={filter} onChange={setFilter} />
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search size={13} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets..."
              className="focus-ring h-9 w-full rounded-xl border border-[#DDD6C6] bg-white pl-8 pr-3 text-[13px] placeholder:text-neutral-400"
            />
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Upload Asset
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No assets yet"
          description="Upload approved logos, fonts, icons and other files to build the digital asset library."
          action={
            <Button onClick={() => setAddOpen(true)}>
              <Plus size={15} /> Upload Asset
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <AssetCard
              key={asset.id}
              name={asset.name}
              subtitle={`${asset.category || asset.type} · ${new Date(asset.uploadedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}`}
              file={asset.file}
              footer={
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => asset.file && downloadFile(asset.file.fileId, asset.file.name)}
                    aria-label={`Download ${asset.name}`}
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-xl text-neutral-500 hover:bg-black/5 hover:text-neutral-800"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => replaceInputs.current[asset.id]?.click()}
                    aria-label={`Replace ${asset.name}`}
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-xl text-neutral-500 hover:bg-black/5 hover:text-neutral-800"
                  >
                    <RefreshCw size={13} />
                  </button>
                  <input
                    ref={(el) => {
                      replaceInputs.current[asset.id] = el;
                    }}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) replaceFile(asset.id, file);
                    }}
                  />
                  <button
                    onClick={() => removeAsset(asset)}
                    aria-label={`Delete ${asset.name}`}
                    className="focus-ring flex h-7 w-7 items-center justify-center rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              }
            />
          ))}
        </div>
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Upload Asset"
        width="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addAsset} disabled={!draft.name || !draft.file}>
              Upload
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <UploadField
            label="File"
            value={draft.file}
            onChange={(file) => setDraft({ ...draft, file, name: draft.name || file?.name.replace(/\.[^.]+$/, "") || "" })}
            shape="wide"
          />
          <Input label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Type" className="capitalize" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as AssetType })}>
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </Select>
            <Input label="Category" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} placeholder="e.g. Logos" />
          </div>
          <Textarea label="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} />
        </div>
      </Modal>
    </div>
  );
}
