import { BrandData } from "@/lib/types";
import { MonoPortalTemplate } from "./portal-mono/MonoPortalTemplate";
import { StudioPortalTemplate } from "./portal-studio/StudioPortalTemplate";
import { AtelierPortalTemplate } from "./portal-atelier/AtelierPortalTemplate";
import { FieldPortalTemplate } from "./portal-field/FieldPortalTemplate";
import { DuskPortalTemplate } from "./portal-dusk/DuskPortalTemplate";
import { SummitPortalTemplate } from "./portal-summit/SummitPortalTemplate";
import { MeadowPortalTemplate } from "./portal-meadow/MeadowPortalTemplate";

/** Dispatches to whichever template the brand is configured to use. Add new templates here as they ship. */
export function TemplateRenderer({ data, variant, cmsHref }: { data: BrandData; variant?: "live" | "preview"; cmsHref?: string }) {
  if (data.template === "studio") {
    return <StudioPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  if (data.template === "atelier") {
    return <AtelierPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  if (data.template === "field") {
    return <FieldPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  if (data.template === "dusk") {
    return <DuskPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  if (data.template === "summit") {
    return <SummitPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  if (data.template === "meadow") {
    return <MeadowPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
  }
  return <MonoPortalTemplate data={data} variant={variant} cmsHref={cmsHref} />;
}
