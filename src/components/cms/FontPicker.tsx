"use client";

import { FontDefinition } from "@/lib/types";
import { Input, Select } from "../ui/Field";
import { UploadField } from "../ui/UploadField";
import { CURATED_FONTS } from "@/lib/fonts";

const WEIGHTS = [300, 400, 500, 600, 700, 800];

export function FontPicker({ label, value, onChange }: { label: string; value: FontDefinition; onChange: (v: FontDefinition) => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#E4DFD3] p-4">
      <p className="text-[13px] font-semibold text-[#14140F]">{label}</p>
      <Select label="Source" value={value.source} onChange={(e) => onChange({ ...value, source: e.target.value as FontDefinition["source"] })}>
        <option value="google">Google / web font</option>
        <option value="upload">Uploaded font file</option>
      </Select>

      {value.source === "upload" ? (
        <UploadField
          label="Font File"
          value={value.file}
          onChange={(file) => onChange({ ...value, file })}
          accept=".woff,.woff2,.ttf,.otf"
          shape="wide"
        />
      ) : null}

      <div>
        <label className="text-[13px] font-medium text-[#14140F]">Font Family</label>
        <input
          list={`${label}-fonts`}
          value={value.family}
          onChange={(e) => onChange({ ...value, family: e.target.value })}
          className="focus-ring mt-1.5 w-full rounded-xl border border-[#DDD6C6] bg-white px-3 py-2 text-sm hover:border-[#C9C2AF] focus:border-[#9C927A]"
        />
        <datalist id={`${label}-fonts`}>
          {CURATED_FONTS.map((f) => (
            <option key={f} value={f} />
          ))}
        </datalist>
      </div>

      <div>
        <p className="mb-1.5 text-[13px] font-medium text-[#14140F]">Weights</p>
        <div className="flex flex-wrap gap-2">
          {WEIGHTS.map((w) => {
            const active = value.weights.includes(w);
            return (
              <button
                key={w}
                type="button"
                onClick={() => onChange({ ...value, weights: active ? value.weights.filter((x) => x !== w) : [...value.weights, w].sort((a, b) => a - b) })}
                className={`focus-ring rounded-xl border px-2.5 py-1 text-[12px] font-medium transition-colors ${
                  active ? "border-[#C9C2AF] bg-black/[0.06] text-[#14140F]" : "border-[#E4DFD3] text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
