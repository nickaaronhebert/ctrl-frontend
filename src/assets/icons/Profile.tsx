import { type IconSVG } from "@/types/global/icon";

const Profile = ({ color, width, height }: IconSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    color={color}
    width={width}
    height={height}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <path d="M8 9.173a2.692 2.692 0 1 0 0-5.385 2.692 2.692 0 0 0 0 5.385Z" />
      <path
        strokeOpacity={0.2}
        d="M8 9.173a2.692 2.692 0 1 0 0-5.385 2.692 2.692 0 0 0 0 5.385Z"
      />
      <path d="M3.402 13.373a5.385 5.385 0 0 1 9.197 0" />
      <path strokeOpacity={0.2} d="M3.402 13.373a5.385 5.385 0 0 1 9.197 0" />
      <path d="M8 15.096a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
      <path strokeOpacity={0.2} d="M8 15.096a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Profile;
