import {
  LayoutGrid,
  Dna,
  Target,
  Users,
  Sparkles,
  MessageSquare,
  Shapes,
  Palette,
  Type,
  Image as ImageIcon,
  Hexagon,
  Layers,
  LayoutTemplate,
  FolderOpen,
  Component,
  type LucideIcon,
} from "lucide-react";

export interface CmsNavItem {
  slug: string;
  label: string;
  icon: LucideIcon;
}

export interface CmsNavGroup {
  label: string;
  items: CmsNavItem[];
}

export const CMS_NAV: CmsNavGroup[] = [
  {
    label: "Brand",
    items: [
      { slug: "overview", label: "Overview", icon: LayoutGrid },
      { slug: "dna", label: "Brand DNA", icon: Dna },
      { slug: "positioning", label: "Positioning", icon: Target },
      { slug: "audience", label: "Audience", icon: Users },
      { slug: "personality", label: "Personality", icon: Sparkles },
      { slug: "voice", label: "Voice & Tone", icon: MessageSquare },
    ],
  },
  {
    label: "Visual Identity",
    items: [
      { slug: "logo", label: "Logo", icon: Shapes },
      { slug: "colors", label: "Colors", icon: Palette },
      { slug: "typography", label: "Typography", icon: Type },
      { slug: "imagery", label: "Imagery", icon: ImageIcon },
      { slug: "iconography", label: "Iconography", icon: Hexagon },
      { slug: "graphics", label: "Graphics", icon: Layers },
    ],
  },
  {
    label: "Applications",
    items: [{ slug: "applications", label: "Applications", icon: LayoutTemplate }],
  },
  {
    label: "Assets",
    items: [{ slug: "assets", label: "All Assets", icon: FolderOpen }],
  },
  {
    label: "Template",
    items: [{ slug: "template", label: "Template", icon: Component }],
  },
];

export const CMS_NAV_FLAT = CMS_NAV.flatMap((g) => g.items);
