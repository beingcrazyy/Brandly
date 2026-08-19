import type { CSSProperties } from "react";
import { BrandData, RadiusScale, SpacingScale } from "./types";
import { hexToRgb, rgbToHsl, isLight } from "./color";
import { fontStack } from "./fonts";

const RADIUS_SCALES: Record<RadiusScale, [string, string, string]> = {
  none: ["0px", "0px", "0px"],
  small: ["4px", "8px", "12px"],
  medium: ["6px", "12px", "20px"],
  large: ["10px", "20px", "32px"],
};

const SPACING_SCALES: Record<SpacingScale, [string, string, string, string]> = {
  compact: ["8px", "16px", "32px", "64px"],
  comfortable: ["8px", "20px", "40px", "96px"],
  spacious: ["12px", "24px", "56px", "140px"],
};

function mix(hexA: string, hexB: string, weight: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(a.r * (1 - weight) + b.r * weight);
  const g = Math.round(a.g * (1 - weight) + b.g * weight);
  const bl = Math.round(a.b * (1 - weight) + b.b * weight);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function buildTokens(data: BrandData): Record<string, string> {
  const primary = data.colors.find((c) => c.role === "primary")?.hex ?? "#1D1D1B";
  const secondary = data.colors.find((c) => c.role === "secondary")?.hex ?? "#F4F0E8";
  const accent = data.colors.find((c) => c.role === "accent")?.hex ?? primary;
  const neutral = data.colors.find((c) => c.role === "neutral")?.hex ?? null;
  const dark = data.templateConfig.mode === "dark";

  const background = dark ? neutral ?? "#141311" : neutral ?? "#FAF9F6";
  const text = isLight(background) ? "#17160F" : "#F6F4EE";
  const muted = mix(text, background, 0.55);

  const [rSmall, rMedium, rLarge] = RADIUS_SCALES[data.templateConfig.radius];
  const [sSmall, sMedium, sLarge, sSection] = SPACING_SCALES[data.templateConfig.spacing];

  return {
    "--brand-primary": primary,
    "--brand-secondary": secondary,
    "--brand-accent": accent,
    "--brand-background": background,
    "--brand-text": text,
    "--brand-muted": muted,
    "--font-primary": fontStack(data.typography.primary.family),
    "--font-secondary": fontStack(data.typography.secondary.family),
    "--radius-small": rSmall,
    "--radius-medium": rMedium,
    "--radius-large": rLarge,
    "--spacing-small": sSmall,
    "--spacing-medium": sMedium,
    "--spacing-large": sLarge,
    "--spacing-section": sSection,
  };
}

export function tokensToStyle(tokens: Record<string, string>): CSSProperties {
  return tokens as unknown as CSSProperties;
}

export function hueOf(hex: string): number {
  return rgbToHsl(hexToRgb(hex)).h;
}
