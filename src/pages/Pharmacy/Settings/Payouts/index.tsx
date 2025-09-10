// import Card from "@/assets/images/Card.png";
// import { Button } from "@/components/ui/button";
import SuccessIcon from "@/assets/images/Success.png";

export default function Payout() {
  return (
    <div className="min-h-[488px] w-full rounded-bl-2xl rounded-br-2xl flex justify-center p-5">
      {/* <div className="flex flex-col items-center gap-2.5 px-5 py-8">
        <div className="flex justify-center items-center w-[68px] h-[68px] rounded-full bg-light-background ">
          <img src={Card} alt="CA" />
        </div>
        <p className="text-lg font-semibold text-center">
          Payouts Not Configured
        </p>
        <p className="text-center max-w-md text-sm font-normal text-[#3E4D61]">
          Connect your Stripe account to enable automated payouts and payment
          processing for your pharmacy.
        </p>
        <Button variant={"ctrl"} size={"xl"}>
          Configure Payouts
        </Button>
      </div> */}

      <div className="flex flex-col items-center gap-2.5 px-5 py-8">
        <img src={SuccessIcon} alt="SI" />
        <p className="text-xl font-semibold text-center">
          Stripe Payment Gateway Connected
        </p>
        <p className="text-center text-muted-foreground text-sm font-normal">
          You can now receive all payment on by stripe gateway
        </p>
      </div>
    </div>
  );
}
