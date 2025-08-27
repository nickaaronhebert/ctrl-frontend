import type { IconSVG } from "@/types/global/icon";

const Transactions = ({ color = "#9AA2AC" }: IconSVG) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 11.1539V8.84619"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.6929 17.3077C12.6929 18.4615 13.7236 18.8461 15.0006 18.8461C16.2775 18.8461 17.3083 18.8461 17.3083 17.3077C17.3083 15 12.6929 15 12.6929 12.6923C12.6929 11.1538 13.7236 11.1538 15.0006 11.1538C16.2775 11.1538 17.3083 11.7384 17.3083 12.6923"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.0005 18.8462V21.1539"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Transactions;
