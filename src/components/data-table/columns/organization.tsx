import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import type { CtrlOrganization } from "@/types/responses/IListAllOrganization";
import type { ColumnDef } from "@tanstack/react-table";
import { useTrustedOrganizationsMutation } from "@/redux/services/admin";
import { useState } from "react";

export function ctrlOrganizationColumns(): ColumnDef<CtrlOrganization>[] {
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
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => {
        const { phoneNumber } = row.original;
        return <p className="text-sm font-medium">{phoneNumber}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;

        return (
          <>
            <div className="flex items-center gap-2">
              <Badge variant={"outline"}>{status}</Badge>
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "isTelegraTrustedPartner",
      header: "Trusted Organizations",
      cell: ({ row }) => {
        const [updateTrusted, { isLoading }] =
          useTrustedOrganizationsMutation();
        const { isTelegraTrustedPartner } = row.original;
        const [trusted, setTrusted] = useState<boolean>(
          isTelegraTrustedPartner || false
        );

        const handleTrustedToggle = async (value: boolean) => {
          try {
            await updateTrusted({
              organization: row.original.id,
              isTrusted: value,
            }).unwrap();
            setTrusted(value);
            toast.success(
              `Marked organization as ${value ? "trusted" : "untrusted"}`
            );
          } catch (error) {
            console.error("Failed to update trusted status:", error);
            if (error && typeof error === "object" && "data" in error) {
              const err = error as { data?: { message?: string } };
              toast.error(err.data?.message || "Failed to create credentials");
            } else {
              toast.error("Something went wrong");
            }
          }
        };

        console.log("Trusted status:", trusted);

        return (
          <>
            <Switch
              checked={trusted}
              onCheckedChange={handleTrustedToggle}
              disabled={isLoading}
              className="data-[state=checked]:bg-green-600 ml-10 cursor-pointer"
            />
          </>
        );
      },
    },
  ];
}
