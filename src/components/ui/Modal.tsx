"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Rendered outside the scrollable body, pinned to the bottom — for Cancel/Save-style action rows. */
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
}

const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ open, onClose, title, description, children, footer, width = "md" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`focus-ring flex max-h-[90vh] w-full ${widths[width]} animate-fade-in flex-col rounded-xl border border-[#E4DFD3] bg-white shadow-2xl`}
      >
        <div className="flex flex-shrink-0 items-start justify-between gap-4 border-b border-[#E4DFD3] px-6 py-5">
          <div>
            {title && (
              <h2 id="modal-title" className="text-[17px] font-semibold text-[#14140F]">
                {title}
              </h2>
            )}
            {description && <p className="mt-1 text-[13px] text-neutral-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="focus-ring rounded-xl p-1 text-neutral-400 hover:bg-black/5 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex flex-shrink-0 justify-end gap-3 border-t border-[#E4DFD3] px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
