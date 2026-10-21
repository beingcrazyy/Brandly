"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { LibraryAsset, AssetFolder, AssetType, AssetVariant, FileRef } from "@/lib/types";
import { useFileUrl } from "@/lib/useFileUrl";
import { downloadFile, makeFileId, putFile } from "@/lib/files";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { UploadField } from "@/components/ui/UploadField";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  ArrowLeft, Search, Download, FileText,
  Package, Plus, X, FolderOpen, Folder, Layers, Archive,
} from "lucide-react";

const TYPES: AssetType[] = [
  "logo", "font", "icon", "illustration", "photography",
  "social", "presentation", "document", "misc",
];

// ─── Card preview ─────────────────────────────────────────────────────────────

function CardPreview({ asset }: { asset: LibraryAsset }) {
  const fileId = asset.coverFile?.fileId ?? asset.variants.find(v => v.file.mimeType.startsWith("image/"))?.file.fileId;
  const url = useFileUrl(fileId);
  const mime = asset.coverFile?.mimeType ?? asset.variants[0]?.file.mimeType ?? "";
  if (url && mime.startsWith("image/")) {
    return <img src={url} alt={asset.name} className="block w-full" loading="lazy" />;
  }
  return (
    <div className="flex h-36 w-full items-center justify-center border-b border-[#E4DFD3] bg-neutral-50">
      <FileText size={26} strokeWidth={1.5} className="text-neutral-300" />
    </div>
  );
}

// ─── Folder tile ──────────────────────────────────────────────────────────────

function FolderTile({
  label,
  count,
  active,
  icon: Icon,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-[#14140F] bg-[#14140F] text-white shadow-sm"
          : "border-[#E4DFD3] bg-white text-[#14140F] hover:border-neutral-300 hover:shadow-sm"
      }`}
    >
      <Icon size={20} strokeWidth={1.5} className={active ? "text-white/70" : "text-neutral-400"} />
      <div>
        <p className={`truncate text-[13px] font-medium leading-tight ${active ? "text-white" : "text-[#14140F]"}`}>
          {label}
        </p>
        <p className={`mt-0.5 text-[11.5px] ${active ? "text-white/60" : "text-neutral-400"}`}>
          {count} {count === 1 ? "asset" : "assets"}
        </p>
      </div>
    </button>
  );
}

// ─── Client asset card ────────────────────────────────────────────────────────

function ClientAssetCard({ asset, onDetail }: { asset: LibraryAsset; onDetail: () => void }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#E4DFD3] bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(20,20,15,0.07)]">
      <div className="relative cursor-pointer" onClick={onDetail}>
        <CardPreview asset={asset} />
        <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:bg-black/15" />
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-[13px] font-medium text-[#14140F]">{asset.name}</p>
          <span className="shrink-0 rounded-md bg-black/[0.05] px-1.5 py-0.5 font-mono text-[9.5px] capitalize text-neutral-500">
            {asset.type}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {asset.variants.slice(0, 3).map((v) => (
            <button
              key={v.id}
              onClick={(e) => { e.stopPropagation(); downloadFile(v.file.fileId, v.file.name); }}
              className="flex items-center gap-1 rounded-md border border-[#DDD6C6] bg-[#F7F5F0] px-2 py-0.5 text-[10.5px] font-medium text-neutral-600 transition-colors hover:border-[#14140F] hover:text-[#14140F]"
            >
              <Download size={9} /> {v.label}
            </button>
          ))}
          {asset.variants.length > 3 && (
            <button
              onClick={(e) => { e.stopPropagation(); onDetail(); }}
              className="rounded-md border border-dashed border-[#DDD6C6] px-2 py-0.5 text-[10.5px] text-neutral-400 hover:text-neutral-600"
            >
              +{asset.variants.length - 3} more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Detail modal (read-only) ─────────────────────────────────────────────────

function DetailPreview({ asset }: { asset: LibraryAsset }) {
  const fileId = asset.coverFile?.fileId ?? asset.variants.find(v => v.file.mimeType.startsWith("image/"))?.file.fileId;
  const url = useFileUrl(fileId);
  const mime = asset.coverFile?.mimeType ?? asset.variants[0]?.file.mimeType ?? "";
  if (url && mime.startsWith("image/")) {
    return <img src={url} alt={asset.name} className="max-h-[50vh] w-full rounded-xl object-contain bg-neutral-50" />;
  }
  return (
    <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-50">
      <Package size={36} strokeWidth={1.2} className="text-neutral-300" />
    </div>
  );
}

function AssetDetailModal({ asset, onClose }: { asset: LibraryAsset | null; onClose: () => void }) {
  if (!asset) return null;
  return (
    <Modal open={!!asset} onClose={onClose} title={asset.name} width="lg">
      <div className="flex flex-col gap-5">
        <DetailPreview asset={asset} />
        <div className="flex flex-wrap gap-3 text-[12px] text-neutral-500">
          <span className="capitalize rounded-md bg-black/[0.05] px-2 py-0.5 font-mono text-[10.5px]">{asset.type}</span>
          {asset.category && <span>{asset.category}</span>}
          <span>{new Date(asset.uploadedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
          {asset.uploadedBy && <span>Contributed by {asset.uploadedBy}</span>}
        </div>
        {asset.description && (
          <p className="text-[13px] leading-relaxed text-neutral-500">{asset.description}</p>
        )}
        <div className="border-t border-[#E4DFD3] pt-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Download Formats</p>
          <div className="flex flex-col gap-2">
            {asset.variants.map((v) => (
              <div key={v.id} className="flex items-center gap-3 rounded-xl border border-[#E4DFD3] bg-[#F7F5F0] px-3.5 py-2.5">
                <span className="w-16 shrink-0 rounded-md border border-[#DDD6C6] bg-white px-1.5 py-0.5 text-center font-mono text-[10px] font-medium text-neutral-600">
                  {v.label}
                </span>
                <p className="min-w-0 flex-1 truncate text-[12.5px] text-neutral-600">{v.file.name}</p>
                <Button size="sm" onClick={() => downloadFile(v.file.fileId, v.file.name)}>
                  <Download size={13} /> Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Contribute modal ─────────────────────────────────────────────────────────

interface VariantDraft { id: string; label: string; file: FileRef | null; }

function ContributeModal({
  open,
  onClose,
  assetFolders: folders,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  assetFolders: AssetFolder[];
  onSave: (asset: Omit<LibraryAsset, "id" | "uploadedAt">) => void;
}) {
  const notify = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState<AssetType>("misc");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<FileRef | null>(null);
  const [folderId, setFolderId] = useState("");
  const [variants, setVariants] = useState<VariantDraft[]>([{ id: makeFileId(), label: "", file: null }]);
  const [saving, setSaving] = useState(false);
  const canSave = name.trim().length > 0 && variants.some((v) => v.file);

  async function handleSave() {
    setSaving(true);
    try {
      const committed: AssetVariant[] = [];
      for (const vd of variants) {
        if (!vd.file) continue;
        committed.push({
          id: vd.id,
          label: vd.label || vd.file.name.split(".").pop()?.toUpperCase() || "File",
          file: vd.file,
          addedAt: new Date().toISOString(),
        });
      }
      onSave({ name: name.trim(), type, category: category.trim(), description: description.trim(), coverFile, variants: committed, folderId: folderId || undefined });
    } catch {
      notify("Upload failed");
    } finally {
      setSaving(false);
    }
  }

  function updateVariant(i: number, upd: VariantDraft) {
    const next = [...variants];
    next[i] = upd;
    setVariants(next);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Contribute Asset"
      width="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!canSave || saving}>{saving ? "Uploading…" : "Upload"}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <UploadField label="Cover image (optional)" value={coverFile} accept="image/*" onChange={setCoverFile} shape="wide" />
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Campaign Banner" autoFocus />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Type" value={type} onChange={(e) => setType(e.target.value as AssetType)} className="capitalize">
            {TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
          </Select>
          <Select label="Folder" value={folderId} onChange={(e) => setFolderId(e.target.value)}>
            <option value="">No folder</option>
            {folders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
        </div>
        <Input label="Category / Tag" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Campaign 2026" />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
        <div className="border-t border-[#E4DFD3] pt-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Files / Formats</p>
          <div className="flex flex-col gap-3">
            {variants.map((vd, i) => (
              <div key={vd.id} className="flex items-end gap-2">
                <div className="w-24 shrink-0">
                  <Input label="Label" value={vd.label} onChange={(e) => updateVariant(i, { ...vd, label: e.target.value })} placeholder="PNG" />
                </div>
                <div className="flex-1">
                  <UploadField label="File" value={vd.file} accept="" onChange={(f) => updateVariant(i, { ...vd, file: f })} shape="wide" />
                </div>
                {variants.length > 1 && (
                  <button type="button" onClick={() => setVariants(variants.filter((_, j) => j !== i))} className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setVariants([...variants, { id: makeFileId(), label: "", file: null }])} className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--accent-terracotta)] hover:underline">
            <Plus size={12} /> Add format
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientAssetsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const notify = useToast();
  const authUser = useBrandStore((s) => s.authUser);
  const clientAccess = useBrandStore((s) => s.clientAccess);
  const brands = useBrandStore((s) => s.brands);
  const updateDraft = useBrandStore((s) => s.updateDraft);

  const brand = useMemo(
    () => brands.find((b) => b.publishedData?.slug === slug || b.draftData.slug === slug),
    [brands, slug]
  );

  useEffect(() => {
    if (!authUser) { router.replace("/login/client"); return; }
    if (!brand) return;
    const hasAccess =
      authUser.role === "agency" ||
      clientAccess.some((a) => a.brandId === brand.id && a.email === authUser.email);
    if (!hasAccess) router.replace("/portal");
  }, [authUser, brand, clientAccess, router]);

  const [query, setQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<"all" | "uncategorized" | string>("all");
  const [detailAsset, setDetailAsset] = useState<LibraryAsset | null>(null);
  const [contributeOpen, setContributeOpen] = useState(false);

  if (!authUser || !brand) return null;

  const data = brand.publishedData ?? brand.draftData;
  const { assets, assetFolders } = data;

  const byFolder = useMemo(() => {
    if (activeFolder === "all") return assets;
    if (activeFolder === "uncategorized") return assets.filter((a) => !a.folderId);
    return assets.filter((a) => a.folderId === activeFolder);
  }, [assets, activeFolder]);

  const filtered = useMemo(
    () => byFolder.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [byFolder, query]
  );

  const uncategorizedCount = assets.filter((a) => !a.folderId).length;

  function handleContribute(assetData: Omit<LibraryAsset, "id" | "uploadedAt">) {
    if (!authUser || !brand) return;
    const newAsset: LibraryAsset = {
      id: makeFileId(),
      uploadedAt: new Date().toISOString(),
      ...assetData,
      uploadedBy: authUser.email,
    };
    updateDraft(brand.id, (d) => ({ ...d, assets: [newAsset, ...d.assets] }));
    setContributeOpen(false);
    notify("Asset contributed — agency will see it in the CMS");
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#E4DFD3] bg-[#F7F5F0]/90 px-5 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <Link href={`/brand/${slug}`} className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-[#14140F]">
            <ArrowLeft size={14} /> {data.name}
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#14140F]">
            <Archive size={13} /> Assets
          </span>
        </div>
        <Button size="sm" onClick={() => setContributeOpen(true)}>
          <Plus size={13} /> Contribute
        </Button>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
        {/* Folder tiles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <FolderTile
            label="All assets"
            count={assets.length}
            active={activeFolder === "all"}
            icon={Layers}
            onClick={() => setActiveFolder("all")}
          />
          {assetFolders.map((folder) => (
            <FolderTile
              key={folder.id}
              label={folder.name}
              count={assets.filter((a) => a.folderId === folder.id).length}
              active={activeFolder === folder.id}
              icon={Folder}
              onClick={() => setActiveFolder(folder.id)}
            />
          ))}
          {assetFolders.length > 0 && uncategorizedCount > 0 && (
            <FolderTile
              label="Uncategorized"
              count={uncategorizedCount}
              active={activeFolder === "uncategorized"}
              icon={FolderOpen}
              onClick={() => setActiveFolder("uncategorized")}
            />
          )}
        </div>

        {/* Search */}
        <div className="mt-6 relative w-full sm:w-64">
          <Search size={13} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets…"
            className="focus-ring h-9 w-full rounded-xl border border-[#DDD6C6] bg-white pl-8 pr-3 text-[13px] placeholder:text-neutral-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Masonry grid */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No assets here"
              description="Nothing uploaded yet. Contribute an asset using the button above."
            />
          ) : (
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
              {filtered.map((asset) => (
                <div key={asset.id} className="mb-4 break-inside-avoid">
                  <ClientAssetCard asset={asset} onDetail={() => setDetailAsset(asset)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AssetDetailModal asset={detailAsset} onClose={() => setDetailAsset(null)} />
      <ContributeModal
        open={contributeOpen}
        onClose={() => setContributeOpen(false)}
        assetFolders={assetFolders}
        onSave={handleContribute}
      />
    </div>
  );
}
