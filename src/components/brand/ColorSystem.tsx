"use client";

import { ColorToken } from "@/lib/types";
import { isLight } from "@/lib/color";
import { Plus } from "lucide-react";

export function ColorSystem({
  colors,
  onSelect,
  onAdd,
  variant = "lab",
}: {
  colors: ColorToken[];
  onSelect: (color: ColorToken) => void;
  onAdd?: () => void;
  /** "lab" (CMS) keeps Brandly's own serif label; "portal" (public templates) is sans-only. */
  variant?: "lab" | "portal";
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {colors.map((color) => {
        const light = isLight(color.hex);
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onSelect(color)}
            className="focus-ring group flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-lab)] p-5 text-left transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: color.hex }}
          >
            <span className="font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase opacity-60" style={{ color: light ? "#14140F" : "#F6F4EE" }}>
              {color.role}
            </span>
            <div>
              <p className={`text-[16px] font-medium ${variant === "lab" ? "font-serif" : ""}`} style={{ color: light ? "#14140F" : "#F6F4EE" }}>
                {color.name}
              </p>
              <p className="font-mono text-[11px] opacity-70" style={{ color: light ? "#14140F" : "#F6F4EE" }}>
                {color.hex}
              </p>
            </div>
          </button>
        );
      })}
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="focus-ring flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[var(--radius-lab)] border border-dashed border-[#C9C2AF] text-neutral-400 transition-colors hover:border-[var(--accent-terracotta)] hover:text-[var(--accent-terracotta)]"
        >
          <Plus size={18} />
          <span className="text-[12px] font-medium">Add Color</span>
        </button>
      )}
    </div>
  );
}
