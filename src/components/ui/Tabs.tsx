export function Tabs<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="tablist" className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={opt === value}
          onClick={() => onChange(opt)}
          className={`focus-ring rounded-full px-3 py-1.5 text-[13px] font-medium capitalize transition-colors ${
            opt === value ? "bg-white text-[#14140F] shadow-sm" : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
