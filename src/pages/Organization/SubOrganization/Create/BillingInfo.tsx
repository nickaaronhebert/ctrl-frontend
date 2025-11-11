import type { BillingDetails } from "@/redux/slices/sub-org";

interface BillingInfoProps {
  billingInfo: BillingDetails;
}

const BillingInfo = ({ billingInfo }: BillingInfoProps) => {
  console.log("BillingInfo", billingInfo);
  return <div>Billing Info</div>;
};

export default BillingInfo;
