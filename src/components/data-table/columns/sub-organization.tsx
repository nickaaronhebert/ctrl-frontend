import { Badge } from "@/components/ui/badge";
import type { SubOrganization } from "@/types/responses/IGetAllSuborganization";
import type { ColumnDef } from "@tanstack/react-table";

export function ctrlSubOrganizationColumns(): ColumnDef<SubOrganization>[] {
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

    // {
    //   accessorKey: "phoneNumber",
    //   header: "Phone Number",
    //   cell: ({ row }) => {
    //     const { phoneNumber } = row.original;
    //     return <p className="text-sm font-medium">{phoneNumber}</p>;
    //   },
    // },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return <Badge variant={"outline"}>{status}</Badge>;
      },
    },

    // {
    //   accessorKey: "id",
    //   header: "Action",
    //   cell: ({ row }) => {
    //     return (
    //       <Link
    //         to={`/org/patient/${row.getValue("id")}`}
    //         className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
    //       >
    //         View
    //       </Link>
    //     );
    //   },
    // },
  ];
}
