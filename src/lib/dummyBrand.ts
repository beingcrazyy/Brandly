import type { BrandData, TemplateId } from "./types";

const DARK_TEMPLATES: TemplateId[] = ["mono", "dusk"];

let _n = 0;
function id() { return `dummy-${++_n}`; }

export function dummyBrandData(template: TemplateId): BrandData {
  const dark = DARK_TEMPLATES.includes(template);
  return {
    name: "Artisan Co.",
    slug: "artisan-co-preview",
    tagline: "Crafted with intention.",
    description: "A fictional brand used to preview this template. All content shown is placeholder.",
    website: "artisanco.com",
    industry: "Design & Craft",
    coverImage: null,
    mission: "To make beautifully considered things that stand the test of time.",
    vision: "A world where quality outlasts trend.",
    story: "Artisan Co. was founded by makers who believed that most things are designed to be discarded. We started with a single product, made it obsessively well, and went from there.",
    purpose: "To celebrate the craft behind every object.",
    essence: "Quiet confidence.",
    values: [
      { id: id(), name: "Craft", description: "Every detail is intentional." },
      { id: id(), name: "Longevity", description: "We build for decades, not seasons." },
      { id: id(), name: "Honesty", description: "We say what we mean, in the work and in the room." },
    ],
    personalityTraits: ["Considered", "Precise", "Warm"],
    personalityScales: [
      { id: id(), leftLabel: "Playful", rightLabel: "Serious", value: 70 },
      { id: id(), leftLabel: "Traditional", rightLabel: "Modern", value: 45 },
      { id: id(), leftLabel: "Reserved", rightLabel: "Expressive", value: 35 },
      { id: id(), leftLabel: "Formal", rightLabel: "Casual", value: 55 },
    ],
    archetype: { primary: "creator", secondary: "sage" },
    audience: {
      primary: {
        name: "The Discerning Buyer",
        ageRange: "28–45",
        occupation: "Creative professional",
        location: "Urban",
        needs: "Products that work beautifully and last.",
        problems: "Overwhelmed by disposable design.",
        motivations: "Meaning, aesthetics, quality.",
        behaviors: "Researches thoroughly before buying.",
      },
      secondary: null,
    },
    positioning: {
      statement: "For people who want fewer, better things — Artisan Co. makes objects that earn a permanent place.",
      category: "Premium lifestyle",
      differentiator: "Obsessive craft at every stage",
      competitiveAdvantage: "Vertical production with no compromise.",
      promise: "It will still be beautiful in ten years.",
      reasonToBelieve: "Every piece is made in-house by our team of 12 craftspeople.",
      competitors: [],
    },
    voice: {
      voice: "Warm, precise, unhurried. We never shout. We trust you to notice.",
      soundsLike: ["A well-worn bookshelf", "Morning light through linen", "A craftsperson explaining their process"],
      doesntSoundLike: ["A flash sale", "A motivational poster", "A press release"],
      writingPrinciples: [
        { id: id(), title: "Lead with the point", explanation: "Say the most important thing first." },
        { id: id(), title: "Short sentences", explanation: "Short sentences. Long breath." },
        { id: id(), title: "Nouns over adjectives", explanation: "Let the thing speak for itself." },
      ],
    },
    messaging: {
      valueProposition: "Objects made to outlast the moment.",
      pillars: [
        { id: id(), title: "Craft", description: "Everything we make, we make by hand." },
        { id: id(), title: "Honesty", description: "We show the process, not just the result." },
        { id: id(), title: "Endurance", description: "Our pieces are built to last generations." },
      ],
    },
    colors: [
      { id: id(), name: "Midnight", hex: "#14140F", role: "primary", usage: "Primary text, headings", description: "The anchor of every composition." },
      { id: id(), name: "Parchment", hex: "#F4F0E8", role: "secondary", usage: "Backgrounds, surfaces", description: "Warm off-white that feels handmade." },
      { id: id(), name: "Terracotta", hex: "#B66A50", role: "accent", usage: "CTAs, highlights", description: "Earth-toned warmth without shouting." },
      { id: id(), name: "Stone", hex: dark ? "#141311" : "#F0EBE0", role: "neutral", usage: "Page background", description: "Sets the canvas for the whole system." },
    ],
    typography: {
      primary: { family: "Inter", source: "google", file: null, weights: [400, 500, 600] },
      secondary: { family: "Inter", source: "google", file: null, weights: [400, 500] },
      styles: [
        { id: id(), name: "Display", fontRef: "primary", weight: 600, size: 72, lineHeight: 1.05, letterSpacing: -0.02, usage: "Hero headlines" },
        { id: id(), name: "H1", fontRef: "primary", weight: 600, size: 48, lineHeight: 1.1, letterSpacing: -0.01, usage: "Section titles" },
        { id: id(), name: "H2", fontRef: "primary", weight: 600, size: 32, lineHeight: 1.15, letterSpacing: 0, usage: "Sub-section titles" },
        { id: id(), name: "H3", fontRef: "primary", weight: 600, size: 20, lineHeight: 1.3, letterSpacing: 0, usage: "Card titles" },
        { id: id(), name: "Body Large", fontRef: "secondary", weight: 400, size: 18, lineHeight: 1.5, letterSpacing: 0, usage: "Intro paragraphs" },
        { id: id(), name: "Body", fontRef: "secondary", weight: 400, size: 16, lineHeight: 1.6, letterSpacing: 0, usage: "Body copy" },
        { id: id(), name: "Body Small", fontRef: "secondary", weight: 400, size: 14, lineHeight: 1.5, letterSpacing: 0, usage: "Supporting text" },
        { id: id(), name: "Caption", fontRef: "secondary", weight: 500, size: 12, lineHeight: 1.4, letterSpacing: 0.04, usage: "Labels, metadata" },
      ],
    },
    assets: [],
    assetFolders: [],
    template,
    templateConfig: { mode: dark ? "dark" : "light", radius: "small", spacing: "comfortable", navStyle: "sidebar", accentTreatment: "solid" },
  };
}
