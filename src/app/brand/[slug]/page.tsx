"use client";

import { useParams } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { TemplateRenderer } from "@/components/TemplateRenderer";

export default function PublicBrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = useBrandStore((s) => s.brands.find((b) => b.draftData.slug === slug));

  if (!brand || !brand.publishedData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#F7F5F0] px-6 text-center">
        <p className="text-[16px] font-medium text-[#14140F]">This brand portal isn&apos;t published yet.</p>
        <p className="max-w-sm text-[14px] text-neutral-500">Check back once the agency has published this brand system.</p>
      </div>
    );
  }

  return <TemplateRenderer data={brand.publishedData} variant="live" />;
}
