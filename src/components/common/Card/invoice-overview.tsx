import ZigZag from "@/assets/icons/ZigZag";
import type { Invoices } from "@/types/global/commonTypes";

type InvoiceDetails = Pick<
  Invoices,
  "createdAt" | "totalAmount" | "transmissionCode"
>;

const invoiceDisplayFields: {
  label: string;
  getValue: (invoice: InvoiceDetails) => string | number;
}[] = [
  {
    label: "Transmission Id",
    getValue: (invoice) => `${invoice.transmissionCode}`,
  },
  {
    label: "Invoice Date",
    getValue: (invoice) => `${invoice.createdAt}`,
  },
  {
    label: "Amount Paid",
    getValue: (invoice) => invoice.totalAmount,
  },
];

export default function InvoiceOverviewCard({
  invoice,
}: {
  invoice: InvoiceDetails;
}) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="invoiceInformation"
    >
      <h2 className="flex gap-1.5 items-center text-base font-semibold p-5 border-b border-card-border">
        <ZigZag color="black" />
        Invoice Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {invoiceDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground ">
              {label}
            </h4>
            <span className="capitalize font-medium text-primary-foreground">
              {getValue(invoice as InvoiceDetails)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
