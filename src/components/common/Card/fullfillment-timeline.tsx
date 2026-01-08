import { TimelineItem } from "./timeline-item";
import { type TimelineEvent } from "@/types/global/commonTypes";

interface FulfillmentTimelineProps {
  timeline: TimelineEvent[];
}

export function FulfillmentTimeline({ timeline }: FulfillmentTimelineProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline</h3>
      <div className="space-y-0">
        {timeline.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
