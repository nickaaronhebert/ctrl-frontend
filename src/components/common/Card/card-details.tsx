import CardSVG from "@/assets/icons/CardIcon";
interface PaymentMethodDetailsProps {
  cardInfo: string;
  transactionId: string;
}
export default function PaymentMethodDetails({
  cardInfo,
  transactionId,
}: PaymentMethodDetailsProps) {
  return (
    <div
      className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="paymentInformation"
    >
      <div className="flex items-center gap-2 p-5 border-b border-card-border">
        <CardSVG color="black" />
        <h2 className="text-base font-semibold">Payment Information</h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 px-5">
          <div>
            <p className="text-[#63627F] text-sm font-normal">Payment Method</p>
            <p className="text-sm font-medium">Credit Card</p>
          </div>
          <div>
            <p className="text-[#63627F] text-sm font-normal">
              Card Information
            </p>
            <p className="text-sm font-medium">Visa **** {cardInfo}</p>
          </div>

          <div>
            <p className="text-[#63627F] text-sm font-normal">
              Processor Transaction ID
            </p>
            <p className="text-sm font-medium">{transactionId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
