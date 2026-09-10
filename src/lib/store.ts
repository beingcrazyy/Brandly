"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Brand, BrandData, FileRef } from "./types";
import { buildAuraBrand } from "./seed";

function makeId(): string {
  return `b_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function emptyBrandData(name: string, slug: string): BrandData {
  return {
    name,
    slug,
    description: "",
    tagline: "",
    website: "",
    industry: "",
    coverImage: null,
    mission: "",
    vision: "",
    story: "",
    purpose: "",
    essence: "",
    values: [],
    personalityTraits: [],
    personalityScales: [
      { id: makeId(), leftLabel: "Playful", rightLabel: "Serious", value: 50 },
      { id: makeId(), leftLabel: "Traditional", rightLabel: "Modern", value: 50 },
      { id: makeId(), leftLabel: "Reserved", rightLabel: "Expressive", value: 50 },
      { id: makeId(), leftLabel: "Formal", rightLabel: "Casual", value: 50 },
    ],
    archetype: { primary: null, secondary: null },
    audience: {
      primary: { name: "", ageRange: "", occupation: "", location: "", needs: "", problems: "", motivations: "", behaviors: "" },
      secondary: null,
    },
    positioning: { statement: "", category: "", differentiator: "", competitiveAdvantage: "", promise: "", reasonToBelieve: "", competitors: [] },
    voice: { voice: "", soundsLike: [], doesntSoundLike: [], writingPrinciples: [] },
    messaging: { valueProposition: "", pillars: [] },
    colors: [],
    typography: {
      primary: { family: "Inter", source: "google", file: null, weights: [400, 500, 600] },
      secondary: { family: "Inter", source: "google", file: null, weights: [400, 500] },
      styles: [
        { id: makeId(), name: "Display", fontRef: "primary", weight: 600, size: 72, lineHeight: 1.05, letterSpacing: -0.02, usage: "Hero headlines" },
        { id: makeId(), name: "H1", fontRef: "primary", weight: 600, size: 48, lineHeight: 1.1, letterSpacing: -0.01, usage: "Section titles" },
        { id: makeId(), name: "H2", fontRef: "primary", weight: 600, size: 32, lineHeight: 1.15, letterSpacing: 0, usage: "Sub-section titles" },
        { id: makeId(), name: "H3", fontRef: "primary", weight: 600, size: 20, lineHeight: 1.3, letterSpacing: 0, usage: "Card titles" },
        { id: makeId(), name: "Body Large", fontRef: "secondary", weight: 400, size: 18, lineHeight: 1.5, letterSpacing: 0, usage: "Intro paragraphs" },
        { id: makeId(), name: "Body", fontRef: "secondary", weight: 400, size: 16, lineHeight: 1.6, letterSpacing: 0, usage: "Body copy" },
        { id: makeId(), name: "Body Small", fontRef: "secondary", weight: 400, size: 14, lineHeight: 1.5, letterSpacing: 0, usage: "Supporting text" },
        { id: makeId(), name: "Caption", fontRef: "secondary", weight: 500, size: 12, lineHeight: 1.4, letterSpacing: 0.04, usage: "Labels, metadata" },
      ],
    },
    assets: [],
    template: "mono",
    templateConfig: { mode: "light", radius: "small", spacing: "comfortable", navStyle: "sidebar", accentTreatment: "solid" },
  };
}

/** Backfills fields added to BrandData after some brands were already persisted to localStorage — without this, older saved brands crash on the new fields instead of just defaulting them. */
function migrateBrandData(data: BrandData): BrandData {
  const base = emptyBrandData(data.name, data.slug);
  return {
    ...base,
    ...data,
    positioning: { ...base.positioning, ...data.positioning },
    archetype: { ...base.archetype, ...data.archetype },
    messaging: { ...base.messaging, ...data.messaging },
  };
}

function migrateBrand(brand: Brand): Brand {
  return {
    ...brand,
    draftData: migrateBrandData(brand.draftData),
    publishedData: brand.publishedData ? migrateBrandData(brand.publishedData) : null,
  };
}

interface BrandStore {
  brands: Brand[];
  seeded: boolean;
  ensureSeeded: () => Promise<void>;
  createBrand: (input: { name: string; slug: string; description: string; website: string; industry: string; coverImage: FileRef | null }) => string;
  updateDraft: (brandId: string, updater: (data: BrandData) => BrandData) => void;
  publishBrand: (brandId: string) => void;
  deleteBrand: (brandId: string) => void;
  getBrand: (id: string) => Brand | undefined;
  getBrandBySlug: (slug: string) => Brand | undefined;
}

export const useBrandStore = create<BrandStore>()(
  persist(
    (set, get) => ({
      brands: [],
      seeded: false,

      ensureSeeded: async () => {
        if (get().seeded || get().brands.length > 0) {
          set({ seeded: true });
          return;
        }
        const aura = await buildAuraBrand();
        set({ brands: [aura], seeded: true });
      },

      createBrand: (input) => {
        const brandId = makeId();
        const now = new Date().toISOString();
        const data = emptyBrandData(input.name, input.slug);
        data.description = input.description;
        data.website = input.website;
        data.industry = input.industry;
        data.coverImage = input.coverImage;
        const brand: Brand = {
          id: brandId,
          status: "draft",
          createdAt: now,
          updatedAt: now,
          publishedAt: null,
          draftData: data,
          publishedData: null,
        };
        set({ brands: [...get().brands, brand] });
        return brandId;
      },

      updateDraft: (brandId, updater) => {
        set({
          brands: get().brands.map((b) =>
            b.id === brandId
              ? { ...b, draftData: updater(b.draftData), updatedAt: new Date().toISOString() }
              : b
          ),
        });
      },

      publishBrand: (brandId) => {
        const now = new Date().toISOString();
        set({
          brands: get().brands.map((b) =>
            b.id === brandId
              ? {
                  ...b,
                  status: "published",
                  publishedAt: now,
                  updatedAt: now,
                  publishedData: JSON.parse(JSON.stringify(b.draftData)),
                }
              : b
          ),
        });
      },

      deleteBrand: (brandId) => {
        set({ brands: get().brands.filter((b) => b.id !== brandId) });
      },

      getBrand: (id) => get().brands.find((b) => b.id === id),
      getBrandBySlug: (slug) => get().brands.find((b) => b.draftData.slug === slug),
    }),
    {
      name: "brandly-data",
      partialize: (state) => ({ brands: state.brands, seeded: state.seeded }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<Pick<BrandStore, "brands" | "seeded">> | undefined;
        if (!persisted?.brands) return currentState;
        return { ...currentState, ...persisted, brands: persisted.brands.map(migrateBrand) };
      },
    }
  )
);
