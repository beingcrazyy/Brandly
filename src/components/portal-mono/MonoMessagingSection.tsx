import { BrandData } from "@/lib/types";
import { MonoSection } from "./MonoSection";
import { MessagingPillars } from "../brand/MessagingPillars";

export function MonoMessagingSection({ data }: { data: BrandData }) {
  return (
    <MonoSection
      id="messaging"
      index="08"
      title="Messaging"
      subtitle="What we say, and why it holds up."
      component={<MessagingPillars valueProposition={data.messaging.valueProposition} pillars={data.messaging.pillars} variant="portal" />}
      copy={<p>Click a pillar for the full reasoning behind it.</p>}
    />
  );
}
