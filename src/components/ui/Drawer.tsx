"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Drawer({ open, onClose, children, side = "left" }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="animate-fade-in absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-[82%] max-w-xs overflow-y-auto bg-white shadow-2xl transition-transform duration-300`}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="focus-ring rounded-xl p-1.5 text-neutral-500 hover:bg-black/5"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
