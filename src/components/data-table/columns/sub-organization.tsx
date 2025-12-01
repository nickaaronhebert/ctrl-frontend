import { Badge } from "@/components/ui/badge";
import type { SubOrganization } from "@/types/responses/IGetAllSuborganization";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
// import { useAppDispatch } from "@/redux/store";
// import { setDirectToStepTwo } from "@/redux/slices/sub-org";
// import { useNavigate } from "react-router-dom";

export function ctrlSubOrganizationColumns(): ColumnDef<SubOrganization>[] {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
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
        return <Badge variant={"outline"}>{status}</Badge>;
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const isConfigured = row.original.isSubOrgPaymentMethodConfigured;

        return (
          <div className="flex flex-col gap-2 items-center">
            {isConfigured ? (
              <span className="text-green-600 font-medium">
                Payment Method Configured
              </span>
            ) : (
              <Link
                to={"/org/create-suborganization"}
                state={{
                  goToStep: 1,
                  subOrganization: row.original.id,
                }}
                className="flex justify-center items-center py-1 px-5 min-w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
              >
                Configure Method
              </Link>
            )}
          </div>
        );
      },
    },
  ];
}
