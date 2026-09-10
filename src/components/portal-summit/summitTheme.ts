/** Fixed drafting-table chrome — cool vellum paper and graphite ink, no warmth, no cream — matching
 *  cairn-brand-portal-blueprint's `paper`/`ink` palette exactly. This edition reads as an instrument,
 *  not a journal (that's Field's job). Brand color still flows through via `var(--brand-*)`. */
export const SUMMIT_PAPER = "#F5F6F8";
export const SUMMIT_PAPER_SHEET = "#FFFFFF";
export const SUMMIT_INK = "#12141A";
export const SUMMIT_INK_MUTED = "#565C64";
export const SUMMIT_INK_FAINT = "#8D939A";

/** "FIG. 0X" plate + FIG index → slug map, for SectionHeading and SheetIndex. */
export const SUMMIT_PLATES: Record<string, string> = {
  foundation: "FIG. 01",
  positioning: "FIG. 02",
  archetype: "FIG. 03",
  personality: "FIG. 04",
  audience: "FIG. 05",
  values: "FIG. 06",
  voice: "FIG. 07",
  messaging: "FIG. 08",
  "visual-direction": "FIG. 09",
};
