const AVAILABLE = [
  {
    name: "Mono",
    bg: "#14140F",
    fg: "#F6F4EE",
    tagline: "Minimal & monochrome",
    description: "Hairline borders, generous whitespace, quiet confidence. Entirely sans-serif.",
  },
  {
    name: "Studio",
    bg: "#B66A50",
    fg: "#FFFFFF",
    tagline: "Bold & full-bleed",
    description: "Full-bleed color blocks, elevated cards, oversized uppercase type. Vivid and confident.",
  },
  {
    name: "Atelier",
    bg: "#F4F0E8",
    fg: "#1D1D1B",
    tagline: "Warm & boutique",
    description: "Soft glass panels, gentle rhythm, considered spacing. Still entirely sans-serif.",
  },
  {
    name: "Field",
    bg: "#F2F3EF",
    fg: "#15181A",
    tagline: "Editorial & field-notebook",
    description: "Hard ink borders, offset shadows in the brand's own colors, a waypoint trail rail.",
  },
  {
    name: "Dusk",
    bg: "#0B0B0D",
    fg: "#F2F1EE",
    tagline: "Dark & technical",
    description: "A near-black canvas, boxy hairline cards, one bright accent color doing all the work.",
  },
  {
    name: "Summit",
    bg: "#FAFAF7",
    fg: "#1D1D1B",
    tagline: "Quiet & hairline",
    description: "No shadows, no color blocks — a serif wordmark and field-coded sections carry it.",
  },
  {
    name: "Meadow",
    bg: "#F6F1E7",
    fg: "#3A2E22",
    tagline: "Warm & soft",
    description: "Drifting color-wash orbs, rounded paper-cutout cards, an italic serif throughout.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="py-10">
      <h1 className="text-[24px] font-semibold tracking-tight text-[#14140F]">Templates</h1>
      <p className="mt-1 max-w-lg text-[14px] text-neutral-500">
        Every brand renders through a template. Mono, Studio, Atelier, Field, Dusk, Summit and Meadow are available now.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {AVAILABLE.map((t, i) => (
          <div key={t.name} className="overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white">
            <div className="flex aspect-[4/3] flex-col justify-between p-6" style={{ backgroundColor: t.bg, color: t.fg }}>
              <span className="text-[11px] tracking-[0.2em] uppercase opacity-60">
                {String(i + 1).padStart(2, "0")} / {t.name}
              </span>
              <div>
                <p className="text-[28px] leading-tight font-bold">Aa</p>
                <p className="mt-1 text-[12px] opacity-60">{t.tagline}</p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-semibold text-[#14140F]">{t.name}</h3>
              <p className="mt-1 text-[13px] text-neutral-500">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
