import { type Invoice, type OrgInvoice } from "@/types/global/commonTypes";
import { DescriptionList, type DescriptionItem } from "./description-list";

type InvoiceDetailsCardProps = {
  data: Invoice | OrgInvoice;
  className?: string;
  labels?: {
    invoiceId?: string;
    organizationDetails?: string;
    period?: string;
  };
};

function getOrganization(data: Invoice | OrgInvoice) {
  return (data as Invoice).organization ?? (data as OrgInvoice).pharmacy;
}

export default function InvoiceDetailsCard({
  data,
  className,
}: InvoiceDetailsCardProps) {
  const org = getOrganization(data);

  const items: DescriptionItem[] = [
    { label: "Invoice ID", value: data.id },
    {
      label: "Organization Details",
      value: (
        <span>
          <span className="font-semibold">{org.name}</span>
          {org.code && (
            <span className="text-muted-foreground">{`, ${org.code}`}</span>
          )}
        </span>
      ),
    },
    {
      label: "Period",
      value:
        new Date(data.periodStart).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) +
        " - " +
        new Date(data.periodEnd).toLocaleDateString("en-US", {
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
