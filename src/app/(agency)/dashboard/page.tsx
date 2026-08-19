"use client";

import { useMemo, useState } from "react";
import { useBrandStore } from "@/lib/store";
import { BrandCard } from "@/components/BrandCard";
import { CreateBrandModal } from "@/components/CreateBrandModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Plus, Sparkles } from "lucide-react";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const brands = useBrandStore((s) => s.brands);
  const [createOpen, setCreateOpen] = useState(false);

  const stats = useMemo(() => {
    const published = brands.filter((b) => b.status === "published").length;
    const drafts = brands.length - published;
    const lastUpdated = brands
      .map((b) => b.updatedAt)
      .sort()
      .at(-1);
    return {
      total: brands.length,
      published,
      drafts,
      lastUpdated: lastUpdated ? new Date(lastUpdated).toLocaleDateString("en-US", { day: "2-digit", month: "short" }) : "—",
    };
  }, [brands]);

  return (
    <div className="py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[32px] leading-tight font-medium tracking-tight text-[#14140F] italic">
          {greeting()}, Anshu.
        </h1>
        <p className="max-w-xl text-[15px] text-neutral-500">
          Manage your brands, identities and digital brand systems from one place.
        </p>
      </div>

      <div className="mt-9 grid grid-cols-2 divide-x divide-y divide-[#E4DFD3] overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white sm:grid-cols-4 sm:divide-y-0">
        {[
          { label: "Total Brands", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Drafts", value: stats.drafts },
          { label: "Last Updated", value: stats.lastUpdated },
        ].map((s) => (
          <div key={s.label} className="px-5 py-4">
            <p className="font-mono text-[10.5px] font-medium tracking-[0.1em] text-neutral-500 uppercase">{s.label}</p>
            <p className="mt-2 font-mono text-[28px] font-medium text-[#14140F]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex items-center justify-between">
        <h2 className="font-serif text-[20px] font-medium text-[#14140F]">Your brands</h2>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={15} /> Create Brand
        </Button>
      </div>

      <div className="mt-5">
        {brands.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No brands yet"
            description="Create your first brand to start building a digital brand portal from structured data."
            action={
              <Button onClick={() => setCreateOpen(true)}>
                <Plus size={15} /> Create Brand
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        )}
      </div>

      <CreateBrandModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
