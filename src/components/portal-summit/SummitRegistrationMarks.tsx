import { SUMMIT_INK } from "./summitTheme";

/** Fixed corner registration crosses, like a printer's plate — matches `RegistrationMarks.tsx` exactly. */
export function SummitRegistrationMarks() {
  const corners = ["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[3]">
      {corners.map((pos) => (
        <div key={pos} className={`absolute h-4 w-4 ${pos}`}>
          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)" }} />
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ backgroundColor: "color-mix(in srgb, " + SUMMIT_INK + " 25%, transparent)" }} />
        </div>
      ))}
    </div>
  );
}
