import { CreateSubOrgCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateSubOrgCredentialsModal";
import { SubOrgInvoiceFrequencyDialog } from "@/components/common/InvoiceFrequencyDialog/SubOrgInvoiceFrequencyDialog";
import type { BillingFrequency } from "@/components/dialog/action";
import { Button } from "@/components/ui/button";
import type { SubOrganization } from "@/types/responses/IGetAllSuborganization";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

type SubOrgInfo = Pick<
  SubOrganization,
  "name" | "email" | "id" | "parentOrganization"
>;

export function pharmacysubOrganizationColumns(): ColumnDef<SubOrgInfo>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { name } = row.original;
        return <p className="text-sm font-medium">{name}</p>;
      },
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const { email } = row.original;
        return <p className="text-sm font-medium">{email}</p>;
      },
    },
    {
      accessorKey: "credentials",
      header: "Credentials",
      cell: ({ row }) => {
        const { email } = row.original;
        return <p className="text-sm font-medium">{email}</p>;
      },
    },
    {
      accessorKey: "id", // just for sorting/filtering on firstName
      header: "Action",
      cell: ({ row }) => {
        console.log(">myRowwwwwwww", row.original);
        const [openConnectionRequest, setOpenConnectionRequest] =
          useState(false);
        const [openCredentialsModal, setOpenCredentialsModal] = useState(false);
        const [selected, setSelected] = useState<BillingFrequency>("daily");
        return (
          <>
            <Button
              variant={"transparent"}
              className="min-w-28 py-2.5"
              onClick={() => setOpenConnectionRequest(true)}
            >
              Set Credentials
            </Button>
            <SubOrgInvoiceFrequencyDialog
              open={openConnectionRequest}
              setOpen={setOpenConnectionRequest}
              selected={selected}
              setSelected={setSelected}
              subOrganization={row.original.id}
              organization={row.original.parentOrganization!}
              onUpdate={() => setOpenCredentialsModal(true)}
            />
            {openCredentialsModal && (
              <CreateSubOrgCredentialsModal
                open={openCredentialsModal}
                setOpen={setOpenCredentialsModal}
                organizationName={row.original.name}
                organization={row.original.parentOrganization as string}
                subOrganization={row.original.id}
                invoiceFrequency={selected}
              />
            )}
          </>
        );
      },
    },
  ];
}
