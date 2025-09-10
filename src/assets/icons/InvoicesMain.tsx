const InvoicesMain = ({ color = "#9AA2AC" }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M15 11.154V8.846M12.693 17.308c0 1.154 1.03 1.538 2.308 1.538 1.277 0 2.307 0 2.307-1.538 0-2.308-4.615-2.308-4.615-4.616 0-1.538 1.03-1.538 2.308-1.538 1.277 0 2.307.584 2.307 1.538M15 18.846v2.308"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M15 25c5.523 0 10-4.477 10-10S20.523 5 15 5 5 9.477 5 15s4.477 10 10 10Z"
    />
  </svg>
);
export default InvoicesMain;
