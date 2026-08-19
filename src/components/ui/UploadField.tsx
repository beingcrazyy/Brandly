"use client";

import { useRef, useState } from "react";
import { FileRef } from "@/lib/types";
import { putFile, makeFileId, deleteFile } from "@/lib/files";
import { FilePreview } from "./FilePreview";
import { UploadCloud, X } from "lucide-react";

interface Props {
  label?: string;
  helper?: string;
  value: FileRef | null;
  onChange: (file: FileRef | null) => void;
  accept?: string;
  shape?: "square" | "wide";
}

export function UploadField({ label, helper, value, onChange, accept = "image/*,.svg", shape = "wide" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const fileId = makeFileId();
    await putFile(fileId, file, file.name);
    onChange({ fileId, name: file.name, mimeType: file.type });
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-[13px] font-medium text-[#14140F]">{label}</span>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative overflow-hidden rounded-xl border ${dragOver ? "border-[#9C927A] bg-black/[0.03]" : "border-[#DDD6C6]"} ${shape === "wide" ? "aspect-[16/9]" : "aspect-square w-28"} flex items-center justify-center bg-black/[0.015] transition-colors`}
      >
        {value ? (
          <>
            <FilePreview file={value} alt={value.name} className="p-3" />
            <button
              type="button"
              onClick={() => {
                deleteFile(value.fileId);
                onChange(null);
              }}
              aria-label="Remove file"
              className="focus-ring absolute top-1.5 right-1.5 rounded-full bg-white/90 p-1 text-neutral-500 shadow hover:text-red-600"
            >
              <X size={13} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="focus-ring flex flex-col items-center gap-1.5 px-4 py-3 text-neutral-400 hover:text-neutral-600"
          >
            <UploadCloud size={20} strokeWidth={1.5} />
            <span className="text-[12px]">Drop file or click to upload</span>
          </button>
        )}
      </div>
      {value && (
        <button type="button" onClick={() => inputRef.current?.click()} className="focus-ring self-start text-[12px] font-medium text-neutral-500 hover:text-neutral-800">
          Replace file
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {helper && <p className="text-[12px] leading-snug text-neutral-500">{helper}</p>}
    </div>
  );
}
