import { BrandData } from "@/lib/types";
import { StudioSection } from "./StudioSection";
import { MessagingPillars } from "../brand/MessagingPillars";

export function StudioMessagingSection({ data }: { data: BrandData }) {
  return (
    <StudioSection
      id="messaging"
      index="08"
      title="Messaging"
      subtitle="What we say, and why it holds up."
      data={data}
      tint
      component={<MessagingPillars valueProposition={data.messaging.valueProposition} pillars={data.messaging.pillars} variant="portal" />}
      copy={<p>Click a pillar for the full reasoning behind it.</p>}
    />
  );
}
