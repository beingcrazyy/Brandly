"use client";

import { useRef, useState } from "react";
import { Minus, Plus, Maximize2, RotateCcw } from "lucide-react";

interface Props {
  children: React.ReactNode;
  height?: number;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
  /** Dark, immersive backdrop for labs that want a "physical exhibit" feel (icon/logo/pattern labs). Diagrams default to the paper surface. */
  surface?: "paper" | "dark";
}

const STEP = 0.15;

export function InteractiveCanvas({ children, height = 420, minZoom = 0.6, maxZoom = 2, className = "", surface = "paper" }: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function clamp(z: number) {
    return Math.min(maxZoom, Math.max(minZoom, z));
  }

  function zoomBy(delta: number) {
    setZoom((z) => Math.round(clamp(z + delta) * 100) / 100);
  }

  function reset() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.target !== e.currentTarget) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    zoomBy(e.deltaY > 0 ? -STEP : STEP);
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lab)] border ${
        surface === "dark" ? "border-black/40 bg-[#17160F]" : "border-[#E4DFD3] bg-white"
      } ${className}`}
      style={{ height }}
    >
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div
          className="pointer-events-none absolute inset-0 origin-center transition-transform duration-100 ease-out"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
        >
          <div className="pointer-events-auto absolute inset-0">{children}</div>
        </div>
      </div>

      <div
        className={`absolute top-3 right-3 flex items-center gap-0.5 rounded-[8px] border p-1 backdrop-blur ${
          surface === "dark" ? "border-white/15 bg-black/40" : "border-[#E4DFD3] bg-white/90"
        }`}
      >
        <button
          type="button"
          onClick={() => zoomBy(-STEP)}
          aria-label="Zoom out"
          className={`focus-ring flex h-7 w-7 items-center justify-center rounded-[6px] ${surface === "dark" ? "text-white/70 hover:bg-white/10" : "text-neutral-500 hover:bg-black/5"}`}
        >
          <Minus size={13} />
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset zoom to 100%"
          className={`focus-ring min-w-[42px] rounded-[6px] px-1.5 py-1 text-center font-mono text-[11px] ${surface === "dark" ? "text-white/70 hover:bg-white/10" : "text-neutral-500 hover:bg-black/5"}`}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          onClick={() => zoomBy(STEP)}
          aria-label="Zoom in"
          className={`focus-ring flex h-7 w-7 items-center justify-center rounded-[6px] ${surface === "dark" ? "text-white/70 hover:bg-white/10" : "text-neutral-500 hover:bg-black/5"}`}
        >
          <Plus size={13} />
        </button>
        <span className={`mx-1 h-4 w-px ${surface === "dark" ? "bg-white/15" : "bg-[#E4DFD3]"}`} />
        <button
          type="button"
          onClick={reset}
          aria-label="Fit to view"
          className={`focus-ring flex h-7 w-7 items-center justify-center rounded-[6px] ${surface === "dark" ? "text-white/70 hover:bg-white/10" : "text-neutral-500 hover:bg-black/5"}`}
        >
          <Maximize2 size={12} />
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset view"
          className={`focus-ring flex h-7 w-7 items-center justify-center rounded-[6px] ${surface === "dark" ? "text-white/70 hover:bg-white/10" : "text-neutral-500 hover:bg-black/5"}`}
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}
