const Delivered = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none">
    <path
      fill="#E6F7F0"
      d="M0 10C0 4.477 4.477 0 10 0h15.998c5.522 0 10 4.477 10 10v15.998c0 5.522-4.478 10-10 10H10c-5.523 0-10-4.478-10-10V10Z"
    />
    <g
      stroke="#00B87C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M25.35 16.498a7.5 7.5 0 1 1-3.601-4.998" />
      <path d="m15.749 17.25 2.25 2.25 7.5-7.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M9 9h17.999v17.999h-18z" />
      </clipPath>
    </defs>
  </svg>
);
export default Delivered;
