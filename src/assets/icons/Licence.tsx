import type { IconSVG } from "@/types/global/icon";

const Licence = ({ color = "#fff" }: IconSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "30px", height: "30px" }}
    fill="none"
    color={color}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.922 11.923a3.462 3.462 0 1 0 0-6.923 3.462 3.462 0 0 0 0 6.923ZM13.46 14.399A6.908 6.908 0 0 0 5 21.153v2.307h8.462M20.645 24.954a.77.77 0 0 1-.523 0 6.893 6.893 0 0 1-4.354-6.4V16.54a.724.724 0 0 1 .77-.77h7.692a.724.724 0 0 1 .77.77v2.015a6.892 6.892 0 0 1-4.355 6.4v0Z"
    />
  </svg>
);
export default Licence;
