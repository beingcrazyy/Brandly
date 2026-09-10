import { BrandData } from "@/lib/types";
import { StudioSection } from "./StudioSection";
import { VoiceToneSwitch } from "../brand/VoiceToneSwitch";

export function StudioVoiceSection({ data }: { data: BrandData }) {
  return (
    <StudioSection
      id="voice"
      index="07"
      title="Voice & Tone"
      subtitle="How the brand sounds, in writing and in speech."
      data={data}
      tint
      component={<VoiceToneSwitch voice={data.voice} variant="portal" />}
      copy={<p>{data.voice.voice}</p>}
    />
  );
}
