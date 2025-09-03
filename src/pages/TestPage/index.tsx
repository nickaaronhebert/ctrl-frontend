import { Button } from "@/components/ui/button";
import { useLazyConnectStripeQuery } from "@/redux/services/patientApi";

const TestAPI = () => {
  const [triggerConnectStripe, { data, error, isLoading }] =
    useLazyConnectStripeQuery();

  const handleClick = async () => {
    try {
      const result = await triggerConnectStripe({}).unwrap();
      console.log("Stripe Connect Response:", result);
      const stripeUrl = result?.data?.data?.url;

      if (stripeUrl) {
        window.location.href = stripeUrl;
      }
    } catch (err) {
      console.error("Failed to connect to Stripe:", err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        className="bg-black text-white hover:bg-black hover:text-white cursor-pointer"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Connecting..." : "Connect Stripe Account"}
        {error && <p style={{ color: "red" }}>Error connecting to Stripe.</p>}
        {data && !data.url && <p>Connected successfully!</p>}
      </Button>
    </div>
  );
};

export default TestAPI;
