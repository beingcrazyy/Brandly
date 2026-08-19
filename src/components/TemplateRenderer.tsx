import { BrandData } from "@/lib/types";
import { PortalTemplate } from "./portal/PortalTemplate";
import { BoldPortalTemplate } from "./portal-bold/BoldPortalTemplate";

/** Dispatches to whichever template the brand is configured to use. Add new templates here as they ship. */
export function TemplateRenderer({ data, variant, cmsHref }: { data: BrandData; variant?: "live" | "preview"; cmsHref?: string }) {
  if (data.template === "bold") {
    return <BoldPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  return <PortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
}
