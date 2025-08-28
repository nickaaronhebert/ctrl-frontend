import type { IconSVG } from "@/types/global/icon";
const ZigZag = ({ color }: IconSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-30 flex justify-center items-center "
    fill={color}
    viewBox="0 0 30 30"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.571 8.092h2.503a.594.594 0 0 0 .514-.309L5.646 3.67a.56.56 0 0 1 .56-.309.549.549 0 0 1 .491.4l2.549 8.48a.571.571 0 0 0 .525.412.57.57 0 0 0 .515-.366l1.565-3.828a.583.583 0 0 1 .537-.366h3.04"
    />
  </svg>
);
export default ZigZag;
