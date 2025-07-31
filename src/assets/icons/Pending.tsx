const Pending = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={49}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#FFF6E5"
      d="M32.5 0c8.837 0 16 7.163 16 16v16c0 8.837-7.163 16-16 16h-16c-8.837 0-16-7.163-16-16V16c0-8.837 7.163-16 16-16h16Z"
    />
    <path
      stroke="#FF8400"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M32.36 26.924a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM24.025 26.924a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15.692 26.924a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </svg>
);
export default Pending;
