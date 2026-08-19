import { useRevealOnScroll } from "@/lib/useRevealOnScroll";

export function PortalSection({
  id,
  index,
  title,
  subtitle,
  tint = false,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  /** Alternates the section onto the brand's secondary color — a real editorial device (color-banded brand books), not decoration. */
  tint?: boolean;
  children: React.ReactNode;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      id={id}
      className="scroll-mt-20 border-t px-6 sm:px-10 lg:px-16"
      style={{
        borderColor: "color-mix(in srgb, var(--brand-text) 10%, transparent)",
        paddingTop: "var(--spacing-section)",
        paddingBottom: "var(--spacing-section)",
        backgroundColor: tint ? "color-mix(in srgb, var(--brand-secondary) 55%, var(--brand-background))" : "transparent",
      }}
    >
      <div ref={ref} className={`mx-auto max-w-5xl reveal-on-scroll ${visible ? "is-visible" : ""}`}>
        <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
          <span
            className="text-[12px] tracking-[0.2em]"
            style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}
          >
            {index}
          </span>
          <div>
            <h2
              className="text-[32px] leading-tight font-medium sm:text-[40px]"
              style={{ fontFamily: "var(--font-primary)", color: "var(--brand-text)" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 max-w-xl text-[15px]" style={{ fontFamily: "var(--font-secondary)", color: "var(--brand-muted)" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
