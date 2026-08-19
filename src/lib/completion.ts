import { BrandData } from "./types";

export interface CompletionCheck {
  slug: string;
  label: string;
  isComplete: (d: BrandData) => boolean;
}

export const COMPLETION_CHECKS: CompletionCheck[] = [
  { slug: "overview", label: "Overview", isComplete: (d) => !!(d.description && d.tagline) },
  { slug: "dna", label: "Brand DNA", isComplete: (d) => !!d.purpose && d.values.length > 0 },
  { slug: "positioning", label: "Positioning", isComplete: (d) => !!d.positioning.statement },
  { slug: "audience", label: "Audience", isComplete: (d) => !!d.audience.primary.name },
  { slug: "personality", label: "Personality", isComplete: (d) => d.personalityTraits.length > 0 },
  { slug: "voice", label: "Voice & Tone", isComplete: (d) => !!d.voice.voice },
  { slug: "logo", label: "Logo", isComplete: (d) => d.logos.length > 0 },
  { slug: "colors", label: "Colors", isComplete: (d) => d.colors.length > 0 },
  { slug: "typography", label: "Typography", isComplete: (d) => d.typography.primary.family.trim().length > 0 },
  { slug: "imagery", label: "Imagery", isComplete: (d) => !!d.imagery.photographyStyle || d.imagery.doExamples.length > 0 },
  { slug: "iconography", label: "Iconography", isComplete: (d) => d.iconography.icons.length > 0 },
  { slug: "graphics", label: "Graphics", isComplete: (d) => d.graphics.length > 0 },
  { slug: "applications", label: "Applications", isComplete: (d) => d.applications.length > 0 },
  { slug: "assets", label: "Assets", isComplete: (d) => d.assets.length > 0 },
  { slug: "template", label: "Template", isComplete: (d) => !!d.template },
];

export interface BrandCompletion {
  bySlug: Record<string, boolean>;
  completeCount: number;
  totalCount: number;
  percent: number;
}

/** Real, derived completion — never hand-set. Recomputed from the brand's own data every time it's needed. */
export function computeCompletion(data: BrandData): BrandCompletion {
  const bySlug: Record<string, boolean> = {};
  let completeCount = 0;
  for (const check of COMPLETION_CHECKS) {
    const done = check.isComplete(data);
    bySlug[check.slug] = done;
    if (done) completeCount++;
  }
  return {
    bySlug,
    completeCount,
    totalCount: COMPLETION_CHECKS.length,
    percent: Math.round((completeCount / COMPLETION_CHECKS.length) * 100),
  };
}
