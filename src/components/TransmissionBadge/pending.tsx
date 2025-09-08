import { Badge } from "@/components/ui/badge";

export default function PendingBadge({ title = "Created" }) {
  return (
    <Badge className="bg-pending-secondary text-pending font-medium text-xs p-1.5 border border-pending flex gap-1.5">
      <svg
        width="11"
        height="4"
        viewBox="0 0 11 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.66676 3C9.21906 3 9.66678 2.55228 9.66678 2C9.66678 1.44772 9.21906 1 8.66676 1C8.11447 1 7.66675 1.44772 7.66675 2C7.66675 2.55228 8.11447 3 8.66676 3Z"
          stroke="#D56E01"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33327 3C5.88556 3 6.33328 2.55228 6.33328 2C6.33328 1.44772 5.88556 1 5.33327 1C4.78097 1 4.33325 1.44772 4.33325 2C4.33325 2.55228 4.78097 3 5.33327 3Z"
          stroke="#D56E01"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.00001 3C2.55231 3 3.00003 2.55228 3.00003 2C3.00003 1.44772 2.55231 1 2.00001 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2.00001 3Z"
          stroke="#D56E01"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>{title}</span>
    </Badge>
  );
}
