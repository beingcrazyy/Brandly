import { AudienceProfile } from "@/lib/types";
import { Input, Textarea } from "../ui/Field";

export function AudienceFields({ value, onChange }: { value: AudienceProfile; onChange: (v: AudienceProfile) => void }) {
  function set<K extends keyof AudienceProfile>(key: K, v: AudienceProfile[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="flex flex-col gap-3">
      <Input label="Name" value={value.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. The Considered Minimalist" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Age Range" value={value.ageRange} onChange={(e) => set("ageRange", e.target.value)} placeholder="e.g. 28–45" />
        <Input label="Occupation" value={value.occupation} onChange={(e) => set("occupation", e.target.value)} />
      </div>
      <Input label="Location" value={value.location} onChange={(e) => set("location", e.target.value)} />
      <Textarea label="Needs" value={value.needs} onChange={(e) => set("needs", e.target.value)} rows={2} />
      <Textarea label="Problems" value={value.problems} onChange={(e) => set("problems", e.target.value)} rows={2} />
      <Textarea label="Motivations" value={value.motivations} onChange={(e) => set("motivations", e.target.value)} rows={2} />
      <Textarea label="Behaviors" value={value.behaviors} onChange={(e) => set("behaviors", e.target.value)} rows={2} />
    </div>
  );
}
