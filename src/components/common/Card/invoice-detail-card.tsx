import type { InvoiceDetail } from "@/types/responses/invoice";
import { DescriptionList, type DescriptionItem } from "./description-list";

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
  console.log("my details", data);

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
        new Date(data?.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) +
        " - " +
        new Date(data?.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
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
