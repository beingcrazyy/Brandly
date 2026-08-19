// Dynamic Google Font loading — the CMS lets an agency pick any family by name,
// so fonts must load at runtime rather than via next/font static imports.
"use client";

export const CURATED_FONTS = [
  "Inter",
  "Manrope",
  "Playfair Display",
  "Fraunces",
  "Sora",
  "Space Grotesk",
  "DM Sans",
  "Cormorant Garamond",
  "Libre Caslon Text",
  "Söhne Fallback", // not a real google font; falls back to system stack, kept for the "upload your own" mental model
] as const;

const injected = new Set<string>();

export function ensureGoogleFont(family: string, weights: number[] = [400, 500, 600, 700]) {
  if (typeof document === "undefined") return;
  if (!family || injected.has(family)) return;
  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weights.join(";")}&display=swap`;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute("data-brandly-font", family);
  document.head.appendChild(link);
  injected.add(family);
}

export function fontStack(family: string): string {
  return `"${family}", ui-sans-serif, system-ui, sans-serif`;
}
