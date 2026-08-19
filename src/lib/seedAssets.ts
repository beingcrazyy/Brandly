// Deterministic on-brand SVG generators used only to populate the AURA demo brand
// with real, downloadable files (no stock imagery, no network fetch required).

export function svgToBlob(svg: string): Blob {
  return new Blob([svg], { type: "image/svg+xml" });
}

const FONT = "Fraunces, Georgia, serif";
const SANS = "Manrope, ui-sans-serif, sans-serif";

export function wordmarkLogo(ink: string, bg: string | "none" = "none"): string {
  const bgRect = bg === "none" ? "" : `<rect width="400" height="140" fill="${bg}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140">
  ${bgRect}
  <circle cx="46" cy="70" r="14" fill="none" stroke="${ink}" stroke-width="2"/>
  <circle cx="46" cy="70" r="7" fill="${ink}"/>
  <text x="80" y="88" font-family="${FONT}" font-size="64" letter-spacing="10" fill="${ink}">AURA</text>
</svg>`;
}

export function monogramLogo(ink: string, bg: string | "none" = "none"): string {
  const bgShape = bg === "none" ? "" : `<circle cx="70" cy="70" r="70" fill="${bg}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  ${bgShape}
  <circle cx="70" cy="70" r="66" fill="none" stroke="${ink}" stroke-width="2"/>
  <text x="70" y="94" font-family="${FONT}" font-size="70" text-anchor="middle" fill="${ink}">A</text>
</svg>`;
}

export function symbolMark(ink: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140">
  <circle cx="70" cy="70" r="60" fill="none" stroke="${ink}" stroke-width="1.5" opacity="0.35"/>
  <circle cx="70" cy="70" r="42" fill="none" stroke="${ink}" stroke-width="1.5" opacity="0.6"/>
  <circle cx="70" cy="70" r="24" fill="none" stroke="${ink}" stroke-width="2"/>
  <circle cx="70" cy="70" r="6" fill="${ink}"/>
</svg>`;
}

export function incorrectUsageExample(kind: "stretch" | "recolor" | "busy" | "rotate", ink: string, accent: string): string {
  const base = `<circle cx="0" cy="0" r="60" fill="none" stroke="${ink}" stroke-width="2"/><circle cx="0" cy="0" r="24" fill="none" stroke="${ink}" stroke-width="2"/><circle cx="0" cy="0" r="6" fill="${ink}"/>`;
  const variants: Record<string, string> = {
    stretch: `<g transform="translate(100,100) scale(1.8,0.6)">${base}</g>`,
    recolor: `<g transform="translate(100,100)">${base.replaceAll(ink, accent)}</g>`,
    busy: `<rect width="200" height="200" fill="${accent}" opacity="0.15"/><g transform="translate(100,100)">${base}</g>`,
    rotate: `<g transform="translate(100,100) rotate(35)">${base}</g>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="#F4F0E8"/>
  ${variants[kind]}
  <line x1="20" y1="180" x2="180" y2="20" stroke="#B23B2E" stroke-width="3" opacity="0.7"/>
</svg>`;
}

export function patternTile(accent: string, secondary: string): string {
  let dots = "";
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      dots += `<circle cx="${20 + x * 40}" cy="${20 + y * 40}" r="4" fill="${accent}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${secondary}"/>${dots}</svg>`;
}

export function textureTile(primary: string, secondary: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="${secondary}"/>
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${primary}" stop-opacity="0.05"/>
    <stop offset="1" stop-color="${primary}" stop-opacity="0.18"/>
  </linearGradient></defs>
  <rect width="200" height="200" fill="url(#g)"/>
</svg>`;
}

export function shapeMotif(accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path d="M100 20 C160 20 180 70 170 110 C160 155 120 180 80 170 C35 160 15 115 30 75 C42 45 65 20 100 20 Z" fill="${accent}" opacity="0.9"/>
</svg>`;
}

export function illustrationMark(ink: string, accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="70" y="60" width="60" height="100" rx="10" fill="none" stroke="${ink}" stroke-width="2"/>
  <rect x="85" y="40" width="30" height="24" rx="4" fill="${accent}"/>
  <line x1="82" y1="100" x2="118" y2="100" stroke="${ink}" stroke-width="1.5"/>
</svg>`;
}

export function decorativeRings(ink: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  ${[80, 60, 40, 20].map((r, i) => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${ink}" stroke-width="1" opacity="${0.9 - i * 0.18}"/>`).join("")}
</svg>`;
}

const ICONS: Record<string, string> = {
  droplet: `<path d="M16 4 C22 14 26 19 26 24 A10 10 0 1 1 6 24 C6 19 10 14 16 4Z"/>`,
  leaf: `<path d="M6 26 C6 12 18 4 28 4 C28 18 18 28 6 28 Z"/><path d="M6 26 L22 10"/>`,
  sun: `<circle cx="16" cy="16" r="7"/><path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3 3M23 23l3 3M6 26l3-3M23 9l3-3"/>`,
  check: `<circle cx="16" cy="16" r="13"/><path d="M10 16l4 4 8-8"/>`,
  jar: `<rect x="8" y="12" width="16" height="16" rx="3"/><rect x="10" y="6" width="12" height="6" rx="2"/>`,
  hand: `<path d="M8 18V9a2 2 0 0 1 4 0v7M12 16V6a2 2 0 0 1 4 0v10M16 16V8a2 2 0 0 1 4 0v8M20 16V10a2 2 0 0 1 4 0v10c0 5-4 8-8 8s-8-3-9-7l-2-6a2 2 0 0 1 3-2l2 3"/>`,
};

export function iconSvg(name: keyof typeof ICONS, ink: string, strokeWidth = 1.5, filled = false): string {
  const path = ICONS[name];
  const style = filled ? `fill="${ink}" stroke="none"` : `fill="none" stroke="${ink}" stroke-width="${strokeWidth}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g ${style} stroke-linecap="round" stroke-linejoin="round">${path}</g>
</svg>`;
}

export const ICON_NAMES = Object.keys(ICONS) as (keyof typeof ICONS)[];

export function socialMockup(name: string, ink: string, secondary: string, accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="${secondary}"/>
  <rect x="0" y="0" width="400" height="400" fill="${accent}" opacity="0.08"/>
  <circle cx="200" cy="150" r="46" fill="none" stroke="${ink}" stroke-width="2"/>
  <circle cx="200" cy="150" r="26" fill="none" stroke="${ink}" stroke-width="2"/>
  <circle cx="200" cy="150" r="6" fill="${ink}"/>
  <text x="200" y="260" font-family="${FONT}" font-size="30" letter-spacing="6" text-anchor="middle" fill="${ink}">${name}</text>
  <text x="200" y="292" font-family="${SANS}" font-size="13" letter-spacing="2" text-anchor="middle" fill="${ink}" opacity="0.6">SKINCARE, RECONSIDERED</text>
</svg>`;
}

export function stationeryMockup(ink: string, secondary: string, accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 200">
  <rect width="350" height="200" fill="${secondary}" stroke="${ink}" stroke-opacity="0.15"/>
  <circle cx="40" cy="40" r="10" fill="none" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="40" cy="40" r="4" fill="${ink}"/>
  <text x="24" y="70" font-family="${FONT}" font-size="20" letter-spacing="4" fill="${ink}">AURA</text>
  <text x="24" y="150" font-family="${SANS}" font-size="11" fill="${ink}" opacity="0.7">Nadia Reyes</text>
  <text x="24" y="168" font-family="${SANS}" font-size="11" fill="${ink}" opacity="0.55">Founder — hello@aura-skin.com</text>
  <rect x="24" y="180" width="60" height="3" fill="${accent}"/>
</svg>`;
}

export function packagingMockup(ink: string, secondary: string, accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <rect width="300" height="300" fill="${ink}"/>
  <rect x="105" y="60" width="90" height="150" rx="14" fill="${secondary}"/>
  <rect x="120" y="40" width="60" height="30" rx="6" fill="${accent}"/>
  <circle cx="150" cy="130" r="16" fill="none" stroke="${ink}" stroke-width="1.5"/>
  <circle cx="150" cy="130" r="5" fill="${ink}"/>
  <text x="150" y="175" font-family="${SANS}" font-size="10" letter-spacing="2" text-anchor="middle" fill="${ink}" opacity="0.8">RENEW SERUM</text>
</svg>`;
}

export function coverImage(primary: string, secondary: string, accent: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="${secondary}"/>
  <defs>
    <radialGradient id="glow" cx="70%" cy="30%" r="70%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#glow)"/>
  ${[260, 200, 140, 80].map((r, i) => `<circle cx="1180" cy="360" r="${r}" fill="none" stroke="${primary}" stroke-width="1" opacity="${0.5 - i * 0.1}"/>`).join("")}
</svg>`;
}
