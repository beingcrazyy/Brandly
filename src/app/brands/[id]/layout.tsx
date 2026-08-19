"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { CMS_NAV } from "@/lib/cmsNav";
import { computeCompletion } from "@/lib/completion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { BrandlyMark } from "@/components/BrandlyMark";
import { PublishModal } from "@/components/cms/PublishModal";
import { useToast } from "@/components/ui/Toast";
import { ArrowLeft, Menu, Eye, Check } from "lucide-react";

function CmsNavList({
  pathname,
  brandId,
  completionBySlug,
  onNavigate,
}: {
  pathname: string;
  brandId: string;
  completionBySlug: Record<string, boolean>;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-6">
      {CMS_NAV.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">{group.label}</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {group.items.map((item) => {
              const href = `/brands/${brandId}/${item.slug}`;
              const active = pathname === href;
              const done = completionBySlug[item.slug];
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={href}
                  onClick={onNavigate}
                  className={`focus-ring flex items-center gap-2.5 rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    active ? "bg-[var(--accent-terracotta-tint)] text-[#14140F]" : "text-neutral-500 hover:bg-black/[0.03] hover:text-[#14140F]"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.75} className={active ? "text-[var(--accent-terracotta)]" : ""} />
                  <span className="flex-1">{item.label}</span>
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${done ? "bg-[var(--accent-terracotta)]" : "border border-[#DDD6C6]"}`}
                    aria-hidden="true"
                  >
                    {done && <Check size={9} className="text-white" strokeWidth={3} />}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default function BrandCmsLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const notify = useToast();
  const brand = useBrandStore((s) => s.brands.find((b) => b.id === id));
  const publishBrand = useBrandStore((s) => s.publishBrand);
  const [publishOpen, setPublishOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!brand) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F7F5F0] text-center">
        <p className="text-[15px] font-medium text-[#14140F]">Brand not found</p>
        <Button variant="secondary" onClick={() => router.push("/brands")}>
          Back to Brands
        </Button>
      </div>
    );
  }

  const completion = computeCompletion(brand.draftData);

  return (
    <div className="flex min-h-screen bg-[#F7F5F0]">
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 overflow-y-auto border-r border-[#E4DFD3] py-6 md:block">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2 px-6">
          <BrandlyMark size={18} />
          <span className="font-serif text-[15px] font-medium text-[#14140F]">brandly.</span>
        </Link>
        <Link href="/brands" className="mb-4 inline-flex items-center gap-1.5 px-6 text-[12px] font-medium text-neutral-400 hover:text-neutral-700">
          <ArrowLeft size={13} /> All brands
        </Link>
        <div className="px-6">
          <p className="font-serif text-[19px] font-medium text-[#14140F]">{brand.draftData.name}</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge tone={brand.status === "published" ? "success" : "neutral"}>{brand.status}</Badge>
            <span className="font-mono text-[10.5px] text-neutral-400">{completion.percent}% complete</span>
          </div>
          {brand.publishedAt && (
            <p className="mt-1.5 font-mono text-[10.5px] text-neutral-400">
              Published{" "}
              {new Date(brand.publishedAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
        <div className="mt-6 px-3">
          <CmsNavList pathname={pathname} brandId={id} completionBySlug={completion.bySlug} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E4DFD3] bg-[#F7F5F0]/95 px-6 py-3 backdrop-blur md:px-8">
          <button onClick={() => setDrawerOpen(true)} className="focus-ring rounded-full p-1.5 text-neutral-500 hover:bg-black/5 md:hidden" aria-label="Open menu">
            <Menu size={18} />
          </button>
          <span className="hidden text-[13px] font-medium text-neutral-500 md:block">
            {CMS_NAV.flatMap((g) => g.items).find((i) => pathname.endsWith(i.slug))?.label ?? ""}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => window.open(`/preview/${id}`, "_blank")}>
              <Eye size={14} /> Preview
            </Button>
            <Button size="sm" onClick={() => setPublishOpen(true)}>
              Publish Brand
            </Button>
          </div>
        </div>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="px-3 pb-6 pt-3">
            <p className="font-serif px-3 text-[17px] font-medium text-[#14140F]">{brand.draftData.name}</p>
            <div className="px-3 pt-1.5 pb-5">
              <Badge tone={brand.status === "published" ? "success" : "neutral"}>{brand.status}</Badge>
            </div>
            <CmsNavList pathname={pathname} brandId={id} completionBySlug={completion.bySlug} onNavigate={() => setDrawerOpen(false)} />
          </div>
        </Drawer>

        <div className="flex-1">{children}</div>
      </div>

      <PublishModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        onConfirm={() => {
          publishBrand(id);
          notify("Brand published");
        }}
      />
    </div>
  );
}
