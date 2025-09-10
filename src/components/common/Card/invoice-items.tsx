import Invoices from "@/assets/icons/Invoices";

type InvoiceItems =
  | {
      variantId: string;
      variantUnit: string;
      productName: string;
      qty: number;
      unitPrice: number;
    }[];

type InvoiceItemCardsProps = {
  invoiceItems: InvoiceItems | undefined;
  totalAmount: number | string;
  applicationFee: number | string;
};

export default function InvoiceItemsCard({
  invoiceItems,
  totalAmount,
  applicationFee,
}: InvoiceItemCardsProps) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="medications"
    >
      <h2 className="flex gap-2 items-center text-base font-semibold p-5 border-b border-card-border">
        <Invoices color="black" />
        Medications
      </h2>
      <div className="p-5">
        <div className="rounded-[10px] p-3 bg-[#F6F8F9]">
          <p className="text-sm font-semibold">Medications</p>
          {invoiceItems?.map((item) => {
            return (
              <div className="flex justify-between space-y-1.5">
                <span className="text-sm font-normal">
                  {`${item.productName} (${item.qty} ${item.variantUnit})`}
                </span>
                <span className="text-sm font-medium">
                  {`$${item.unitPrice}`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between p-3 space-y-1.5 border-b border-[#DFDFDFE0]">
          <span className="text-sm font-normal">
            Platform processing and transmission fee
          </span>
          <span className="text-sm font-medium">{`$${applicationFee}`}</span>
        </div>

        <div className="p-3 flex justify-between items-center">
          <div>
            <p className="text-[#008CE3] text-base font-semibold">
              Total Amount
            </p>
            <p className="text-sm font-normal text-[#3E4D61]">
              Amount charged to patient
            </p>
          </div>
          <p className="text-xl font-semibold">{`$${totalAmount}`}</p>
        </div>
      </div>
    </div>
  );
}
