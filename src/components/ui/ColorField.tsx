"use client";

import { ColorToken, ColorRole } from "@/lib/types";
import { hexToRgb, rgbToCmyk, formatRgb, formatCmyk } from "@/lib/color";
import { Input, Select, Textarea } from "./Field";

const ROLES: ColorRole[] = ["primary", "secondary", "accent", "neutral"];

export function ColorField({
  color,
  onChange,
}: {
  color: ColorToken;
  onChange: (patch: Partial<ColorToken>) => void;
}) {
  const validHex = /^#[0-9A-Fa-f]{6}$/.test(color.hex) ? color.hex : "#000000";
  const rgb = hexToRgb(validHex);
  const cmyk = rgbToCmyk(rgb);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-shrink-0 flex-col items-center gap-2">
        <label className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-xl border border-[#E4DFD3] shadow-sm">
          <span className="absolute inset-0" style={{ backgroundColor: validHex }} />
          <input
            type="color"
            value={validHex}
            onChange={(e) => onChange({ hex: e.target.value.toUpperCase() })}
            className="absolute -inset-2 cursor-pointer opacity-0"
            aria-label={`${color.name || "Color"} picker`}
          />
        </label>
        <Select
          value={color.role}
          onChange={(e) => onChange({ role: e.target.value as ColorRole })}
          aria-label="Color role"
          className="!py-1.5 text-[12px] capitalize"
        >
          {ROLES.map((r) => (
            <option key={r} value={r} className="capitalize">
              {r}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3">
        <Input label="Name" value={color.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. Clay" />
        <Input
          label="Hex"
          value={color.hex}
          onChange={(e) => onChange({ hex: e.target.value.toUpperCase() })}
          placeholder="#RRGGBB"
          className="font-mono"
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#14140F]">RGB</span>
          <div className="rounded-xl border border-[#E4DFD3] bg-black/[0.02] px-3 py-2 font-mono text-[13px] text-neutral-600">{formatRgb(rgb)}</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#14140F]">CMYK</span>
          <div className="rounded-xl border border-[#E4DFD3] bg-black/[0.02] px-3 py-2 font-mono text-[13px] text-neutral-600">{formatCmyk(cmyk)}</div>
        </div>
        <Textarea
          label="Usage"
          value={color.usage}
          onChange={(e) => onChange({ usage: e.target.value })}
          rows={2}
          className="col-span-2"
          placeholder="Where this color should be used"
        />
        <Textarea
          label="Description"
          value={color.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={2}
          className="col-span-2"
        />
      </div>
    </div>
  );
}
