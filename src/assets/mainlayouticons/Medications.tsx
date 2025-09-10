import type { IconSVG } from "@/types/global/icon";

const Medications = ({ color }: IconSVG) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path
      fill={color}
      d="M11 7a3.97 3.97 0 0 0-2 .541V4.5a3.5 3.5 0 1 0-7 0v7a3.5 3.5 0 0 0 6.143 2.294A3.998 3.998 0 1 0 11 7Zm0 1a3.002 3.002 0 0 1 2.955 2.5h-5.91A3.002 3.002 0 0 1 11 8ZM3 4.5a2.5 2.5 0 0 1 5 0v3H3v-3ZM5.5 14A2.503 2.503 0 0 1 3 11.5v-3h4.882a3.978 3.978 0 0 0-.362 4.466A2.494 2.494 0 0 1 5.5 14Zm5.5 0a3.002 3.002 0 0 1-2.955-2.5h5.91A3.002 3.002 0 0 1 11 14Z"
    />
  </svg>
);
export default Medications;
