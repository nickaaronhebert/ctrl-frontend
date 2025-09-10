import type { IconSVG } from "@/types/global/icon";
const CardSVG = ({ color }: IconSVG) => (
  <svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3684 1H1.94737C1.42415 1 1 1.42415 1 1.94737V9.05263C1 9.57585 1.42415 10 1.94737 10H12.3684C12.8916 10 13.3158 9.57585 13.3158 9.05263V1.94737C13.3158 1.42415 12.8916 1 12.3684 1Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 4.31641H13.3158"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.52631 7.63086H10.9474"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CardSVG;
