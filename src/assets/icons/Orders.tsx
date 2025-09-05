const Orders = ({
  color = "#9AA2AC",
  height = 30,
  width = 30,
  viewBox = "0 0 30 30",
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.8547 10.2265C22.785 10.132 22.6897 10.0594 22.5801 10.0173L14.7346 7.04912C14.6604 7.01672 14.5803 7 14.4993 7C14.4183 7 14.3381 7.01672 14.2639 7.04912L6.41843 10.0696C6.31477 10.0971 6.22011 10.1512 6.14383 10.2265C6.0525 10.337 6.00174 10.4755 6 10.6188V20.1903C6.0017 20.3209 6.04246 20.448 6.11704 20.5552C6.19161 20.6624 6.29658 20.7448 6.41843 20.7918L14.2639 23.8123H14.4993H14.7346L22.5801 20.7918C22.7019 20.7448 22.8069 20.6624 22.8815 20.5552C22.9561 20.448 22.9968 20.3209 22.9985 20.1903V10.6711C23.0096 10.5099 22.9581 10.3507 22.8547 10.2265V10.2265Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.499 23.9039V13.4956"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.499 13.4956V23.9039"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.14404 10.2788L14.4995 13.4955L22.8549 10.2788"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Orders;
