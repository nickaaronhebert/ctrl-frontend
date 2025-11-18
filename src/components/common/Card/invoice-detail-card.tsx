import type { InvoiceDetail } from "@/types/responses/invoice";
import { DescriptionList, type DescriptionItem } from "./description-list";
import { format } from "date-fns";

type InvoiceDetailsCardProps = {
  data: InvoiceDetail;
  className?: string;
  labels?: {
    invoiceId?: string;
    organizationDetails?: string;
    period?: string;
  };
  screenType?: string;
};

export default function InvoiceDetailsCard({
  data,
  className,
  labels,
  screenType,
}: InvoiceDetailsCardProps) {
  const items: DescriptionItem[] = [
    { label: "Invoice ID", value: data?.invoiceId },
    {
      label: labels?.organizationDetails as string,
      value: (
        <span className="font-semibold">
          {screenType === "organization"
            ? data?.pharmacy?.name
            : data?.organization?.name}
        </span>
      ),
    },
    {
      label: "Period",
      value:
        (data?.startDate
          ? format(new Date(data.startDate), "MMM d, yyyy")
          : "") +
        " - " +
        (data?.endDate ? format(new Date(data.endDate), "MMM d, yyyy") : ""),
    },
  ];

  return (
    <DescriptionList
      title="Invoice Details"
      items={items}
      className={className}
    />
  );
}
