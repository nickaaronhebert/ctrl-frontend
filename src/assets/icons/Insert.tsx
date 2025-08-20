export default function InsertIconSVG({ color = "white" }) {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5.64286H5.14286V9.5H3.85714V5.64286H0V4.35714H3.85714V0.5H5.14286V4.35714H9V5.64286Z"
        fill={color}
      />
    </svg>
  );
}
