"use client";

import { useParams } from "next/navigation";
import { TemplateRenderer } from "@/components/TemplateRenderer";
import { dummyBrandData } from "@/lib/dummyBrand";
import type { TemplateId } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const VALID: TemplateId[] = ["mono", "studio", "atelier", "field", "dusk", "summit", "meadow"];

export default function TemplatePreviewPage() {
  const { name } = useParams<{ name: string }>();
  const router = useRouter();
  const template = VALID.includes(name as TemplateId) ? (name as TemplateId) : null;

  if (!template) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-[15px] font-medium text-[#14140F]">Template not found</p>
        <Button variant="secondary" onClick={() => router.push("/templates")}>
          Back to Templates
        </Button>
      </div>
    );
  }

  return <TemplateRenderer data={dummyBrandData(template)} variant="preview" cmsHref="/templates" />;
}
