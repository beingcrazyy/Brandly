import { BrandData } from "./types";

export interface CompletionCheck {
  slug: string;
  label: string;
  isComplete: (d: BrandData) => boolean;
}

export const COMPLETION_CHECKS: CompletionCheck[] = [
  { slug: "overview", label: "Overview", isComplete: (d) => !!(d.description && d.tagline) },
  { slug: "dna", label: "Foundation", isComplete: (d) => !!d.purpose && d.values.length > 0 },
  { slug: "positioning", label: "Positioning", isComplete: (d) => !!d.positioning.statement },
  { slug: "audience", label: "Audience", isComplete: (d) => !!d.audience.primary.name },
  { slug: "personality", label: "Personality", isComplete: (d) => d.personalityTraits.length > 0 },
  { slug: "archetype", label: "Archetype", isComplete: (d) => !!d.archetype.primary },
  { slug: "voice", label: "Voice & Tone", isComplete: (d) => !!d.voice.voice },
  { slug: "messaging", label: "Messaging", isComplete: (d) => !!d.messaging.valueProposition },
  {
    slug: "visual-direction",
    label: "Visual Direction",
    isComplete: (d) => d.colors.length > 0 && d.typography.primary.family.trim().length > 0,
  },
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
