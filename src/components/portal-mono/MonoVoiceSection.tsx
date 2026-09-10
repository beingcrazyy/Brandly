import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { VoiceToneSwitch } from "../brand/VoiceToneSwitch";

export function MonoVoiceSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="voice"
      index="07"
      title="Voice & Tone"
      subtitle="How the brand sounds, in writing and in speech."
      tint
      component={<VoiceToneSwitch voice={data.voice} variant="portal" />}
      copy={<p>{data.voice.voice}</p>}
    />
  );
}
