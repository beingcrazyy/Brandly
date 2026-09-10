import { ArchetypeId } from "./types";

export type ArchetypeFamily = "independence" | "mastery" | "belonging" | "stability";

export interface ArchetypeDef {
  id: ArchetypeId;
  name: string;
  family: ArchetypeFamily;
  /** One-word distillation of the archetype's core value — the wheel's inner ring. */
  coreValue: string;
  desire: string;
  fear: string;
  description: string;
  /** Well-known brands widely cited as examples of this archetype — generic educational reference, not client data. */
  exampleBrands: string[];
}

export const ARCHETYPE_FAMILY_LABEL: Record<ArchetypeFamily, string> = {
  independence: "Spiritual Journey",
  mastery: "Leave a Mark",
  belonging: "Connect to Others",
  stability: "Provide Structure",
};

/** Ordered clockwise from 12 o'clock, 30° apart, grouped in families of three — this order drives the wheel diagram. */
export const ARCHETYPES: ArchetypeDef[] = [
  { id: "innocent", name: "Innocent", family: "independence", coreValue: "Safety", desire: "To be happy and do things right", fear: "Doing something wrong or bad", description: "Optimistic and honest — sells safety and simplicity.", exampleBrands: ["Dove"] },
  { id: "explorer", name: "Explorer", family: "independence", coreValue: "Freedom", desire: "Freedom to discover who you are", fear: "Getting trapped, conformity", description: "Independent and adventurous — sells freedom and authenticity.", exampleBrands: ["The North Face"] },
  { id: "sage", name: "Sage", family: "independence", coreValue: "Knowledge", desire: "To find the truth and understand the world", fear: "Being duped or ignorant", description: "Knowledgeable and analytical — sells expertise and clarity.", exampleBrands: ["BBC"] },
  { id: "hero", name: "Hero", family: "mastery", coreValue: "Mastery", desire: "To prove worth through courageous action", fear: "Weakness, vulnerability", description: "Determined and disciplined — sells mastery and triumph.", exampleBrands: ["Nike"] },
  { id: "outlaw", name: "Outlaw", family: "mastery", coreValue: "Liberation", desire: "Revolution — to overturn what isn't working", fear: "Being powerless", description: "Disruptive and rebellious — sells liberation from convention.", exampleBrands: ["Harley-Davidson"] },
  { id: "magician", name: "Magician", family: "mastery", coreValue: "Power", desire: "To make dreams come true", fear: "Unintended negative consequences", description: "Visionary and transformative — sells transformation.", exampleBrands: ["Disney"] },
  { id: "everyman", name: "Everyman", family: "belonging", coreValue: "Belonging", desire: "To belong and connect with others", fear: "Standing out, being rejected", description: "Relatable and down-to-earth — sells belonging and trust.", exampleBrands: ["IKEA"] },
  { id: "jester", name: "Jester", family: "belonging", coreValue: "Pleasure", desire: "To live fully in the moment", fear: "Being bored, or boring others", description: "Playful and lighthearted — sells joy and levity.", exampleBrands: ["Old Spice"] },
  { id: "lover", name: "Lover", family: "belonging", coreValue: "Intimacy", desire: "To attain intimacy and connection", fear: "Being unwanted, unloved", description: "Passionate and sensory — sells intimacy and desirability.", exampleBrands: ["Godiva"] },
  { id: "caregiver", name: "Caregiver", family: "stability", coreValue: "Service", desire: "To protect and care for others", fear: "Selfishness, ingratitude", description: "Nurturing and generous — sells reassurance and service.", exampleBrands: ["UNICEF"] },
  { id: "ruler", name: "Ruler", family: "stability", coreValue: "Control", desire: "To create prosperity and order", fear: "Chaos, being overthrown", description: "Authoritative and confident — sells stability and status.", exampleBrands: ["Hugo Boss"] },
  { id: "creator", name: "Creator", family: "stability", coreValue: "Innovation", desire: "To create something of enduring value", fear: "Mediocrity, a flawed vision", description: "Imaginative and exacting — sells originality and craft.", exampleBrands: ["Apple"] },
];

export function findArchetype(id: ArchetypeId | null | undefined): ArchetypeDef | null {
  if (!id) return null;
  return ARCHETYPES.find((a) => a.id === id) ?? null;
}
