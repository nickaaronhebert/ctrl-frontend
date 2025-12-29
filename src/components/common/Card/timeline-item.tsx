import { ExternalLink } from "lucide-react";
import { TimelineIcon } from "./timeline-icon";
import { type TimelineEvent } from "@/types/global/commonTypes";

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
  isCompleted: boolean;
}

export function TimelineItem({ event, isLast }: TimelineItemProps) {
  const statusLabelMap: Record<string, string> = {
    transmitted: "text-blue-600",
    processed: "text-purple-600",
    ready: "text-orange-600",
    shipped: "text-blue-600",
    delivered: "text-green-600",
  };

  const statusLabelColor = statusLabelMap[event.icon] || "text-gray-600";

  return (
    <div className="flex gap-4 pb-8 relative">
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200" />
      )}
      <div className="flex-shrink-0 relative z-10">
        <TimelineIcon icon={event.icon} />
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className={`font-semibold text-sm ${statusLabelColor}`}>
              {event.status}
            </p>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            {event.trackingNumber && (
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
              >
                {event.trackingNumber}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-sm text-gray-500 whitespace-nowrap text-right">
            {event.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
