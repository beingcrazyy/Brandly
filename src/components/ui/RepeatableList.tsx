"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";

interface Props<T> {
  items: T[];
  onChange: (items: T[]) => void;
  makeItem: () => T;
  addLabel: string;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => React.ReactNode;
  reorder?: boolean;
}

export function RepeatableList<T extends { id: string }>({
  items,
  onChange,
  makeItem,
  addLabel,
  renderItem,
  reorder = true,
}: Props<T>) {
  function update(index: number, patch: Partial<T>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={item.id} className="group relative rounded-xl border border-[#E4DFD3] bg-white p-4">
          <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {reorder && (
              <>
                <button
                  type="button"
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="focus-ring rounded p-1 text-neutral-400 hover:bg-black/5 hover:text-neutral-700 disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                  className="focus-ring rounded p-1 text-neutral-400 hover:bg-black/5 hover:text-neutral-700 disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
              </>
            )}
            <button
              type="button"
              aria-label="Delete"
              onClick={() => remove(index)}
              className="focus-ring rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
          {renderItem(item, index, (patch) => update(index, patch))}
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, makeItem()])} className="self-start">
        <Plus size={14} /> {addLabel}
      </Button>
    </div>
  );
}
