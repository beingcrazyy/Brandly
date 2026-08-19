export function FieldGroup({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#E4DFD3] py-7 first:border-t-0 first:pt-0">
      <div className="mb-4">
        <h2 className="text-[14px] font-semibold text-[#14140F]">{title}</h2>
        {description && <p className="mt-0.5 text-[12px] text-neutral-500">{description}</p>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
