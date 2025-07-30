import { Badge } from "@/components/ui/badge";

export default function FailedBadge() {
  return (
    <Badge className="bg-failed-secondary text-failed font-medium text-xs p-1.5 border border-failed flex gap-1.5">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5Z"
          fill="#E31010"
        />
        <g clip-path="url(#clip0_11601_7908)">
          <path
            d="M6.85711 3.14307L3.14282 6.85735"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.14282 3.14307L6.85711 6.85735"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_11601_7908">
            <rect
              width="4"
              height="4"
              fill="white"
              transform="translate(3 3)"
            />
          </clipPath>
        </defs>
      </svg>

      <span>Failed</span>
    </Badge>
  );
}
