import { Badge } from "@/components/ui/badge";

export default function QueuedBadge({ title = "Queued" }) {
  return (
    <Badge className="bg-queued-secondary text-queued font-medium text-xs p-1.5 border border-queued flex gap-1.5">
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.50049 0.5L10.8067 3.81154C10.8325 3.83571 10.853 3.8649 10.867 3.89732C10.8811 3.92973 10.8883 3.96468 10.8883 4C10.8883 4.03532 10.8811 4.07027 10.867 4.10268C10.853 4.1351 10.8325 4.16429 10.8067 4.18846L7.50049 7.5"
          stroke="#008CE3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.99951 0.5L7.31113 3.81154C7.36046 3.86187 7.38809 3.92953 7.38809 4C7.38809 4.07047 7.36046 4.13813 7.31113 4.18846L3.99951 7.5"
          stroke="#008CE3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 0.5L4.31162 3.81154C4.36095 3.86187 4.38858 3.92953 4.38858 4C4.38858 4.07047 4.36095 4.13813 4.31162 4.18846L1 7.5"
          stroke="#008CE3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>{title}</span>
    </Badge>
  );
}
