import type { IconSVG } from "@/types/global/icon";
const Invoices = ({ color = "#9AA2AC" }: IconSVG) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 5.30679V3.69141"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.38446 9.61629C6.38446 10.424 7.106 10.6932 7.99984 10.6932C8.89369 10.6932 9.61523 10.6932 9.61523 9.61629C9.61523 8.0009 6.38446 8.0009 6.38446 6.38552C6.38446 5.30859 7.106 5.30859 7.99984 5.30859C8.89369 5.30859 9.61523 5.71782 9.61523 6.38552"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00043 10.6914V12.3068"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Invoices;
