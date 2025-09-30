import { Badge } from "@/components/ui/badge";
import type { CtrlPharmacy } from "@/types/responses/IViewAllPharmacies";
import type { ColumnDef } from "@tanstack/react-table";

export function ctrlPharmacyColumns(): ColumnDef<CtrlPharmacy>[] {
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
      accessorKey: "stripeAccountId",
      header: "Stripe Account ID",

      cell: ({ row }) => {
        const { stripeAccountId } = row.original;
        return (
          <p
            className={`text-sm ${
              stripeAccountId
                ? "text-primary font-semibold underline underline-offset-4"
                : " font-normal"
            }`}
          >
            {stripeAccountId ?? "Payouts Not Configured"}
          </p>
        );
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

    // {
    //   accessorKey: "gender",
    //   header: "Demographics",

    //   cell: ({ row }) => {
    //     const { gender, createdAt } = row.original;
    //     const formattedDate = new Date(createdAt).toLocaleDateString("en-US");
    //     return (
    //       <p className="text-xs font-medium">{`${gender}, ${formattedDate}`}</p>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "email",
    //   header: "Contact Information",

    //   cell: ({ row }) => {
    //     const { email, phoneNumber, addresses } = row.original;
    //     const defaultAddress = addresses.filter(
    //       (address) => address.isDefault === true
    //     )?.[0];

    //     return (
    //       <>
    //         <p className="text-xs font-medium">{email}</p>
    //         <p className="text-xs font-medium py-0.5">{phoneNumber}</p>
    //         <p className="text-[10px] font-medium text-[#3E4D61] ">{`${
    //           defaultAddress?.address1 || ""
    //         } ${defaultAddress?.address2 || ""}`}</p>
    //       </>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "height",
    //   header: "Medical Info",

    //   cell: ({ row }) => {
    //     const { height, weight } = row.original;

    //     return (
    //       <>
    //         <p className="text-xs font-medium">{`Height: ${height} (inches)`}</p>
    //         <p className="text-xs font-medium py-0.5">{`Weight: ${weight} (pounds)`}</p>
    //       </>
    //     );
    //   },
    // },

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
