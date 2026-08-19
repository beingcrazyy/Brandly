"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Generic slide-in detail panel — right side on larger screens, bottom sheet on mobile. Reused by every "click a node/swatch to inspect" interaction. */
export function Inspector({ open, onClose, eyebrow, title, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="animate-fade-in absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-title"
        className="animate-slide-in-up sm:animate-slide-in-right fixed inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-[var(--radius-lab)] border-t border-[#E4DFD3] bg-white shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-[400px] sm:rounded-none sm:rounded-l-[var(--radius-lab)] sm:border-t-0 sm:border-l"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E4DFD3] px-6 py-5">
          <div>
            {eyebrow && <p className="mb-1 font-mono text-[10.5px] tracking-[0.1em] text-[var(--accent-terracotta)] uppercase">{eyebrow}</p>}
            <h3 id="inspector-title" className="font-serif text-[20px] font-medium text-[#14140F]">
              {title}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close inspector" className="focus-ring rounded-[6px] p-1 text-neutral-400 hover:bg-black/5 hover:text-neutral-700">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t border-[#E4DFD3] px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
