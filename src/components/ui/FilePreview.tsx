"use client";

import { FileRef } from "@/lib/types";
import { useFileUrl } from "@/lib/useFileUrl";
import { FileText } from "lucide-react";

export function FilePreview({ file, alt, fit = "contain", className = "" }: { file: FileRef | null | undefined; alt: string; fit?: "contain" | "cover"; className?: string }) {
  const url = useFileUrl(file?.fileId);
  const isImage = file ? file.mimeType.startsWith("image/") : false;

  if (!file) {
    return (
      <div className={`flex h-full w-full items-center justify-center text-neutral-300 ${className}`}>
        <FileText size={22} strokeWidth={1.5} />
      </div>
    );
  }

  if (isImage && url) {
    return <img src={url} alt={alt} className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} />;
  }

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-1.5 text-neutral-500 ${className}`}>
      <FileText size={22} strokeWidth={1.5} />
      <span className="max-w-[80%] truncate text-[11px]">{file.name}</span>
    </div>
  );
}
