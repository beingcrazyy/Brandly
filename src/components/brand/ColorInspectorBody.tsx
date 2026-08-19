"use client";

import { ColorToken } from "@/lib/types";
import { hexToRgb, rgbToCmyk, rgbToHsl, formatRgb, formatCmyk, formatHsl, rateContrast } from "@/lib/color";
import { ColorField } from "../ui/ColorField";
import { CopyButton } from "../ui/CopyButton";
import { Button } from "../ui/Button";
import { slugify } from "@/lib/store";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

interface EditableProps {
  mode: "editable";
  color: ColorToken;
  onChange: (patch: Partial<ColorToken>) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

interface ReadOnlyProps {
  mode: "readOnly";
  color: ColorToken;
  background: string;
  text: string;
}

export function ColorInspectorBody(props: EditableProps | ReadOnlyProps) {
  if (props.mode === "editable") {
    const { color, onChange, onDelete, onMove, canMoveUp, canMoveDown } = props;
    return (
      <div className="flex flex-col gap-5">
        <ColorField color={color} onChange={onChange} />
        <div className="flex items-center justify-between border-t border-[#E4DFD3] pt-4">
          <div className="flex gap-1">
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={() => onMove(-1)}
              aria-label="Move earlier"
              className="focus-ring rounded-[6px] p-1.5 text-neutral-500 hover:bg-black/5 disabled:opacity-30"
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={() => onMove(1)}
              aria-label="Move later"
              className="focus-ring rounded-[6px] p-1.5 text-neutral-500 hover:bg-black/5 disabled:opacity-30"
            >
              <ArrowDown size={14} />
            </button>
          </div>
          <Button variant="danger" size="sm" onClick={onDelete}>
            <Trash2 size={13} /> Delete color
          </Button>
        </div>
      </div>
    );
  }

  const { color, background, text } = props;
  const rgb = hexToRgb(color.hex);
  const cmyk = rgbToCmyk(rgb);
  const hsl = rgbToHsl(rgb);
  const onBg = rateContrast(color.hex, background);
  const onText = rateContrast(color.hex, text);
  const cssVar = `--color-${slugify(color.name)}: ${color.hex};`;

  return (
    <div className="flex flex-col gap-6">
      <div className="h-28 w-full rounded-[var(--radius-lab)]" style={{ backgroundColor: color.hex }} />

      <div className="grid grid-cols-2 gap-4 font-mono text-[13px]">
        <div>
          <p className="font-sans text-[11px] text-neutral-400">HEX</p>
          <p className="mt-0.5 font-medium text-[#14140F]">{color.hex}</p>
        </div>
        <div>
          <p className="font-sans text-[11px] text-neutral-400">RGB</p>
          <p className="mt-0.5 font-medium text-[#14140F]">{formatRgb(rgb)}</p>
        </div>
        <div>
          <p className="font-sans text-[11px] text-neutral-400">CMYK</p>
          <p className="mt-0.5 font-medium text-[#14140F]">{formatCmyk(cmyk)}</p>
        </div>
        <div>
          <p className="font-sans text-[11px] text-neutral-400">HSL</p>
          <p className="mt-0.5 font-medium text-[#14140F]">{formatHsl(hsl)}</p>
        </div>
      </div>

      {color.usage && (
        <div>
          <p className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Usage</p>
          <p className="mt-1 text-[14px] text-neutral-700">{color.usage}</p>
        </div>
      )}
      {color.description && <p className="text-[13px] leading-relaxed text-neutral-500">{color.description}</p>}

      <div>
        <p className="mb-2 text-[11px] font-medium tracking-wide text-neutral-400 uppercase">Contrast</p>
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex items-center justify-between rounded-[8px] border border-[#E4DFD3] px-3 py-2">
            <span className="text-neutral-500">On portal background</span>
            <span className="font-mono font-medium" style={{ color: onBg.normalText === "Fail" ? "#C1653F" : "#14140F" }}>
              {onBg.ratio.toFixed(1)}:1 · {onBg.normalText}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-[8px] border border-[#E4DFD3] px-3 py-2">
            <span className="text-neutral-500">On portal text</span>
            <span className="font-mono font-medium" style={{ color: onText.normalText === "Fail" ? "#C1653F" : "#14140F" }}>
              {onText.ratio.toFixed(1)}:1 · {onText.normalText}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[#14140F]">
        <CopyButton value={color.hex} label="Copy HEX" />
        <CopyButton value={formatRgb(rgb)} label="Copy RGB" />
        <CopyButton value={cssVar} label="Copy CSS" />
      </div>
    </div>
  );
}
