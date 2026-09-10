import { BrandData } from "@/lib/types";
import { AtelierSection } from "./AtelierSection";
import { VoiceToneSwitch } from "../brand/VoiceToneSwitch";

export function AtelierVoiceSection({ data }: { data: BrandData }) {
  return (
    <AtelierSection
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
