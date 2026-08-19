"use client";

import { Typography, TypeStyleName } from "@/lib/types";
import { fontStack } from "@/lib/fonts";
import { usePortalFonts } from "@/lib/usePortalFonts";

function styleFor(typography: Typography, name: TypeStyleName) {
  const style = typography.styles.find((s) => s.name === name);
  const font = style?.fontRef === "secondary" ? typography.secondary : typography.primary;
  return {
    fontFamily: fontStack(font.family),
    fontWeight: style?.weight ?? 400,
    fontSize: style ? `${style.size}px` : "16px",
    lineHeight: style?.lineHeight ?? 1.4,
    letterSpacing: style ? `${style.letterSpacing}em` : "0",
  };
}

export function TypographyPreview({ typography }: { typography: Typography }) {
  usePortalFonts(typography);

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[#E4DFD3] bg-white p-6">
      <div style={{ fontFamily: fontStack(typography.primary.family), fontWeight: 600, fontSize: "64px", lineHeight: 1 }}>Aa</div>
      <div style={styleFor(typography, "H1")}>Brand Headline</div>
      <div style={styleFor(typography, "Body")}>The quick brown fox jumps over the lazy dog.</div>
      <div style={{ ...styleFor(typography, "Caption"), color: "#77736D", textTransform: "uppercase" }}>Supporting UI text and captions</div>
    </div>
  );
}
