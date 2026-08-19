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

export interface Positioning {
  statement: string;
  category: string;
  differentiator: string;
  competitiveAdvantage: string;
  promise: string;
  reasonToBelieve: string;
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

export type LogoVariant =
  | "primary"
  | "secondary"
  | "monogram"
  | "symbol"
  | "light"
  | "dark"
  | "horizontal"
  | "vertical";

export interface LogoAsset {
  id: ID;
  variant: LogoVariant;
  name: string;
  description: string;
  file: FileRef | null;
  recommendedBackground: "light" | "dark" | "brand";
  usageNotes: string;
}

export interface IncorrectUsageExample {
  id: ID;
  file: FileRef | null;
  title: string;
  description: string;
}

export interface LogoGuidelines {
  clearSpace: number;
  minWidth: number;
  minHeight: number;
  incorrectExamples: IncorrectUsageExample[];
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

export interface ImageExample {
  id: ID;
  file: FileRef | null;
  caption: string;
}

export interface Imagery {
  photographyStyle: string;
  lighting: string;
  composition: string;
  colorTreatment: string;
  subjects: string;
  doExamples: ImageExample[];
  dontExamples: ImageExample[];
}

export interface IconAsset {
  id: ID;
  name: string;
  file: FileRef | null;
}

export interface Iconography {
  style: string;
  strokeWidth: number;
  cornerTreatment: "sharp" | "rounded";
  fillStyle: "outline" | "filled";
  sizeGuidance: string;
  usageNotes: string;
  icons: IconAsset[];
}

export type GraphicCategory =
  | "pattern"
  | "texture"
  | "shape"
  | "illustration"
  | "decorative";

export interface GraphicElement {
  id: ID;
  name: string;
  description: string;
  category: GraphicCategory;
  file: FileRef | null;
}

export type ApplicationCategory =
  | "Social Media"
  | "Stationery"
  | "Packaging"
  | "Website"
  | "Advertising"
  | "Presentation";

export interface ApplicationMockup {
  id: ID;
  category: ApplicationCategory;
  title: string;
  description: string;
  file: FileRef | null;
  usageNotes: string;
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

/** "editorial" and "bold" render; the rest are locked/coming-soon placeholders in the Templates gallery. */
export type TemplateId = "editorial" | "bold" | "minimal" | "corporate" | "luxury";

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
  values: BrandValue[];

  personalityTraits: string[];
  personalityScales: PersonalityScale[];

  audience: {
    primary: AudienceProfile;
    secondary: AudienceProfile | null;
  };

  positioning: Positioning;
  voice: Voice;

  logos: LogoAsset[];
  logoGuidelines: LogoGuidelines;

  colors: ColorToken[];
  typography: Typography;
  imagery: Imagery;
  iconography: Iconography;
  graphics: GraphicElement[];
  applications: ApplicationMockup[];
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
