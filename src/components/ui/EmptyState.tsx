import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#DDD6C6] px-6 py-14 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] text-neutral-400">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="max-w-sm">
        <p className="text-sm font-medium text-[#14140F]">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
