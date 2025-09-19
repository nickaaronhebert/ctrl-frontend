import type { PatientDetails } from "@/types/responses/patient";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function organizationPatientColumns(): ColumnDef<PatientDetails>[] {
  return [
    {
      accessorKey: "firstName", // just for sorting/filtering on firstName
      header: "Patient",
      cell: ({ row }) => {
        const { firstName, lastName, patientId } = row.original; // 👈 no accessor needed
        return (
          <>
            <p className="text-sm font-medium">
              {`${firstName} ${lastName ?? ""}`}
            </p>
            <p className="text-[10px] font-medium text-[#3E4D61]">
              {patientId}
            </p>
          </>
        );
      },
    },

    {
      accessorKey: "gender",
      header: "Demographics",

      cell: ({ row }) => {
        const { gender, createdAt } = row.original;
        const formattedDate = new Date(createdAt).toLocaleDateString("en-US");
        return (
          <p className="text-xs font-medium">{`${gender}, ${formattedDate}`}</p>
        );
      },
    },

    {
      accessorKey: "email",
      header: "Contact Information",

      cell: ({ row }) => {
        const { email, phoneNumber, addresses } = row.original;
        const defaultAddress = addresses.filter(
          (address) => address.isDefault === true
        )?.[0];

        return (
          <>
            <p className="text-xs font-medium">{email}</p>
            <p className="text-xs font-medium py-0.5">{phoneNumber}</p>
            <p className="text-[10px] font-medium text-[#3E4D61] ">{`${
              defaultAddress?.address1 || ""
            } ${defaultAddress?.address2 || ""}`}</p>
          </>
        );
      },
    },

    {
      accessorKey: "height",
      header: "Medical Info",

      cell: ({ row }) => {
        const { height, weight } = row.original;

        return (
          <>
            <p className="text-xs font-medium">{`Height: ${height} (inches)`}</p>
            <p className="text-xs font-medium py-0.5">{`Weight: ${weight} (pounds)`}</p>
          </>
        );
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/patient/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
