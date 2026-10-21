"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { SharePanel } from "@/components/cms/SharePanel";
import { Button } from "@/components/ui/Button";
import { Archive, ChevronLeft, LogOut, Share2 } from "lucide-react";

export default function PublicBrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const brand = useBrandStore((s) =>
    s.brands.find((b) => b.publishedData?.slug === slug || b.draftData.slug === slug)
  );
  const authUser = useBrandStore((s) => s.authUser);
  const clientAccess = useBrandStore((s) => s.clientAccess);
  const logout = useBrandStore((s) => s.logout);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (!authUser) {
      router.replace("/login/client");
      return;
    }
    if (authUser.role === "client" && brand) {
      const hasAccess = clientAccess.some(
        (a) => a.brandId === brand.id && a.email === authUser.email
      );
      if (!hasAccess) router.replace("/portal");
    }
  }, [authUser, brand, clientAccess, router]);

  if (!authUser) return null;

  if (!brand || !brand.publishedData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#F7F5F0] px-6 text-center">
        <p className="text-[16px] font-medium text-[#14140F]">This brand portal isn&apos;t published yet.</p>
        <p className="max-w-sm text-[14px] text-neutral-500">Check back once the agency has published this brand system.</p>
      </div>
    );
  }

  const isClient = authUser.role === "client";

  function handleLogout() {
    logout();
    router.replace("/login/client");
  }

  return (
    <div className="relative">
      {isClient && (
        <div className="sticky top-0 z-50 flex items-center gap-3 border-b border-white/20 bg-[#14140F]/90 px-4 py-2.5 backdrop-blur sm:px-5">
          {/* Back to all brands */}
          <Link
            href="/portal"
            className="flex shrink-0 items-center gap-1 text-[12.5px] text-white/60 transition-colors hover:text-white"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">All brands</span>
          </Link>

          <div className="h-4 w-px bg-white/20 shrink-0" />

          {/* Brand name */}
          <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
            {brand.publishedData.name}
          </p>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            <Link href={`/brand/${slug}/assets`}>
              <Button
                variant="secondary"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Archive size={13} />
                <span className="hidden sm:inline">Assets</span>
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShareOpen(true)}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <button
              onClick={handleLogout}
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      )}

      <TemplateRenderer data={brand.publishedData} variant="live" />

      {isClient && (
        <SharePanel open={shareOpen} onClose={() => setShareOpen(false)} brandId={brand.id} />
      )}
    </div>
  );
}
