import { TimelineItem } from "./timeline-item";
import { type TimelineEvent } from "@/types/global/commonTypes";

interface FulfillmentTimelineProps {
  timeline: TimelineEvent[];
}

export function FulfillmentTimeline({ timeline }: FulfillmentTimelineProps) {
  if (!timeline || timeline?.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-gray-500">
        No tracking information available yet
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline</h3>
      <div className="space-y-0">
        {timeline?.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
