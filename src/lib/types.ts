// Core Brandly data model. Everything the client portal renders flows from BrandData.

export type ID = string;

export interface FileRef {
  /** id into the file blob store (see lib/files.ts) */
  fileId: ID;
  name: string;
  mimeType: string;
}

export interface BrandValue {
  id: ID;
  name: string;
  description: string;
  icon?: string;
}

export interface PersonalityScale {
  id: ID;
  leftLabel: string;
  rightLabel: string;
  /** 0-100, 0 = leftLabel, 100 = rightLabel */
  value: number;
}

export interface AudienceProfile {
  name: string;
  ageRange: string;
  occupation: string;
  location: string;
  needs: string;
  problems: string;
  motivations: string;
  behaviors: string;
}

export interface Competitor {
  id: ID;
  name: string;
  /** 0-100 position on the positioning map's two axes (same axes as the brand's own dot). */
  x: number;
  y: number;
}

export interface Positioning {
  statement: string;
  category: string;
  differentiator: string;
  competitiveAdvantage: string;
  promise: string;
  reasonToBelieve: string;
  competitors: Competitor[];
}

export type ArchetypeId =
  | "innocent"
  | "explorer"
  | "sage"
  | "hero"
  | "outlaw"
  | "magician"
  | "everyman"
  | "jester"
  | "lover"
  | "caregiver"
  | "ruler"
  | "creator";

export interface BrandArchetype {
  primary: ArchetypeId | null;
  secondary: ArchetypeId | null;
}

export interface MessagingPillar {
  id: ID;
  title: string;
  description: string;
}

export interface Messaging {
  valueProposition: string;
  pillars: MessagingPillar[];
}

export interface WritingPrinciple {
  id: ID;
  title: string;
  explanation: string;
}

export interface Voice {
  voice: string;
  soundsLike: string[];
  doesntSoundLike: string[];
  writingPrinciples: WritingPrinciple[];
}

export type ColorRole = "primary" | "secondary" | "accent" | "neutral";

export interface ColorToken {
  id: ID;
  name: string;
  role: ColorRole;
  hex: string;
  usage: string;
  description: string;
}

export type FontSource = "google" | "upload" | "system";

export interface FontDefinition {
  family: string;
  source: FontSource;
  file: FileRef | null;
  weights: number[];
}

export type TypeStyleName =
  | "Display"
  | "H1"
  | "H2"
  | "H3"
  | "Body Large"
  | "Body"
  | "Body Small"
  | "Caption";

export interface TypeStyle {
  id: ID;
  name: TypeStyleName;
  fontRef: "primary" | "secondary";
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
  usage: string;
}

export interface Typography {
  primary: FontDefinition;
  secondary: FontDefinition;
  styles: TypeStyle[];
}

export type AssetType =
  | "logo"
  | "font"
  | "icon"
  | "illustration"
  | "photography"
  | "social"
  | "presentation"
  | "document"
  | "misc";

export interface LibraryAsset {
  id: ID;
  name: string;
  type: AssetType;
  category: string;
  description: string;
  file: FileRef | null;
  uploadedAt: string;
}

export type TemplateId = "mono" | "studio" | "atelier" | "field" | "dusk" | "summit" | "meadow";

export type ThemeMode = "light" | "dark";
export type RadiusScale = "none" | "small" | "medium" | "large";
export type SpacingScale = "compact" | "comfortable" | "spacious";
export type NavStyle = "sidebar" | "topbar";
export type AccentTreatment = "solid" | "outline" | "tint";

export interface TemplateConfig {
  mode: ThemeMode;
  radius: RadiusScale;
  spacing: SpacingScale;
  navStyle: NavStyle;
  accentTreatment: AccentTreatment;
}

export type BrandStatus = "draft" | "published";

/** Everything that is rendered by a template. Lives twice per brand: draftData (CMS/preview) and publishedData (client portal). */
export interface BrandData {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  website: string;
  industry: string;
  coverImage: FileRef | null;

  mission: string;
  vision: string;
  story: string;
  purpose: string;
  essence: string;
  values: BrandValue[];

  personalityTraits: string[];
  personalityScales: PersonalityScale[];
  archetype: BrandArchetype;

  audience: {
    primary: AudienceProfile;
    secondary: AudienceProfile | null;
  };

  positioning: Positioning;
  voice: Voice;
  messaging: Messaging;

  colors: ColorToken[];
  typography: Typography;
  assets: LibraryAsset[];

  template: TemplateId;
  templateConfig: TemplateConfig;
}

export interface Brand {
  id: ID;
  status: BrandStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  draftData: BrandData;
  publishedData: BrandData | null;
}
