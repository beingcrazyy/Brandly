"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";

export function BoldSection({
  id,
  index,
  title,
  subtitle,
  dark = false,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  /** Alternates the section onto the brand primary color, full-bleed — Bold's signature device. */
  dark?: boolean;
  children: React.ReactNode;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const bg = dark ? "var(--brand-primary)" : "var(--brand-background)";
  const text = dark ? "var(--brand-background)" : "var(--brand-text)";
  const muted = dark ? "color-mix(in srgb, var(--brand-background) 65%, transparent)" : "var(--brand-muted)";

  return (
    <section id={id} className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-12 sm:py-28 lg:px-20" style={{ backgroundColor: bg }}>
      <span
        className="pointer-events-none absolute -top-14 -right-4 font-mono text-[200px] leading-none font-bold select-none sm:text-[320px]"
        style={{ color: text, opacity: 0.06 }}
        aria-hidden="true"
      >
        {index}
      </span>
      <div ref={ref} className={`reveal-on-scroll relative mx-auto max-w-6xl ${visible ? "is-visible" : ""}`}>
        <div className="mb-12 sm:mb-16">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.2em] uppercase"
            style={{ backgroundColor: "color-mix(in srgb, var(--brand-accent) 22%, transparent)", color: "var(--brand-accent)" }}
          >
            {index}
          </span>
          <h2
            className="text-[42px] leading-[0.95] font-bold uppercase sm:text-[68px]"
            style={{ fontFamily: "var(--font-primary)", color: text }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-xl text-[16px]" style={{ fontFamily: "var(--font-secondary)", color: muted }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
