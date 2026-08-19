type Tone = "neutral" | "success" | "warning" | "accent";

const dotColor: Record<Tone, string> = {
  neutral: "bg-neutral-400",
  success: "bg-emerald-600",
  warning: "bg-[#C1653F]",
  accent: "bg-[#B66A50]",
};

const textColor: Record<Tone, string> = {
  neutral: "text-neutral-600",
  success: "text-emerald-700",
  warning: "text-[#C1653F]",
  accent: "text-[#B66A50]",
};

export function Badge({ children, tone = "neutral", className = "" }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#DDD6C6] bg-white px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] uppercase ${textColor[tone]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[tone]}`} />
      {children}
    </span>
  );
}
