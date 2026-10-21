"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBrandStore } from "@/lib/store";
import { BrandlyMark } from "@/components/BrandlyMark";
import { Button } from "@/components/ui/Button";
import { useFileUrl } from "@/lib/useFileUrl";
import { EmptyState } from "@/components/ui/EmptyState";
import { Layers } from "lucide-react";
import type { Brand } from "@/lib/types";

function BrandPortalCard({ brand }: { brand: Brand }) {
  const data = brand.publishedData!;
  const coverUrl = useFileUrl(data.coverImage?.fileId);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-40 overflow-hidden bg-neutral-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={data.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <Layers size={28} strokeWidth={1.5} className="text-neutral-300" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h2 className="font-serif text-[18px] font-medium text-[#14140F]">{data.name}</h2>
        {data.description && (
          <p className="mt-1 line-clamp-2 text-[13px] text-neutral-500">{data.description}</p>
        )}
        <Link href={`/brand/${data.slug}`} className="mt-4 block">
          <Button className="w-full" size="sm">
            View Brand Portal
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ClientPortalPage() {
  const router = useRouter();
  const authUser = useBrandStore((s) => s.authUser);
  const allAccess = useBrandStore((s) => s.clientAccess);
  const allBrands = useBrandStore((s) => s.brands);
  const logout = useBrandStore((s) => s.logout);

  useEffect(() => {
    if (!authUser) {
      router.replace("/login/client");
    } else if (authUser.role === "agency") {
      router.replace("/dashboard");
    }
  }, [authUser, router]);

  const brands = useMemo(() => {
    if (!authUser || authUser.role !== "client") return [];
    const ids = new Set(
      allAccess.filter((a) => a.email === authUser.email).map((a) => a.brandId)
    );
    return allBrands.filter((b) => ids.has(b.id) && b.publishedData !== null);
  }, [allAccess, allBrands, authUser]);

  if (!authUser || authUser.role !== "client") return null;

  function handleLogout() {
    logout();
    router.replace("/login/client");
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#E4DFD3] bg-[#F7F5F0]/90 px-6 backdrop-blur">
        <div className="flex items-center gap-2">
          <BrandlyMark />
          <span className="font-serif text-[17px] font-medium text-[#14140F]">brandly.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[13px] text-neutral-500 sm:block">{authUser.email}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-serif text-[28px] font-medium text-[#14140F]">Brand Portals</h1>
        <p className="mt-2 text-[14px] text-neutral-500">The brand systems shared with you.</p>

        <div className="mt-8">
          {brands.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="Nothing shared yet"
              description="No brand portals have been shared with you. Contact the agency to request access."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <BrandPortalCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
