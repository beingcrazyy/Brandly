"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "@/lib/types";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { FilePreview } from "./ui/FilePreview";
import { useBrandStore } from "@/lib/store";
import { computeCompletion } from "@/lib/completion";
import { MoreHorizontal } from "lucide-react";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

export function BrandCard({ brand }: { brand: Brand }) {
  const router = useRouter();
  const deleteBrand = useBrandStore((s) => s.deleteBrand);
  const data = brand.draftData;
  const logo = data.logos.find((l) => l.variant === "primary")?.file ?? data.coverImage;
  const completion = computeCompletion(data);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(20,20,15,0.08)]">
      <Link href={`/brands/${brand.id}/overview`} className="block aspect-[16/9] overflow-hidden border-b border-[#E4DFD3] bg-black/[0.02]">
        <FilePreview file={logo} alt={data.name} className="p-8 transition-transform duration-500 group-hover:scale-[1.04]" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-[17px] font-medium text-[#14140F]">{data.name}</h3>
            <p className="mt-0.5 line-clamp-1 text-[13px] text-neutral-500">{data.description || "No description yet"}</p>
          </div>
          <details className="relative">
            <summary className="focus-ring flex h-7 w-7 list-none items-center justify-center rounded-full text-neutral-400 hover:bg-black/5 hover:text-neutral-700">
              <MoreHorizontal size={16} />
            </summary>
            <div className="absolute top-8 right-0 z-10 w-36 rounded-xl border border-[#E4DFD3] bg-white py-1 shadow-lg">
              <button
                onClick={() => {
                  if (confirm(`Delete ${data.name}? This can't be undone.`)) deleteBrand(brand.id);
                }}
                className="focus-ring w-full px-3 py-1.5 text-left text-[13px] text-red-600 hover:bg-red-50"
              >
                Delete brand
              </button>
            </div>
          </details>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={brand.status === "published" ? "success" : "neutral"}>{brand.status}</Badge>
          <span className="font-mono text-[11px] text-neutral-400">Updated {formatDate(brand.updatedAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
            <div className="h-full rounded-full bg-[var(--accent-terracotta)]" style={{ width: `${completion.percent}%` }} />
          </div>
          <span className="font-mono text-[10.5px] text-neutral-400">{completion.percent}%</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Button size="sm" variant="secondary" className="flex-1" onClick={() => router.push(`/brands/${brand.id}/overview`)}>
            Edit
          </Button>
          <Button
            size="sm"
            className="flex-1"
            disabled={brand.status !== "published"}
            onClick={() => window.open(`/brand/${data.slug}`, "_blank")}
          >
            View Brand
          </Button>
        </div>
      </div>
    </div>
  );
}
