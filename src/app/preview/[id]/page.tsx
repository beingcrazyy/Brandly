"use client";

import { useParams } from "next/navigation";
import { useBrandStore } from "@/lib/store";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const brand = useBrandStore((s) => s.brands.find((b) => b.id === id));

  if (!brand) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-[15px] font-medium text-[#14140F]">Brand not found</p>
        <Button variant="secondary" onClick={() => router.push("/brands")}>
          Back to Brands
        </Button>
      </div>
    );
  }

  return <TemplateRenderer data={brand.draftData} variant="preview" cmsHref={`/brands/${id}/overview`} />;
}
