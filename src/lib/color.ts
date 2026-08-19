// Pure color-space conversions derived from a single HEX source of truth.

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const k = 1 - Math.max(rf, gf, bf);
  const c = (1 - rf - k) / (1 - k || 1);
  const m = (1 - gf - k) / (1 - k || 1);
  const y = (1 - bf - k) / (1 - k || 1);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case rf:
      h = (gf - bf) / d + (gf < bf ? 6 : 0);
      break;
    case gf:
      h = (bf - rf) / d + 2;
      break;
    default:
      h = (rf - gf) / d + 4;
  }
  h *= 60;
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function formatRgb(rgb: RGB): string {
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

export function formatCmyk(cmyk: CMYK): string {
  return `${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`;
}

export function formatHsl(hsl: HSL): string {
  return `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

/** Relative luminance contrast helper — used to decide readable text color on a swatch. */
export function isLight(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

/** WCAG relative luminance (sRGB), used for contrast ratio. */
export function relativeLuminance({ r, g, b }: RGB): number {
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two hex colors, from 1 (no contrast) to 21 (max). */
export function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface ContrastRating {
  ratio: number;
  normalText: "AAA" | "AA" | "Fail";
  largeText: "AAA" | "AA" | "Fail";
}

/** WCAG pass/fail bands for a contrast ratio, at normal (4.5/7) and large (3/4.5) text sizes. */
export function rateContrast(hexA: string, hexB: string): ContrastRating {
  const ratio = contrastRatio(hexA, hexB);
  const band = (aa: number, aaa: number): "AAA" | "AA" | "Fail" => (ratio >= aaa ? "AAA" : ratio >= aa ? "AA" : "Fail");
  return { ratio, normalText: band(4.5, 7), largeText: band(3, 4.5) };
}
