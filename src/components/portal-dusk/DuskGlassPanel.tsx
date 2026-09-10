import { HTMLAttributes, forwardRef } from "react";

/** The one surface language for the whole portal: translucent, blurred, hairline border, soft inner
 *  highlight. Every card, tooltip, and detail panel is built from this so the glass language never
 *  wavers — matches cairn-brand-portal's `GlassPanel.tsx` exactly. */
export const DuskGlassPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DuskGlassPanel(
  { className = "", children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className}`}
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.10), 0 1px 0 0 rgba(255,255,255,0.04)" }}
      {...rest}
    >
      {children}
    </div>
  );
});
