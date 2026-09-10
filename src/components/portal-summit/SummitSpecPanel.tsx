import { HTMLAttributes, forwardRef } from "react";
import { SUMMIT_INK, SUMMIT_PAPER_SHEET } from "./summitTheme";

interface SpecPanelProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

/** The one surface language for this edition: an opaque white "sheet" with a 1px hairline border and
 *  four small corner brackets — like a plate on a technical drawing — rather than glass blur or a
 *  hard offset shadow. Matches `SpecPanel.tsx` exactly. */
export const SummitSpecPanel = forwardRef<HTMLDivElement, SpecPanelProps>(function SummitSpecPanel({ className = "", accent = false, children, ...rest }, ref) {
  const lineColor = accent ? "var(--brand-accent)" : SUMMIT_INK;

  return (
    <div ref={ref} className={`relative rounded-[3px] border ${className}`} style={{ borderColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)", backgroundColor: SUMMIT_PAPER_SHEET }} {...rest}>
      <span aria-hidden className="absolute top-0 left-0 h-2.5 w-2.5">
        <span className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: lineColor }} />
        <span className="absolute top-0 left-0 h-px w-full" style={{ backgroundColor: lineColor }} />
      </span>
      <span aria-hidden className="absolute top-0 right-0 h-2.5 w-2.5">
        <span className="absolute top-0 right-0 h-full w-px" style={{ backgroundColor: lineColor }} />
        <span className="absolute top-0 left-0 h-px w-full" style={{ backgroundColor: lineColor }} />
      </span>
      <span aria-hidden className="absolute bottom-0 left-0 h-2.5 w-2.5">
        <span className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: lineColor }} />
        <span className="absolute bottom-0 left-0 h-px w-full" style={{ backgroundColor: lineColor }} />
      </span>
      <span aria-hidden className="absolute right-0 bottom-0 h-2.5 w-2.5">
        <span className="absolute top-0 right-0 h-full w-px" style={{ backgroundColor: lineColor }} />
        <span className="absolute bottom-0 left-0 h-px w-full" style={{ backgroundColor: lineColor }} />
      </span>
      {children}
    </div>
  );
});
