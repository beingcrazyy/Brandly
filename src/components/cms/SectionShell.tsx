import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function SectionShell({
  title,
  description,
  dirty,
  onSave,
  children,
  width = "max-w-2xl",
}: {
  title: string;
  description?: string;
  dirty: boolean;
  onSave: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div className={`${width} px-6 py-10 lg:px-10`}>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[26px] leading-tight font-medium tracking-tight text-[#14140F]">{title}</h1>
          {description && <p className="mt-1 max-w-md text-[13px] text-neutral-500">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={dirty ? "warning" : "success"}>{dirty ? "Unsaved changes" : "Saved"}</Badge>
          <Button size="sm" onClick={onSave} disabled={!dirty}>
            Save Changes
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
