import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./checkout";
import { useGetSetupIntentQuery } from "@/redux/services/stripe";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  hideCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);
// const appearance = {
//   theme: "flat",
//   variables: {
//     fontFamily: ' "Gill Sans", sans-serif',
//     fontLineHeight: "1.5",
//     borderRadius: "10px",
//     colorBackground: "white",
//     accessibleColorOnColorPrimary: "#262626",
//     colorPrimaryText: "#262626",
//   },
//   rules: {
//     ".Block": {
//       backgroundColor: "var(--colorBackground)",
//       boxShadow: "none",
//       padding: "12px",
//     },
//     ".Input": {
//       padding: "15px",
//       border: "1px solid #9EA5AB",
//     },
//     ".Input:disabled, .Input--invalid:disabled": {
//       color: "lightgray",
//     },
//     ".Tab": {
//       padding: "10px 12px 8px 12px",
//       border: "none",
//     },
//     ".Tab:hover": {
//       border: "none",
//       boxShadow:
//         "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
//     },
//     ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
//       border: "none",
//       backgroundColor: "transparent", // 👈 no more white
//       boxShadow:
//         "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
//     },
//     // ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
//     //   border: "none",
//     //   backgroundColor: "#fff",
//     //   boxShadow:
//     //     "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
//     // },
//     ".Label": {
//       fontWeight: "600",
//       fontSize: "14px",
//     },
//   },
// };

export default function StripeTest({ hideCard }: Props) {
  const { data, isFetching } = useGetSetupIntentQuery();

  if (isFetching) return <div>Loading...</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: data.data.setupIntent.client_secret,
        // appearance,
      }}
    >
      <PaymentForm
        clientSecret={data.data.setupIntent.client_secret}
        hideCard={hideCard}
      />
      {/* <PaymentElementForm /> */}
    </Elements>
  );
}
