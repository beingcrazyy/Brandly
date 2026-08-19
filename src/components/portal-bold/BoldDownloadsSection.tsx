"use client";

import { useMemo, useState } from "react";
import { BrandData } from "@/lib/types";
import { BoldSection } from "./BoldSection";
import { FilePreview } from "../ui/FilePreview";
import { downloadFile } from "@/lib/files";
import { Search, Download } from "lucide-react";

export function BoldDownloadsSection({ data }: { data: BrandData }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => data.assets.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())), [data.assets, query]);

  return (
    <BoldSection id="downloads" index="13" title="Downloads" subtitle="Every approved asset, ready to use.">
      <div className="relative mb-8 max-w-sm">
        <Search size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "var(--brand-muted)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search assets..."
          className="focus-ring h-10 w-full border-b-2 bg-transparent pl-9 text-[14px]"
          style={{ borderColor: "var(--brand-accent)", color: "var(--brand-text)" }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((asset) => (
          <div key={asset.id} className="group">
            <div className="flex aspect-square items-center justify-center p-6" style={{ backgroundColor: "color-mix(in srgb, var(--brand-text) 4%, transparent)" }}>
              <FilePreview file={asset.file} alt={asset.name} />
            </div>
            <div className="flex items-center justify-between gap-2 pt-3">
              <p className="truncate text-[13px] font-medium" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                {asset.name}
              </p>
              <button
                onClick={() => asset.file && downloadFile(asset.file.fileId, asset.file.name)}
                aria-label={`Download ${asset.name}`}
                className="focus-ring flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                style={{ color: "#fff", backgroundColor: "var(--brand-accent)" }}
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </BoldSection>
  );
}
