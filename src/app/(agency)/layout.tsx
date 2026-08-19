"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useBrandStore } from "@/lib/store";
import { BrandlyMark } from "@/components/BrandlyMark";
import { Drawer } from "@/components/ui/Drawer";
import { LayoutGrid, Sparkles, Compass, ArrowUpRight, Menu } from "lucide-react";
import type { Brand } from "@/lib/types";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: Compass },
  { href: "/brands", label: "Brands", icon: LayoutGrid },
  { href: "/templates", label: "Templates", icon: Sparkles },
];

const BREADCRUMB_LABEL: Record<string, string> = {
  "/dashboard": "Workspace",
  "/brands": "Brands",
  "/templates": "Templates",
};

function SidebarContent({ pathname, currentSystem, onNavigate }: { pathname: string; currentSystem: Brand | null; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between py-6">
      <div>
        <Link href="/dashboard" onClick={onNavigate} className="mb-8 flex items-center gap-2 px-6">
          <BrandlyMark />
          <span className="font-serif text-[17px] font-medium text-[#14140F]">brandly.</span>
        </Link>

        <p className="px-6 text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">Workspace</p>
        <nav className="mt-2 flex flex-col gap-0.5 px-3">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`focus-ring flex items-center gap-2.5 rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  active ? "bg-[var(--accent-terracotta-tint)] text-[#14140F]" : "text-neutral-500 hover:bg-black/[0.03] hover:text-[#14140F]"
                }`}
              >
                <Icon size={15} strokeWidth={1.75} className={active ? "text-[var(--accent-terracotta)]" : ""} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {currentSystem && (
          <div className="mt-8 px-6">
            <p className="text-[10.5px] font-medium tracking-[0.12em] text-neutral-400 uppercase">Current System</p>
            <div className="mt-2 rounded-2xl border border-[#E4DFD3] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${currentSystem.status === "published" ? "bg-emerald-600" : "bg-neutral-400"}`} />
                <p className="font-serif text-[14px] font-medium text-[#14140F]">{currentSystem.draftData.name}</p>
              </div>
              <p className="mt-1 text-[12px] text-neutral-500 capitalize">{currentSystem.status} brand system</p>
              <p className="font-mono text-[10.5px] text-neutral-400">
                Updated {new Date(currentSystem.updatedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
              </p>
              {currentSystem.status === "published" ? (
                <a
                  href={`/brand/${currentSystem.draftData.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-[var(--accent-terracotta)] hover:underline"
                >
                  Open portal <ArrowUpRight size={12} />
                </a>
              ) : (
                <Link
                  href={`/brands/${currentSystem.id}/overview`}
                  onClick={onNavigate}
                  className="focus-ring mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-[var(--accent-terracotta)] hover:underline"
                >
                  Continue editing <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14140F] text-[11px] font-medium text-white">AK</div>
        <div>
          <p className="text-[13px] font-medium text-[#14140F]">Anshu Khandelwal</p>
          <p className="text-[11px] text-neutral-500">Studio owner</p>
        </div>
      </div>
    </div>
  );
}

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const brands = useBrandStore((s) => s.brands);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentSystem = useMemo(() => {
    if (brands.length === 0) return null;
    return [...brands].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  }, [brands]);

  const crumb = BREADCRUMB_LABEL[pathname] ?? "Workspace";

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 overflow-y-auto border-r border-[#E4DFD3] lg:block">
        <SidebarContent pathname={pathname} currentSystem={currentSystem} />
      </aside>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SidebarContent pathname={pathname} currentSystem={currentSystem} onNavigate={() => setDrawerOpen(false)} />
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#E4DFD3] bg-[#F7F5F0]/90 px-6 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="focus-ring rounded-full p-1.5 text-neutral-500 hover:bg-black/5 lg:hidden"
            >
              <Menu size={19} />
            </button>
            <p className="text-[13px] text-neutral-500">
              Brand systems <span className="mx-1.5 text-neutral-300">/</span>
              <span className="font-medium text-[#14140F]">{crumb}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-[#DDD6C6] px-2.5 py-1 text-[11px] font-medium text-neutral-500 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Studio mode
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#14140F] text-[10.5px] font-medium text-white lg:hidden">AK</div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
