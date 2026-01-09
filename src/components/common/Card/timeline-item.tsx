// import { TimelineIcon } from "./timeline-icon";
import { cn } from "@/lib/utils";
import { type TimelineEvent } from "@/types/global/commonTypes";

interface TimelineItemProps {
  event: TimelineEvent;
}

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <div className="flex gap-4 pb-8 relative">
      <div
        className={cn(
          "h-7 w-7 rounded-sm mt-1 flex items-center justify-center",
          event.style
        )}
      >
        {event?.icon ?? null}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className={`font-semibold text-sm`}>{event?.status}</p>
            <p className="text-sm text-gray-600 mt-1">{event?.description}</p>
          </div>
          <p className="text-sm text-gray-500 whitespace-nowrap text-right">
            {event?.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
