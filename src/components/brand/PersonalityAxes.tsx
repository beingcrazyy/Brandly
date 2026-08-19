"use client";

import { useRef, useState } from "react";
import { PersonalityScale } from "@/lib/types";

interface Props {
  scale: PersonalityScale;
  editable?: boolean;
  onChange?: (value: number) => void;
  onLabelChange?: (patch: { leftLabel?: string; rightLabel?: string }) => void;
  /** Portal passes brand tokens so the track/handle read as brand-native; CMS uses the terracotta lab accent. */
  accentColor?: string;
  trackColor?: string;
  labelColor?: string;
}

const STEP = 1;

export function PersonalityAxes({ scale, editable = false, onChange, onLabelChange, accentColor, trackColor, labelColor }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const accent = accentColor ?? "var(--accent-terracotta)";
  const track = trackColor ?? "rgba(0,0,0,0.1)";
  const label = labelColor ?? "var(--brand-muted)";

  function valueFromClientX(clientX: number): number {
    const track = trackRef.current;
    if (!track) return scale.value;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.round(Math.min(100, Math.max(0, pct)));
  }

  function onHandlePointerDown(e: React.PointerEvent) {
    if (!editable) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function onHandlePointerMove(e: React.PointerEvent) {
    if (!dragging || !editable) return;
    onChange?.(valueFromClientX(e.clientX));
  }
  function onHandlePointerUp() {
    setDragging(false);
  }
  function onTrackClick(e: React.MouseEvent) {
    if (!editable || dragging) return;
    onChange?.(valueFromClientX(e.clientX));
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (!editable) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange?.(Math.max(0, scale.value - STEP));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange?.(Math.min(100, scale.value + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange?.(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange?.(100);
    }
  }

  const nearLabel = scale.value >= 50 ? scale.rightLabel : scale.leftLabel;
  const showTooltip = hovering || dragging;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        {editable ? (
          <input
            value={scale.leftLabel}
            onChange={(e) => onLabelChange?.({ leftLabel: e.target.value })}
            className="focus-ring w-1/3 rounded-[4px] bg-transparent text-[13px] font-medium text-[#14140F] hover:bg-black/[0.03] focus:bg-black/[0.03]"
          />
        ) : (
          <span className="text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: label }}>
            {scale.leftLabel}
          </span>
        )}
        {editable ? (
          <input
            value={scale.rightLabel}
            onChange={(e) => onLabelChange?.({ rightLabel: e.target.value })}
            className="focus-ring w-1/3 rounded-[4px] bg-transparent text-right text-[13px] font-medium text-[#14140F] hover:bg-black/[0.03] focus:bg-black/[0.03]"
          />
        ) : (
          <span className="text-[13px]" style={{ fontFamily: "var(--font-secondary)", color: label }}>
            {scale.rightLabel}
          </span>
        )}
      </div>

      <div
        ref={trackRef}
        onClick={onTrackClick}
        className={`relative h-2 rounded-full ${editable ? "cursor-pointer" : ""}`}
        style={{ backgroundColor: track }}
      >
        <div className="absolute inset-y-0 left-0 rounded-full opacity-40" style={{ width: `${scale.value}%`, backgroundColor: accent }} />
        <button
          type="button"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          onKeyDown={onKeyDown}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={scale.value}
          aria-label={`${scale.leftLabel} to ${scale.rightLabel}`}
          tabIndex={0}
          className={`focus-ring absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-transform ${
            editable ? "cursor-grab touch-none active:cursor-grabbing" : "cursor-default"
          } ${dragging ? "scale-110" : ""}`}
          style={{ left: `${scale.value}%`, backgroundColor: accent }}
        />
        {showTooltip && (
          <div
            className="pointer-events-none absolute -top-9 -translate-x-1/2 rounded-[6px] bg-[#14140F] px-2 py-1 font-mono text-[11px] whitespace-nowrap text-white"
            style={{ left: `${scale.value}%` }}
          >
            {scale.value}/100 — {nearLabel}
          </div>
        )}
      </div>
    </div>
  );
}
