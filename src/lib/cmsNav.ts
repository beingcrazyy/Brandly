import {
  LayoutGrid,
  Dna,
  Target,
  Users,
  Sparkles,
  Drama,
  MessageSquare,
  Megaphone,
  Palette,
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
      { slug: "dna", label: "Foundation", icon: Dna },
      { slug: "positioning", label: "Positioning", icon: Target },
      { slug: "archetype", label: "Archetype", icon: Drama },
      { slug: "personality", label: "Personality", icon: Sparkles },
      { slug: "audience", label: "Audience", icon: Users },
      { slug: "voice", label: "Voice & Tone", icon: MessageSquare },
      { slug: "messaging", label: "Messaging", icon: Megaphone },
      { slug: "visual-direction", label: "Visual Direction", icon: Palette },
    ],
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
