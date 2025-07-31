import { Badge } from "@/components/ui/badge";

export default function SuccessBadge({ title = "Transmitted" }) {
  return (
    <Badge className="bg-progress-secondary text-progress font-medium text-xs p-1.5 border border-progress flex gap-1.5">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5Z"
          fill="#29D668"
        />
        <path
          d="M3.05518 5.00022L4.44406 6.38911L7.22184 3.61133"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>{title}</span>
    </Badge>
  );
}
