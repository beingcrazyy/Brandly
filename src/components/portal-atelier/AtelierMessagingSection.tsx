import { BrandData } from "@/lib/types";
import { AtelierSection } from "./AtelierSection";
import { MessagingPillars } from "../brand/MessagingPillars";

export function AtelierMessagingSection({ data }: { data: BrandData }) {
  return (
    <AtelierSection
      id="messaging"
      index="08"
      title="Messaging"
      subtitle="What we say, and why it holds up."
      component={<MessagingPillars valueProposition={data.messaging.valueProposition} pillars={data.messaging.pillars} variant="portal" />}
      copy={<p>Click a pillar for the full reasoning behind it.</p>}
    />
  );
}
