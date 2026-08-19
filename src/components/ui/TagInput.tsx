"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  label?: string;
  helper?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, helper, values, onChange, placeholder = "Add and press Enter" }: Props) {
  const [draft, setDraft] = useState("");

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-medium text-[#14140F]">{label}</label>}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#DDD6C6] bg-white px-2 py-2 focus-within:border-[#9C927A]">
        {values.map((v, i) => (
          <span key={v + i} className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] py-1 pr-1.5 pl-2.5 text-[12px] font-medium text-neutral-700">
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${v}`}
              className="focus-ring rounded-full p-0.5 text-neutral-400 hover:bg-black/10 hover:text-neutral-700"
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
              onChange(values.slice(0, -1));
            }
          }}
          onBlur={commit}
          placeholder={values.length === 0 ? placeholder : ""}
          className="focus-ring min-w-[120px] flex-1 bg-transparent px-1 py-0.5 text-sm placeholder:text-neutral-400"
        />
      </div>
      {helper && <p className="text-[12px] leading-snug text-neutral-500">{helper}</p>}
    </div>
  );
}
