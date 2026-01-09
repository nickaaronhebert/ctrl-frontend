const ShippingReady = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none">
    <path
      fill="#FFF4E5"
      d="M0 10C0 4.477 4.477 0 10 0h15.998c5.522 0 10 4.477 10 10v15.998c0 5.522-4.478 10-10 10H10c-5.523 0-10-4.478-10-10V10Z"
    />
    <g
      stroke="#FF9800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="m20.998 21 1.5 1.5 3-3" />
      <path d="M24.749 16.498v-1.5a1.5 1.5 0 0 0-.75-1.297l-5.25-3a1.5 1.5 0 0 0-1.5 0l-5.25 3a1.502 1.502 0 0 0-.75 1.297v6a1.5 1.5 0 0 0 .75 1.297l5.25 3a1.5 1.5 0 0 0 1.5 0l1.5-.855M14.624 12.203l6.75 3.863" />
      <path d="M11.467 14.25 17.999 18l6.533-3.75M17.999 25.5V18" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M9 9h17.999v17.999h-18z" />
      </clipPath>
    </defs>
  </svg>
);
export default ShippingReady;
