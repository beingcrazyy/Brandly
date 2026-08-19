import { Brand, BrandData, FileRef, ID } from "./types";
import { putFile, makeFileId } from "./files";
import * as gen from "./seedAssets";

function id(): ID {
  return makeFileId();
}

async function storeSvg(svg: string, name: string): Promise<FileRef> {
  const fileId = id();
  await putFile(fileId, gen.svgToBlob(svg), name);
  return { fileId, name, mimeType: "image/svg+xml" };
}

const INK = "#1D1D1B";
const LINEN = "#F4F0E8";
const CLAY = "#B66A50";
const BONE = "#FAF9F6";
const STONE = "#77736D";

export async function buildAuraBrand(): Promise<Brand> {
  const now = "2026-08-12T10:46:00.000Z";

  const [wordmark, wordmarkLight, monogram, symbol, coverImage] = await Promise.all([
    storeSvg(gen.wordmarkLogo(INK), "aura-wordmark-primary.svg"),
    storeSvg(gen.wordmarkLogo(BONE), "aura-wordmark-light.svg"),
    storeSvg(gen.monogramLogo(INK), "aura-monogram.svg"),
    storeSvg(gen.symbolMark(INK), "aura-symbol.svg"),
    storeSvg(gen.coverImage(INK, LINEN, CLAY), "aura-cover.svg"),
  ]);

  const [stretchEx, recolorEx, busyEx] = await Promise.all([
    storeSvg(gen.incorrectUsageExample("stretch", INK, CLAY), "incorrect-stretch.svg"),
    storeSvg(gen.incorrectUsageExample("recolor", INK, CLAY), "incorrect-recolor.svg"),
    storeSvg(gen.incorrectUsageExample("busy", INK, CLAY), "incorrect-busy.svg"),
  ]);

  const [pattern, texture, shape, illustration, decorative] = await Promise.all([
    storeSvg(gen.patternTile(CLAY, LINEN), "pattern-dot-grid.svg"),
    storeSvg(gen.textureTile(INK, LINEN), "texture-grain.svg"),
    storeSvg(gen.shapeMotif(CLAY), "shape-motif.svg"),
    storeSvg(gen.illustrationMark(INK, CLAY), "illustration-bottle.svg"),
    storeSvg(gen.decorativeRings(INK), "decorative-rings.svg"),
  ]);

  const iconEntries = await Promise.all(
    gen.ICON_NAMES.map(async (name) => ({
      id: id(),
      name: name[0].toUpperCase() + name.slice(1),
      file: await storeSvg(gen.iconSvg(name, INK, 1.5, false), `icon-${name}.svg`),
    }))
  );

  const [socialPost, businessCard, packaging] = await Promise.all([
    storeSvg(gen.socialMockup("AURA", INK, LINEN, CLAY), "application-social-post.svg"),
    storeSvg(gen.stationeryMockup(INK, LINEN, CLAY), "application-business-card.svg"),
    storeSvg(gen.packagingMockup(INK, LINEN, CLAY), "application-packaging.svg"),
  ]);

  const draftData: BrandData = {
    name: "AURA",
    slug: "aura",
    description:
      "AURA is a premium skincare brand built around a single idea: fewer, better formulas instead of a twelve-step routine nobody has time for.",
    tagline: "Beauty designed around clarity.",
    website: "https://aura-skin.com",
    industry: "Premium Skincare & Beauty",
    coverImage,

    mission:
      "To replace routine complexity with a small number of formulas that actually work — so skincare stops being a chore and starts being effortless.",
    vision:
      "A world where good skin doesn't require twelve products, a chemistry degree, or an hour every morning.",
    story:
      "AURA started with a simple frustration: a bathroom shelf of eleven products, most of them barely touched. Our founder, a former cosmetic chemist, set out to prove that four well-formulated products could outperform twelve mediocre ones. Three years and ninety clinical reformulation cycles later, AURA launched with a four-product system — and a promise to never add a fifth without a very good reason.",
    purpose:
      "We exist to give people their mornings back, without asking them to compromise on results.",
    values: [
      { id: id(), name: "Clarity", description: "We make complex ideas simple. Skincare shouldn't require a chemistry degree." },
      { id: id(), name: "Restraint", description: "We say no to more ingredients, more steps, more noise — so the essentials can do their job." },
      { id: id(), name: "Warmth", description: "Efficacy without coldness. Every formula and every word should feel considered, not clinical." },
      { id: id(), name: "Integrity", description: "What's on the label is what's in the bottle. No filler claims, no filler ingredients." },
    ],

    personalityTraits: ["Confident", "Intelligent", "Warm", "Minimal", "Human"],
    personalityScales: [
      { id: id(), leftLabel: "Playful", rightLabel: "Serious", value: 68 },
      { id: id(), leftLabel: "Traditional", rightLabel: "Modern", value: 78 },
      { id: id(), leftLabel: "Reserved", rightLabel: "Expressive", value: 42 },
      { id: id(), leftLabel: "Formal", rightLabel: "Casual", value: 56 },
    ],

    audience: {
      primary: {
        name: "The Considered Minimalist",
        ageRange: "28–45",
        occupation: "Creative & knowledge professionals",
        location: "Urban centers — New York, Los Angeles, London, Toronto",
        needs: "Effective, low-maintenance skincare that fits a fast life without cutting corners.",
        problems: "Overwhelmed by twelve-step routines and ingredient lists they can't parse.",
        motivations: "Wants to look like themselves, only rested — not like a different person.",
        behaviors: "Reads ingredient lists, follows two or three trusted voices, buys less but better.",
      },
      secondary: {
        name: "The Gift Seeker",
        ageRange: "35–60",
        occupation: "Established professionals",
        location: "Suburban and urban, gift-giving occasions",
        needs: "A thoughtful, safe gift that feels premium without being showy.",
        problems: "Doesn't know the recipient's skin type or existing routine.",
        motivations: "Wants to give something that feels considered and well-made.",
        behaviors: "Shops in short, decisive sessions; guided heavily by packaging and brand story.",
      },
    },

    positioning: {
      statement:
        "For people who want their skin to look like it's had enough sleep, AURA is the skincare system that replaces routine complexity with a small number of formulas that actually work.",
      category: "Premium clean skincare",
      differentiator: "A four-product system instead of twelve — every formula multi-functional by design.",
      competitiveAdvantage: "An in-house formulation lab with a 90-day reformulation cycle based on direct customer testing panels.",
      promise: "Fewer products. Better skin. No compromises.",
      reasonToBelieve: "Dermatologist-reviewed formulas, third-party clinical testing, and full ingredient transparency on every product page.",
    },

    voice: {
      voice: "AURA sounds like a trusted friend who happens to know skincare chemistry — direct, warm, never condescending.",
      soundsLike: ["Clear", "Confident", "Human", "Intelligent"],
      doesntSoundLike: ["Corporate", "Aggressive", "Complicated", "Generic"],
      writingPrinciples: [
        { id: id(), title: "Keep it clear", explanation: "Use plain language instead of dermatological jargon. If a fifteen-year-old can't picture it, rewrite it." },
        { id: id(), title: "Earn every claim", explanation: "Never say “clinically proven” without a study behind it. Specificity builds trust faster than superlatives." },
        { id: id(), title: "Talk like one person", explanation: "Write the way a knowledgeable friend would explain it across a counter, not the way a legal team would." },
      ],
    },

    logos: [
      { id: id(), variant: "primary", name: "Primary Wordmark", description: "The default lockup for light backgrounds.", file: wordmark, recommendedBackground: "light", usageNotes: "Use whenever possible. Minimum clear space equal to the mark's radius on all sides." },
      { id: id(), variant: "light", name: "Light Wordmark", description: "Reversed lockup for dark or brand-colored backgrounds.", file: wordmarkLight, recommendedBackground: "dark", usageNotes: "Use on Ink or any surface darker than 40% luminance." },
      { id: id(), variant: "monogram", name: "Monogram", description: "Circular monogram for avatars and small-format placement.", file: monogram, recommendedBackground: "light", usageNotes: "Use below 32px width where the full wordmark is illegible." },
      { id: id(), variant: "symbol", name: "Symbol", description: "The concentric halo mark, used sparingly as a standalone motif.", file: symbol, recommendedBackground: "brand", usageNotes: "Never use as a substitute for the logo in identifying contexts — decorative use only." },
    ],
    logoGuidelines: {
      clearSpace: 24,
      minWidth: 32,
      minHeight: 32,
      incorrectExamples: [
        { id: id(), file: stretchEx, title: "Don't stretch or distort", description: "The mark must always retain its original proportions." },
        { id: id(), file: recolorEx, title: "Don't recolor the mark", description: "Use only approved logo colors — never an accent or arbitrary color." },
        { id: id(), file: busyEx, title: "Don't place on busy backgrounds", description: "Keep the logo on a clear, low-contrast field so it stays legible." },
      ],
    },

    colors: [
      { id: id(), name: "Ink", role: "primary", hex: INK, usage: "Wordmark, primary text, dark surfaces", description: "Our near-black anchor — used for type and high-contrast moments." },
      { id: id(), name: "Linen", role: "secondary", hex: LINEN, usage: "Backgrounds, packaging, secondary surfaces", description: "A warm, papery neutral that keeps the palette from feeling clinical." },
      { id: id(), name: "Clay", role: "accent", hex: CLAY, usage: "CTAs, highlights, accents", description: "A muted terracotta drawn from the brand's core ingredient, clay." },
      { id: id(), name: "Bone", role: "neutral", hex: BONE, usage: "App background, whitespace", description: "Slightly warmer than pure white; the default canvas." },
      { id: id(), name: "Stone", role: "neutral", hex: STONE, usage: "Muted text, captions, dividers", description: "A soft warm gray for secondary text and quiet UI." },
    ],

    typography: {
      primary: { family: "Fraunces", source: "google", file: null, weights: [400, 500, 600] },
      secondary: { family: "Manrope", source: "google", file: null, weights: [400, 500, 600, 700] },
      styles: [
        { id: id(), name: "Display", fontRef: "primary", weight: 500, size: 88, lineHeight: 1.0, letterSpacing: -0.02, usage: "Hero headlines, cover moments" },
        { id: id(), name: "H1", fontRef: "primary", weight: 500, size: 56, lineHeight: 1.05, letterSpacing: -0.01, usage: "Section titles" },
        { id: id(), name: "H2", fontRef: "primary", weight: 500, size: 36, lineHeight: 1.1, letterSpacing: 0, usage: "Sub-section titles" },
        { id: id(), name: "H3", fontRef: "secondary", weight: 700, size: 22, lineHeight: 1.25, letterSpacing: 0, usage: "Card titles, labels" },
        { id: id(), name: "Body Large", fontRef: "secondary", weight: 400, size: 20, lineHeight: 1.5, letterSpacing: 0, usage: "Intro paragraphs" },
        { id: id(), name: "Body", fontRef: "secondary", weight: 400, size: 16, lineHeight: 1.6, letterSpacing: 0, usage: "Default body copy" },
        { id: id(), name: "Body Small", fontRef: "secondary", weight: 400, size: 14, lineHeight: 1.5, letterSpacing: 0, usage: "Supporting text" },
        { id: id(), name: "Caption", fontRef: "secondary", weight: 500, size: 12, lineHeight: 1.4, letterSpacing: 0.04, usage: "Labels, metadata, captions" },
      ],
    },

    imagery: {
      photographyStyle: "Soft, tactile, and unstyled — skin, water, and raw ingredients photographed close and honestly.",
      lighting: "Natural, diffused daylight. Avoid hard studio shadows or artificial ring-light catchlights.",
      composition: "Generous negative space, off-center subjects, editorial cropping over centered product shots.",
      colorTreatment: "Warm, slightly desaturated grade that pulls toward Linen and Clay rather than cool blues.",
      subjects: "Real skin texture, single ingredients (clay, water, botanicals), quiet domestic moments.",
      doExamples: [
        { id: id(), file: pattern, caption: "Warm, minimal, ingredient-forward" },
        { id: id(), file: texture, caption: "Soft grain, diffused natural light" },
      ],
      dontExamples: [
        { id: id(), file: recolorEx, caption: "Oversaturated or artificially lit" },
        { id: id(), file: stretchEx, caption: "Distorted or heavily filtered" },
      ],
    },

    iconography: {
      style: "Single-weight line icons with softly rounded joins — never fully filled.",
      strokeWidth: 1.5,
      cornerTreatment: "rounded",
      fillStyle: "outline",
      sizeGuidance: "Design on a 32px grid; minimum display size 16px.",
      usageNotes: "Icons pair with Caption-style labels. Never mix outline and filled icons in the same view.",
      icons: iconEntries,
    },

    graphics: [
      { id: id(), name: "Dot Grid", description: "Quiet background pattern for section dividers.", category: "pattern", file: pattern },
      { id: id(), name: "Paper Grain", description: "Subtle texture overlay for large color fields.", category: "texture", file: texture },
      { id: id(), name: "Soft Blob", description: "Organic shape motif echoing the product silhouette.", category: "shape", file: shape },
      { id: id(), name: "Bottle Line Art", description: "Minimal illustration used in packaging call-outs.", category: "illustration", file: illustration },
      { id: id(), name: "Halo Rings", description: "The brand's concentric-ring motif, used decoratively.", category: "decorative", file: decorative },
    ],

    applications: [
      { id: id(), category: "Social Media", title: "Instagram Grid Post", description: "Product-forward social template using the halo mark.", file: socialPost, usageNotes: "Keep 12% margin; never crop the halo mark." },
      { id: id(), category: "Stationery", title: "Business Card", description: "Founder business card, Linen stock, Clay foil edge.", file: businessCard, usageNotes: "Print on uncoated 100lb stock for the intended tactile feel." },
      { id: id(), category: "Packaging", title: "Renew Serum Carton", description: "Primary packaging system for the flagship serum.", file: packaging, usageNotes: "Ink carton with Linen label; monogram embossed, not printed." },
    ],

    assets: [
      { id: id(), name: "Primary Wordmark (SVG)", type: "logo", category: "Logos", description: "Vector wordmark for print and web.", file: wordmark, uploadedAt: now },
      { id: id(), name: "Light Wordmark (SVG)", type: "logo", category: "Logos", description: "Reversed wordmark for dark surfaces.", file: wordmarkLight, uploadedAt: now },
      { id: id(), name: "Monogram (SVG)", type: "logo", category: "Logos", description: "Circular monogram mark.", file: monogram, uploadedAt: now },
      { id: id(), name: "Icon Set (5 icons)", type: "icon", category: "Icons", description: "Line icon set, 1.5px stroke.", file: iconEntries[0].file, uploadedAt: now },
      { id: id(), name: "Halo Rings Motif", type: "illustration", category: "Graphics", description: "Decorative concentric-ring graphic.", file: decorative, uploadedAt: now },
      { id: id(), name: "Instagram Post Template", type: "social", category: "Applications", description: "Square social template with brand lockup.", file: socialPost, uploadedAt: now },
      { id: id(), name: "Business Card Mockup", type: "presentation", category: "Applications", description: "Founder business card mockup.", file: businessCard, uploadedAt: now },
    ],

    template: "editorial",
    templateConfig: {
      mode: "light",
      radius: "small",
      spacing: "comfortable",
      navStyle: "sidebar",
      accentTreatment: "solid",
    },
  };

  const brand: Brand = {
    id: "aura",
    status: "published",
    createdAt: "2026-06-02T09:00:00.000Z",
    updatedAt: now,
    publishedAt: now,
    draftData,
    publishedData: JSON.parse(JSON.stringify(draftData)),
  };

  return brand;
}
