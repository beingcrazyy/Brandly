"use client";

import { useMemo, useState } from "react";
import { useBrandStore } from "@/lib/store";
import { BrandCard } from "@/components/BrandCard";
import { CreateBrandModal } from "@/components/CreateBrandModal";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Plus, Search, Sparkles } from "lucide-react";

const FILTERS = ["All", "Published", "Draft"] as const;

export default function BrandsPage() {
  const brands = useBrandStore((s) => s.brands);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return brands.filter((b) => {
      const matchesFilter = filter === "All" || (filter === "Published" ? b.status === "published" : b.status === "draft");
      const matchesQuery = b.draftData.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [brands, query, filter]);

  return (
    <div className="py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#14140F]">Brands</h1>
          <p className="mt-1 text-[14px] text-neutral-500">{brands.length} brand{brands.length === 1 ? "" : "s"} in your workspace</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={15} /> Create Brand
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs options={FILTERS} value={filter} onChange={setFilter} />
        <div className="relative w-full sm:w-64">
          <Search size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands..."
            className="focus-ring h-9 w-full rounded-xl border border-[#DDD6C6] bg-white pl-8 pr-3 text-[13px] placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No brands found"
            description="Try a different search or filter, or create a new brand."
            action={
              <Button onClick={() => setCreateOpen(true)}>
                <Plus size={15} /> Create Brand
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        )}
      </div>

      <CreateBrandModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
