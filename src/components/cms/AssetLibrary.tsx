"use client";

import { useMemo, useState } from "react";
import { LibraryAsset, AssetFolder, AssetType, AssetVariant, FileRef } from "@/lib/types";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input, Textarea, Select } from "../ui/Field";
import { UploadField } from "../ui/UploadField";
import { downloadFile, deleteFile, makeFileId, putFile } from "@/lib/files";
import { useFileUrl } from "@/lib/useFileUrl";
import { useToast } from "../ui/Toast";
import {
  Folder, FolderOpen, Plus, Search, Download, Trash2,
  FileText, Pencil, X, Package, Layers,
} from "lucide-react";

const TYPES: AssetType[] = [
  "logo", "font", "icon", "illustration", "photography",
  "social", "presentation", "document", "misc",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

function VariantChips({
  variants,
  maxVisible = 3,
  onOverflow,
}: {
  variants: AssetVariant[];
  maxVisible?: number;
  onOverflow?: () => void;
}) {
  const shown = variants.slice(0, maxVisible);
  const rest = variants.length - maxVisible;
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((v) => (
        <button
          key={v.id}
          onClick={(e) => { e.stopPropagation(); downloadFile(v.file.fileId, v.file.name); }}
          className="flex items-center gap-1 rounded-md border border-[#DDD6C6] bg-[#F7F5F0] px-2 py-0.5 text-[10.5px] font-medium text-neutral-600 transition-colors hover:border-[#14140F] hover:text-[#14140F]"
        >
          <Download size={9} /> {v.label}
        </button>
      ))}
      {rest > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onOverflow?.(); }}
          className="rounded-md border border-dashed border-[#DDD6C6] px-2 py-0.5 text-[10.5px] text-neutral-400 hover:text-neutral-600"
        >
          +{rest} more
        </button>
      )}
    </div>
  );
}

// ─── Folder tiles ─────────────────────────────────────────────────────────────

function FolderTile({
  label,
  count,
  active,
  icon: Icon,
  onClick,
  onEdit,
}: {
  label: string;
  count: number;
  active: boolean;
  icon: React.ElementType;
  onClick: () => void;
  onEdit?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 transition-all ${
        active
          ? "border-[#14140F] bg-[#14140F] text-white shadow-sm"
          : "border-[#E4DFD3] bg-white text-[#14140F] hover:border-neutral-300 hover:shadow-sm"
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        className={active ? "text-white/70" : "text-neutral-400"}
      />
      <div>
        <p className={`truncate text-[13px] font-medium leading-tight ${active ? "text-white" : "text-[#14140F]"}`}>
          {label}
        </p>
        <p className={`mt-0.5 text-[11.5px] ${active ? "text-white/60" : "text-neutral-400"}`}>
          {count} {count === 1 ? "asset" : "assets"}
        </p>
      </div>

      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          aria-label={`Edit ${label}`}
          className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100 ${
            active ? "hover:bg-white/20 text-white/70" : "hover:bg-black/5 text-neutral-400"
          }`}
        >
          <Pencil size={11} />
        </button>
      )}
    </div>
  );
}

function NewFolderTile({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#DDD6C6] bg-white p-4 text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600"
    >
      <Plus size={18} strokeWidth={1.5} />
      <span className="text-[12px] font-medium">New folder</span>
    </button>
  );
}

// ─── Asset Card ───────────────────────────────────────────────────────────────

function AssetCard({
  asset,
  onDetail,
  onEdit,
  onDelete,
}: {
  asset: LibraryAsset;
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#E4DFD3] bg-white transition-shadow hover:shadow-[0_4px_16px_rgba(20,20,15,0.07)]">
      <div className="relative cursor-pointer" onClick={onDetail}>
        <CardPreview asset={asset} />
        <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:bg-black/20" />
      </div>

      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-[13px] font-medium text-[#14140F]">{asset.name}</p>
          <span className="shrink-0 rounded-md bg-black/[0.05] px-1.5 py-0.5 font-mono text-[9.5px] capitalize text-neutral-500">
            {asset.type}
          </span>
        </div>

        <div className="mt-2">
          <VariantChips variants={asset.variants} onOverflow={onDetail} />
        </div>

        <div className="mt-2 flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            aria-label={`Edit ${asset.name}`}
            className="flex h-6 w-6 items-center justify-center rounded-lg text-neutral-400 hover:bg-black/5 hover:text-neutral-700"
          >
            <Pencil size={11} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            aria-label={`Delete ${asset.name}`}
            className="flex h-6 w-6 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

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

function AssetDetailModal({
  asset,
  onClose,
  onUpdate,
}: {
  asset: LibraryAsset | null;
  onClose: () => void;
  onUpdate: (updated: LibraryAsset) => void;
}) {
  const notify = useToast();
  const [variantLabel, setVariantLabel] = useState("");
  const [variantFile, setVariantFile] = useState<FileRef | null>(null);
  const coverInputRef = useState<HTMLInputElement | null>(null);

  async function handleAddVariant() {
    if (!asset || !variantFile || !variantLabel.trim()) return;
    const variant: AssetVariant = {
      id: makeFileId(),
      label: variantLabel.trim(),
      file: variantFile,
      addedAt: new Date().toISOString(),
    };
    onUpdate({ ...asset, variants: [...asset.variants, variant] });
    setVariantLabel("");
    setVariantFile(null);
    notify("Variant added");
  }

  async function handleReplaceCover(e: React.ChangeEvent<HTMLInputElement>) {
    if (!asset) return;
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fileId = makeFileId();
      await putFile(fileId, file, file.name);
      const newCover: FileRef = { fileId, name: file.name, mimeType: file.type };
      if (asset.coverFile) deleteFile(asset.coverFile.fileId);
      onUpdate({ ...asset, coverFile: newCover });
      notify("Cover updated");
    } catch {
      notify("Upload failed");
    }
  }

  function handleDeleteVariant(variantId: string) {
    if (!asset) return;
    const v = asset.variants.find((x) => x.id === variantId);
    if (v) deleteFile(v.file.fileId);
    onUpdate({ ...asset, variants: asset.variants.filter((x) => x.id !== variantId) });
    notify("Variant removed");
  }

  if (!asset) return null;

  return (
    <Modal open={!!asset} onClose={onClose} title={asset.name} width="lg">
      <div className="flex flex-col gap-5">
        <DetailPreview asset={asset} />

        <div className="flex flex-wrap gap-3 text-[12px] text-neutral-500">
          <span className="capitalize rounded-md bg-black/[0.05] px-2 py-0.5 font-mono text-[10.5px]">{asset.type}</span>
          {asset.category && <span>{asset.category}</span>}
          <span>{new Date(asset.uploadedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
          {asset.uploadedBy && <span>by {asset.uploadedBy}</span>}
        </div>

        {asset.description && (
          <p className="text-[13px] leading-relaxed text-neutral-500">{asset.description}</p>
        )}

        <label className="cursor-pointer text-[12px] font-medium text-[var(--accent-terracotta)] hover:underline">
          Replace cover image
          <input type="file" accept="image/*" className="hidden" onChange={handleReplaceCover} />
        </label>

        <div className="border-t border-[#E4DFD3] pt-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-neutral-400">
            Variants ({asset.variants.length})
          </p>
          <div className="flex flex-col gap-2">
            {asset.variants.map((v) => (
              <div key={v.id} className="flex items-center gap-3 rounded-xl border border-[#E4DFD3] bg-[#F7F5F0] px-3.5 py-2.5">
                <span className="w-16 shrink-0 rounded-md border border-[#DDD6C6] bg-white px-1.5 py-0.5 text-center font-mono text-[10px] font-medium text-neutral-600">
                  {v.label}
                </span>
                <p className="min-w-0 flex-1 truncate text-[12.5px] text-neutral-600">{v.file.name}</p>
                <button
                  onClick={() => downloadFile(v.file.fileId, v.file.name)}
                  aria-label={`Download ${v.label}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg hover:bg-black/5"
                >
                  <Download size={13} className="text-neutral-500" />
                </button>
                {asset.variants.length > 1 && (
                  <button
                    onClick={() => handleDeleteVariant(v.id)}
                    aria-label={`Remove ${v.label}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={12} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-end gap-2">
            <div className="w-24 shrink-0">
              <Input label="Label" value={variantLabel} onChange={(e) => setVariantLabel(e.target.value)} placeholder="SVG" />
            </div>
            <div className="flex-1">
              <UploadField label="File" value={variantFile} accept="" onChange={setVariantFile} shape="wide" />
            </div>
            <Button size="sm" onClick={handleAddVariant} disabled={!variantLabel.trim() || !variantFile} className="shrink-0">
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Upload / Edit form ───────────────────────────────────────────────────────

interface VariantDraft {
  id: string;
  label: string;
  file: FileRef | null;
}

function blankVariantDraft(): VariantDraft {
  return { id: makeFileId(), label: "", file: null };
}

interface AssetDraft {
  name: string;
  type: AssetType;
  category: string;
  description: string;
  coverFile: FileRef | null;
  folderId: string | undefined;
  variantDrafts: VariantDraft[];
}

function blankDraft(): AssetDraft {
  return { name: "", type: "misc", category: "", description: "", coverFile: null, folderId: undefined, variantDrafts: [blankVariantDraft()] };
}

function assetToDraft(asset: LibraryAsset): AssetDraft {
  return {
    name: asset.name,
    type: asset.type,
    category: asset.category,
    description: asset.description,
    coverFile: asset.coverFile,
    folderId: asset.folderId,
    variantDrafts: asset.variants.map((v) => ({ id: v.id, label: v.label, file: v.file })),
  };
}

function AssetFormModal({
  open,
  onClose,
  title,
  initial,
  assetFolders,
  onSave,
  oldAsset,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  initial: AssetDraft;
  assetFolders: AssetFolder[];
  onSave: (asset: Omit<LibraryAsset, "id" | "uploadedAt">) => void;
  oldAsset?: LibraryAsset;
}) {
  const notify = useToast();
  const [draft, setDraft] = useState<AssetDraft>(initial);
  const [saving, setSaving] = useState(false);
  const canSave = draft.name.trim().length > 0 && draft.variantDrafts.some((v) => v.file);

  async function handleSave() {
    setSaving(true);
    try {
      const variants: AssetVariant[] = [];
      for (const vd of draft.variantDrafts) {
        if (!vd.file) continue;
        variants.push({
          id: vd.id,
          label: vd.label || vd.file.name.split(".").pop()?.toUpperCase() || "File",
          file: vd.file,
          addedAt: new Date().toISOString(),
        });
      }
      if (oldAsset) {
        const newIds = new Set(variants.map((v) => v.id));
        for (const ov of oldAsset.variants) {
          if (!newIds.has(ov.id)) deleteFile(ov.file.fileId);
        }
        if (oldAsset.coverFile && draft.coverFile?.fileId !== oldAsset.coverFile.fileId) {
          deleteFile(oldAsset.coverFile.fileId);
        }
      }
      onSave({
        name: draft.name.trim(),
        type: draft.type,
        category: draft.category.trim(),
        description: draft.description.trim(),
        coverFile: draft.coverFile,
        variants,
        folderId: draft.folderId || undefined,
        uploadedBy: oldAsset?.uploadedBy,
      });
    } catch {
      notify("Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateVariant(idx: number, updated: VariantDraft) {
    const next = [...draft.variantDrafts];
    next[idx] = updated;
    setDraft({ ...draft, variantDrafts: next });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!canSave || saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <UploadField label="Cover image (optional)" value={draft.coverFile} accept="image/*" onChange={(f) => setDraft({ ...draft, coverFile: f })} shape="wide" />
        <Input label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Primary Logo" autoFocus />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Type"
            value={draft.type}
            onChange={(e) => setDraft({ ...draft, type: e.target.value as AssetType })}
            className="capitalize"
            disabled={!!draft.folderId}
          >
            {TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
          </Select>
          <Select label="Folder" value={draft.folderId ?? ""} onChange={(e) => setDraft({ ...draft, folderId: e.target.value || undefined })}>
            <option value="">No folder</option>
            {assetFolders.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </Select>
        </div>
        <Input label="Category / Tag" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} placeholder="e.g. Campaign 2026" />
        <Textarea label="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} />

        <div className="border-t border-[#E4DFD3] pt-4">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Formats / Variants</p>
          <div className="flex flex-col gap-3">
            {draft.variantDrafts.map((vd, i) => (
              <div key={vd.id} className="flex items-end gap-2">
                <div className="w-24 shrink-0">
                  <Input label="Label" value={vd.label} onChange={(e) => updateVariant(i, { ...vd, label: e.target.value })} placeholder="SVG" />
                </div>
                <div className="flex-1">
                  <UploadField label="File" value={vd.file} accept="" onChange={(f) => updateVariant(i, { ...vd, file: f })} shape="wide" />
                </div>
                {draft.variantDrafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, variantDrafts: draft.variantDrafts.filter((_, j) => j !== i) })}
                    className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setDraft({ ...draft, variantDrafts: [...draft.variantDrafts, blankVariantDraft()] })}
            className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--accent-terracotta)] hover:underline"
          >
            <Plus size={12} /> Add format
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AssetLibrary({
  assets,
  assetFolders,
  onChange,
}: {
  assets: LibraryAsset[];
  assetFolders: AssetFolder[];
  onChange: (assets: LibraryAsset[], assetFolders: AssetFolder[]) => void;
}) {
  const notify = useToast();
  const [query, setQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<"all" | "uncategorized" | string>("all");
  const [typeFilter, setTypeFilter] = useState<AssetType | "all">("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editAsset, setEditAsset] = useState<LibraryAsset | null>(null);
  const [detailAsset, setDetailAsset] = useState<LibraryAsset | null>(null);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<AssetFolder | null>(null);
  const [folderDraftName, setFolderDraftName] = useState("");

  const byFolder = useMemo(() => {
    let list =
      activeFolder === "all" ? assets :
      activeFolder === "uncategorized" ? assets.filter((a) => !a.folderId) :
      assets.filter((a) => a.folderId === activeFolder);
    if (activeFolder === "all" && typeFilter !== "all") list = list.filter((a) => a.type === typeFilter);
    return list;
  }, [assets, activeFolder, typeFilter]);

  const filtered = useMemo(
    () => byFolder.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [byFolder, query]
  );

  const uncategorizedCount = useMemo(
    () => assets.filter((a) => !a.folderId).length,
    [assets]
  );

  // ── Asset CRUD ──

  function handleSaveNew(data: Omit<LibraryAsset, "id" | "uploadedAt">) {
    const asset: LibraryAsset = { id: makeFileId(), uploadedAt: new Date().toISOString(), ...data };
    onChange([asset, ...assets], assetFolders);
    setUploadOpen(false);
    notify("Asset uploaded");
  }

  function handleSaveEdit(data: Omit<LibraryAsset, "id" | "uploadedAt">) {
    if (!editAsset) return;
    const updated = { ...editAsset, ...data };
    onChange(assets.map((a) => (a.id === editAsset.id ? updated : a)), assetFolders);
    if (detailAsset?.id === editAsset.id) setDetailAsset(updated);
    setEditAsset(null);
    notify("Asset updated");
  }

  function handleDetailUpdate(updated: LibraryAsset) {
    onChange(assets.map((a) => (a.id === updated.id ? updated : a)), assetFolders);
    setDetailAsset(updated);
  }

  function removeAsset(asset: LibraryAsset) {
    if (asset.coverFile) deleteFile(asset.coverFile.fileId);
    asset.variants.forEach((v) => deleteFile(v.file.fileId));
    onChange(assets.filter((a) => a.id !== asset.id), assetFolders);
    notify("Asset deleted");
  }

  // ── Folder CRUD ──

  function closeFolderModal() {
    setFolderModalOpen(false);
    setEditingFolder(null);
    setFolderDraftName("");
  }

  function createFolder() {
    if (!folderDraftName.trim()) return;
    const folder: AssetFolder = { id: makeFileId(), name: folderDraftName.trim(), createdAt: new Date().toISOString() };
    onChange(assets, [...assetFolders, folder]);
    closeFolderModal();
    notify("Folder created");
  }

  function renameFolder() {
    if (!editingFolder || !folderDraftName.trim()) return;
    onChange(assets, assetFolders.map((f) => f.id === editingFolder.id ? { ...f, name: folderDraftName.trim() } : f));
    closeFolderModal();
    notify("Folder renamed");
  }

  function deleteFolder(folderId: string) {
    onChange(
      assets.map((a) => a.folderId === folderId ? { ...a, folderId: undefined } : a),
      assetFolders.filter((f) => f.id !== folderId)
    );
    if (activeFolder === folderId) setActiveFolder("all");
    closeFolderModal();
    notify("Folder deleted");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Folder tiles */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-neutral-400">Folders</p>
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            <Plus size={14} /> Upload Asset
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Brand Assets tile (default) */}
          <FolderTile
            label="Brand Assets"
            count={assets.length}
            active={activeFolder === "all"}
            icon={Layers}
            onClick={() => { setActiveFolder("all"); setTypeFilter("all"); }}
          />

          {/* Custom folder tiles */}
          {assetFolders.map((folder) => (
            <FolderTile
              key={folder.id}
              label={folder.name}
              count={assets.filter((a) => a.folderId === folder.id).length}
              active={activeFolder === folder.id}
              icon={Folder}
              onClick={() => { setActiveFolder(folder.id); setTypeFilter("all"); }}
              onEdit={() => {
                setEditingFolder(folder);
                setFolderDraftName(folder.name);
                setFolderModalOpen(true);
              }}
            />
          ))}

          {/* Uncategorized tile — only when there are folders and loose assets */}
          {assetFolders.length > 0 && uncategorizedCount > 0 && (
            <FolderTile
              label="Uncategorized"
              count={uncategorizedCount}
              active={activeFolder === "uncategorized"}
              icon={FolderOpen}
              onClick={() => setActiveFolder("uncategorized")}
            />
          )}

          {/* New folder tile */}
          <NewFolderTile onClick={() => { setEditingFolder(null); setFolderDraftName(""); setFolderModalOpen(true); }} />
        </div>

        {/* Type sub-tabs — only shown inside Brand Assets */}
        {activeFolder === "all" && (
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-0.5">
            {(["all", ...TYPES] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${
                  typeFilter === t
                    ? "bg-[#14140F] text-white"
                    : "border border-[#E4DFD3] bg-white text-neutral-500 hover:border-neutral-400 hover:text-[#14140F]"
                }`}
              >
                {t === "all" ? "All" : t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search bar */}
      <div className="relative w-full sm:w-64">
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
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No assets here"
          description={
            activeFolder === "all"
              ? "Upload approved logos, fonts, icons and marketing files."
              : "No assets in this folder yet."
          }
          action={<Button onClick={() => setUploadOpen(true)}><Plus size={15} /> Upload Asset</Button>}
        />
      ) : (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filtered.map((asset) => (
            <div key={asset.id} className="mb-4 break-inside-avoid">
              <AssetCard
                asset={asset}
                onDetail={() => setDetailAsset(asset)}
                onEdit={() => setEditAsset(asset)}
                onDelete={() => removeAsset(asset)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload modal */}
      {uploadOpen && (
        <AssetFormModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          title="Upload Asset"
          initial={blankDraft()}
          assetFolders={assetFolders}
          onSave={handleSaveNew}
        />
      )}

      {/* Edit modal */}
      {editAsset && (
        <AssetFormModal
          key={editAsset.id}
          open={!!editAsset}
          onClose={() => setEditAsset(null)}
          title="Edit Asset"
          initial={assetToDraft(editAsset)}
          assetFolders={assetFolders}
          onSave={handleSaveEdit}
          oldAsset={editAsset}
        />
      )}

      {/* Detail modal */}
      <AssetDetailModal
        asset={detailAsset}
        onClose={() => setDetailAsset(null)}
        onUpdate={handleDetailUpdate}
      />

      {/* Folder create / rename / delete modal */}
      <Modal
        open={folderModalOpen}
        onClose={closeFolderModal}
        title={editingFolder ? "Edit Folder" : "New Folder"}
        width="sm"
        footer={
          <div className="flex w-full items-center">
            {editingFolder && (
              <Button variant="danger" onClick={() => deleteFolder(editingFolder.id)} className="mr-auto">
                Delete folder
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" onClick={closeFolderModal}>Cancel</Button>
              <Button onClick={editingFolder ? renameFolder : createFolder} disabled={!folderDraftName.trim()}>
                {editingFolder ? "Rename" : "Create"}
              </Button>
            </div>
          </div>
        }
      >
        <Input
          label="Folder name"
          value={folderDraftName}
          onChange={(e) => setFolderDraftName(e.target.value)}
          placeholder="e.g. Logos, Social Media, Events 2026"
          autoFocus
          onKeyDown={(e) => { if (e.key === "Enter") editingFolder ? renameFolder() : createFolder(); }}
        />
      </Modal>
    </div>
  );
}
