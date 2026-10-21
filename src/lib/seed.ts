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

  const [coverImage, pattern, texture] = await Promise.all([
    storeSvg(gen.coverImage(INK, LINEN, CLAY), "aura-cover.svg"),
    storeSvg(gen.patternTile(CLAY, LINEN), "pattern-dot-grid.svg"),
    storeSvg(gen.textureTile(INK, LINEN), "texture-grain.svg"),
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
    essence: "Fewer, better.",
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
    archetype: { primary: "sage", secondary: "everyman" },

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
      competitors: [
        { id: id(), name: "Drugstore Basics", x: 20, y: 25 },
        { id: id(), name: "Clinical Rx", x: 85, y: 60 },
        { id: id(), name: "Ritual Aesthetics", x: 72, y: 88 },
        { id: id(), name: "Glow Habit", x: 40, y: 70 },
      ],
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

    messaging: {
      valueProposition:
        "Skincare that respects your time: four dermatologist-reviewed formulas that do the work of twelve.",
      pillars: [
        { id: id(), title: "Fewer, Better Formulas", description: "Four multi-functional products replace a twelve-step routine, without cutting corners on results." },
        { id: id(), title: "Proof Over Promises", description: "Every claim is backed by third-party clinical testing and full ingredient transparency." },
        { id: id(), title: "Considered, Not Clinical", description: "Formulated with rigor, written like a trusted friend — never cold, never jargon-heavy." },
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

    assets: [
      { id: id(), name: "Cover Image", type: "photography", category: "Brand", description: "Primary cover image used across the portal.", coverFile: coverImage, variants: [{ id: id(), label: "SVG", file: coverImage, addedAt: now }], uploadedAt: now },
      { id: id(), name: "Dot Grid Pattern", type: "illustration", category: "Graphics", description: "Quiet background pattern for section dividers.", coverFile: pattern, variants: [{ id: id(), label: "SVG", file: pattern, addedAt: now }], uploadedAt: now },
      { id: id(), name: "Paper Grain Texture", type: "illustration", category: "Graphics", description: "Subtle texture overlay for large color fields.", coverFile: texture, variants: [{ id: id(), label: "SVG", file: texture, addedAt: now }], uploadedAt: now },
    ],
    assetFolders: [],

    template: "mono",
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
