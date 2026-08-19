"use client";

import { useMemo, useState } from "react";
import { BrandData } from "@/lib/types";
import { PortalSection } from "./PortalSection";
import { FilePreview } from "../ui/FilePreview";
import { downloadFile } from "@/lib/files";
import { Search, Download } from "lucide-react";

const FILTERS = ["All", "logo", "font", "icon", "illustration", "photography", "social", "presentation", "document", "misc"] as const;

export function DownloadsSection({ data }: { data: BrandData }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      data.assets.filter((a) => {
        const matchesFilter = filter === "All" || a.type === filter;
        const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [data.assets, query, filter]
  );

  return (
    <PortalSection id="downloads" index="13" title="Downloads" subtitle="Every approved asset, ready to use.">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="focus-ring px-3 py-1.5 text-[12px] font-medium capitalize transition-colors"
              style={{
                borderRadius: "var(--radius-large)",
                backgroundColor: filter === f ? "var(--brand-text)" : "transparent",
                color: filter === f ? "var(--brand-background)" : "var(--brand-muted)",
                border: filter === f ? "none" : "1px solid color-mix(in srgb, var(--brand-text) 15%, transparent)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "var(--brand-muted)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            className="focus-ring h-10 w-full border pl-9 pr-3 text-[13px]"
            style={{ borderColor: "color-mix(in srgb, var(--brand-text) 15%, transparent)", borderRadius: "var(--radius-medium)", color: "var(--brand-text)", background: "transparent" }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[14px]" style={{ color: "var(--brand-muted)" }}>
          No assets match your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <div key={asset.id} className="group border" style={{ borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)", borderRadius: "var(--radius-medium)" }}>
              <div className="flex aspect-square items-center justify-center p-6" style={{ borderBottom: "1px solid color-mix(in srgb, var(--brand-text) 10%, transparent)" }}>
                <FilePreview file={asset.file} alt={asset.name} />
              </div>
              <div className="flex items-center justify-between gap-2 p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-text)" }}>
                    {asset.name}
                  </p>
                  <p className="truncate text-[11px]" style={{ color: "var(--brand-muted)" }}>
                    {asset.category || asset.type}
                  </p>
                </div>
                <button
                  onClick={() => asset.file && downloadFile(asset.file.fileId, asset.file.name)}
                  aria-label={`Download ${asset.name}`}
                  className="focus-ring flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{ color: "var(--brand-accent)", backgroundColor: "color-mix(in srgb, var(--brand-accent) 12%, transparent)" }}
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalSection>
  );
}
