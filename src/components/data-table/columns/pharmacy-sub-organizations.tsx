import { CreateSubOrgCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateSubOrgCredentialsModal";
import { SubOrgInvoiceFrequencyDialog } from "@/components/common/InvoiceFrequencyDialog/SubOrgInvoiceFrequencyDialog";
import type { BillingFrequency } from "@/components/dialog/action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OrgSubOrgs } from "@/types/responses/ISubOrg";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export function pharmacysubOrganizationColumns(
  organization: string,
  invitation: string
): ColumnDef<OrgSubOrgs>[] {
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
      accessorKey: "invoiceFrequency",
      header: "Credentials",
      cell: ({ row }) => {
        const { invoiceFrequency } = row.original;
        const isConfigured = !!invoiceFrequency;
        return (
          <span
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-md border",
              isConfigured
                ? "text-green-600 border-green-300 bg-green-50"
                : "text-orange-600 border-orange-300 bg-orange-50"
            )}
          >
            {isConfigured ? "Configured" : "Not Configured"}
          </span>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        console.log(">>>", row.original);
        const [openBillingModal, setOpenBillingModal] =
          useState<boolean>(false);
        const [openCredentialsModal, setOpenCredentialsModal] = useState(false);
        const [checked, setChecked] = useState<boolean>(false);
        const [selected, setSelected] = useState<BillingFrequency>(
          (row.original.invoiceFrequency || "daily") as BillingFrequency
        );
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const isConfigured = !!row.original.invoiceFrequency;

        const handleFirstTimeSetup = () => {
          setOpenBillingModal(true);
        };

        const handleModifyCredentials = () => {
          setOpenCredentialsModal(true);
          setIsEditing(true);
        };

        const handleManageBilling = () => {
          setOpenBillingModal(true);
          setIsEditing(true);
        };

        return (
          <>
            {!isConfigured && (
              <Button
                variant="outline"
                className="min-w-28 py-2.5 rounded-full text-black"
                onClick={handleFirstTimeSetup}
              >
                Set Credentials
              </Button>
            )}

            {isConfigured && (
              <div className="flex  gap-2">
                <Button
                  variant="outline"
                  className="min-w-28 py-2.5 rounded-full text-primary border-primary hover:bg-primary/5"
                  onClick={handleModifyCredentials}
                >
                  Modify Credential
                </Button>

                <Button
                  variant="outline"
                  className="min-w-28 py-2.5 rounded-full text-primary border-primary hover:bg-primary/5"
                  onClick={handleManageBilling}
                >
                  Manage Billing Status
                </Button>
              </div>
            )}
            <SubOrgInvoiceFrequencyDialog
              open={openBillingModal}
              setOpen={setOpenBillingModal}
              selected={selected}
              setSelected={setSelected}
              subOrganization={row.original.id}
              organization={organization}
              isConfigured={isConfigured}
              checked={checked}
              setChecked={setChecked}
              onUpdate={() => {
                if (!isConfigured) {
                  setOpenCredentialsModal(true);
                }
              }}
              isEditing={isEditing}
            />
            {openCredentialsModal && (
              <CreateSubOrgCredentialsModal
                open={openCredentialsModal}
                setOpen={setOpenCredentialsModal}
                organizationName={row.original.name}
                organization={organization}
                subOrganization={row.original.id}
                invoiceFrequency={selected}
                isEditing={isEditing}
                invitation={invitation}
                checked={checked}
              />
            )}
          </>
        );
      },
    },
  ];
}
