"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser, Brand, BrandData, ClientAccess, FileRef } from "./types";
import { buildAuraBrand } from "./seed";

const AGENCY_EMAIL = "studio@brandly.io";
const AGENCY_PASSWORD = "brandly";
const CLIENT_PASSWORD = "client123";

function makeId(): string {
  return `b_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/** Derive a human-readable format label from a FileRef's MIME type. */
function autoLabel(file: { mimeType: string; name: string }): string {
  const ext = file.name.split(".").pop()?.toUpperCase();
  if (ext && ext.length <= 5) return ext;
  if (file.mimeType.includes("svg")) return "SVG";
  if (file.mimeType.includes("png")) return "PNG";
  if (file.mimeType.includes("jpeg") || file.mimeType.includes("jpg")) return "JPG";
  if (file.mimeType.includes("pdf")) return "PDF";
  if (file.mimeType.includes("zip")) return "ZIP";
  if (file.mimeType.includes("font") || file.mimeType.includes("woff")) return "Font";
  return "File";
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
    assetFolders: [],
    template: "mono",
    templateConfig: { mode: "light", radius: "small", spacing: "comfortable", navStyle: "sidebar", accentTreatment: "solid" },
  };
}

/** Backfills fields added to BrandData after some brands were already persisted to localStorage. */
function migrateBrandData(data: BrandData): BrandData {
  const base = emptyBrandData(data.name, data.slug);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = data as any;
  return {
    ...base,
    ...data,
    positioning: { ...base.positioning, ...data.positioning },
    archetype: { ...base.archetype, ...data.archetype },
    messaging: { ...base.messaging, ...data.messaging },
    assetFolders: data.assetFolders ?? [],
    // Migrate old single-file assets to the new variant model
    assets: (data.assets ?? []).map((a: any) => {
      if (a.variants) return a; // already migrated
      const file = a.file ?? null;
      return {
        id: a.id,
        name: a.name,
        type: a.type,
        category: a.category ?? "",
        description: a.description ?? "",
        coverFile: file,
        variants: file
          ? [{ id: makeId(), label: autoLabel(file), file, addedAt: a.uploadedAt }]
          : [],
        uploadedAt: a.uploadedAt,
        folderId: a.folderId,
        uploadedBy: a.uploadedBy,
      };
    }),
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

  // auth
  authUser: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // client access
  clientAccess: ClientAccess[];
  grantAccess: (brandId: string, email: string) => void;
  revokeAccess: (brandId: string, email: string) => void;
  getAccessesForBrand: (brandId: string) => ClientAccess[];
  getBrandsForClient: (email: string) => Brand[];
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

      // B6: also purge clientAccess records for the deleted brand
      deleteBrand: (brandId) => {
        set({
          brands: get().brands.filter((b) => b.id !== brandId),
          clientAccess: get().clientAccess.filter((a) => a.brandId !== brandId),
        });
      },

      getBrand: (id) => get().brands.find((b) => b.id === id),
      getBrandBySlug: (slug) => get().brands.find((b) => b.draftData.slug === slug),

      authUser: null,

      // B10: validate client password too
      login: (email, password) => {
        const normalised = email.toLowerCase().trim();
        if (normalised === AGENCY_EMAIL && password === AGENCY_PASSWORD) {
          set({ authUser: { email: normalised, role: "agency" } });
          return true;
        }
        const hasAccess = get().clientAccess.some((a) => a.email === normalised);
        if (hasAccess && password === CLIENT_PASSWORD) {
          set({ authUser: { email: normalised, role: "client" } });
          return true;
        }
        return false;
      },

      logout: () => set({ authUser: null }),

      clientAccess: [],

      // Set grantedBy from current authUser
      grantAccess: (brandId, email) => {
        const normalised = email.toLowerCase().trim();
        const already = get().clientAccess.some(
          (a) => a.brandId === brandId && a.email === normalised
        );
        if (already) return;
        set({
          clientAccess: [
            ...get().clientAccess,
            {
              email: normalised,
              brandId,
              grantedAt: new Date().toISOString(),
              grantedBy: get().authUser?.email ?? "agency",
            },
          ],
        });
      },

      revokeAccess: (brandId, email) => {
        const normalised = email.toLowerCase().trim();
        set({
          clientAccess: get().clientAccess.filter(
            (a) => !(a.brandId === brandId && a.email === normalised)
          ),
        });
      },

      getAccessesForBrand: (brandId) =>
        get().clientAccess.filter((a) => a.brandId === brandId),

      getBrandsForClient: (email) => {
        const normalised = email.toLowerCase().trim();
        const brandIds = new Set(
          get().clientAccess.filter((a) => a.email === normalised).map((a) => a.brandId)
        );
        return get().brands.filter((b) => brandIds.has(b.id));
      },
    }),
    {
      name: "brandly-data",
      partialize: (state) => ({
        brands: state.brands,
        seeded: state.seeded,
        authUser: state.authUser,
        clientAccess: state.clientAccess,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<
          Pick<BrandStore, "brands" | "seeded" | "authUser" | "clientAccess">
        > | undefined;
        if (!persisted?.brands) return currentState;
        return {
          ...currentState,
          ...persisted,
          brands: persisted.brands.map(migrateBrand),
          authUser: persisted.authUser ?? null,
          clientAccess: (persisted.clientAccess ?? []).map((a: any) => ({
            ...a,
            grantedBy: a.grantedBy ?? "agency",
          })),
        };
      },
    }
  )
);
