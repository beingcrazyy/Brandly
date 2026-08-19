import { Lock } from "lucide-react";

const AVAILABLE = [
  {
    name: "Editorial",
    bg: "#1D1D1B",
    fg: "#F4F0E8",
    tagline: "Modern brand book",
    description: "Large typography, generous whitespace, asymmetric grid. Quiet and literary.",
  },
  {
    name: "Bold",
    bg: "#B66A50",
    fg: "#FFFFFF",
    tagline: "Full-bleed & graphic",
    description: "Full-bleed color blocks, oversized type, high contrast. Confident and vibrant.",
  },
];

const UPCOMING = ["Minimal", "Corporate", "Luxury"];

export default function TemplatesPage() {
  return (
    <div className="py-10">
      <h1 className="text-[24px] font-semibold tracking-tight text-[#14140F]">Templates</h1>
      <p className="mt-1 max-w-lg text-[14px] text-neutral-500">
        Every brand renders through a template. Editorial and Bold are available now — more are on the way.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AVAILABLE.map((t, i) => (
          <div key={t.name} className="overflow-hidden rounded-2xl border border-[#E4DFD3] bg-white">
            <div className="flex aspect-[4/3] flex-col justify-between p-6" style={{ backgroundColor: t.bg, color: t.fg }}>
              <span className="text-[11px] tracking-[0.2em] uppercase opacity-60">
                {String(i + 1).padStart(2, "0")} / {t.name}
              </span>
              <div>
                <p className="font-serif text-[28px] leading-tight">Aa</p>
                <p className="mt-1 text-[12px] opacity-60">{t.tagline}</p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-semibold text-[#14140F]">{t.name}</h3>
              <p className="mt-1 text-[13px] text-neutral-500">{t.description}</p>
            </div>
          </div>
        ))}

        {UPCOMING.map((name) => (
          <div key={name} className="flex flex-col overflow-hidden rounded-2xl border border-dashed border-[#DDD6C6] bg-black/[0.015]">
            <div className="flex aspect-[4/3] items-center justify-center text-neutral-300">
              <Lock size={22} strokeWidth={1.5} />
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-medium text-neutral-400">{name}</h3>
              <p className="mt-1 text-[13px] text-neutral-400">Coming soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
