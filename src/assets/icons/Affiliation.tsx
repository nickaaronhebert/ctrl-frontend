import type { IconSVG } from "@/types/global/icon";

const Affiliation = ({ color = "#fff" }: IconSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "30px", height: "30px" }}
    fill="none"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m24.5 16.73-5.07 6.77-3.385-2.536M12.27 12.039a2.77 2.77 0 1 0 0-5.54 2.77 2.77 0 0 0 0 5.54ZM10.057 22.596H5.5v-2.251c.001-1.335.483-2.64 1.385-3.75.901-1.11 2.182-1.974 3.68-2.485a9.848 9.848 0 0 1 4.737-.384c1.59.26 3.05.902 4.198 1.846"
    />
  </svg>
);
export default Affiliation;
