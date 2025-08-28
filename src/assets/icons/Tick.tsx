import type { IconSVG } from "@/types/global/icon";

const Tick = ({ color = "#9AA2AC" }: IconSVG) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
    <path
      fill="#C3C1C6"
      stroke="#C3C1C6"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6 9.479 2.05 1.426a.55.55 0 0 0 .74-.122L12 6"
    />
  </svg>
);
export default Tick;
