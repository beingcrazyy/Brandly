export interface TemplateNavItem {
  slug: string;
  label: string;
}

/** Shared by all 3 templates — every template renders exactly these 9 sections, in this order. */
export const TEMPLATE_NAV: TemplateNavItem[] = [
  { slug: "foundation", label: "Foundation" },
  { slug: "positioning", label: "Positioning" },
  { slug: "archetype", label: "Archetype" },
  { slug: "personality", label: "Personality" },
  { slug: "audience", label: "Audience" },
  { slug: "values", label: "Values" },
  { slug: "voice", label: "Voice & Tone" },
  { slug: "messaging", label: "Messaging" },
  { slug: "visual-direction", label: "Visual Direction" },
];
