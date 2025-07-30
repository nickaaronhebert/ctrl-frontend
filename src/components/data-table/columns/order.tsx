import FailedBadge from "@/components/TransmissionBadge/failed";
import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Medication = {
  name: string;
  quantity: string;
  quantityType: string;
  injectible: "oral" | "injectable";
};
export type Provider = {
  name: string;
  npi: string;
};

export type Pharmacy = {
  name: string;
  id: string;
};
export type Order = {
  id: string;
  patient: {
    name: string;
    id: string;
  };
  provider: Provider;
  pharmacy: Pharmacy;
  createdAt: string;
  status: "queued" | "transmitted" | "pending" | "failed";
  medication: Medication[];
  //   email: string
};

export const order: Order[] = [
  {
    id: "728ed52f",
    patient: {
      name: "John Doe",
      id: "PT_0001",
    },
    provider: {
      name: "Dr. Smith",
      npi: "1234567890",
    },
    pharmacy: {
      name: "Pharmacy A",
      id: "PH_0001",
    },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: {
      name: "Dave Smith",
      id: "PT_0002",
    },
    provider: {
      name: "Dr. Jane Doe",
      npi: "0987654321",
    },
    pharmacy: {
      name: "CVA Pharmacy",
      id: "PH_0002",
    },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },

      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
];

export function organizationOrderColumns(): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: "Order ID",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader
      //       column={column}
      //       title="Campaign Name"
      //       className="uppercase"
      //       //   className="min-w-[5rem]"
      //     />
      //   ),
      cell: ({ row }) => {
        return (
          //   <p className="max-w-[10rem] truncate font-medium">
          <p className="text-xs font-medium">{row.getValue("id")}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "medication",
      header: "Medication",
      cell: ({ row }) => {
        const medication: Medication[] = row.getValue("medication");

        const displayedMedications = medication.slice(0, 2);
        const remainingCount = medication.length - 2;

        const getTypeColor = (type: "oral" | "injectable") => {
          return type === "oral" ? "text-green-600" : "text-pink-600";
        };

        return (
          <div className=" max-w-sm">
            {displayedMedications.map((medication, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {medication.name}
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <span>
                    {medication.quantity} {medication.quantityType}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full mx-2 bg-[#63627F] `}
                  ></div>
                  <span
                    className={`capitalize ${getTypeColor(
                      medication.injectible
                    )}`}
                  >
                    {medication.injectible}
                  </span>
                </div>
              </div>
            ))}

            {remainingCount > 0 && (
              <div className="mt-3  ">
                <div className="text-blue-600 text-sm font-medium underline underline-offset-2">
                  +{remainingCount} medication{remainingCount > 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "patient",
      header: "Patient",
      cell: ({ row }) => {
        const patient: { name: string; id: string } = row.getValue("patient");
        return (
          <>
            <p className="text-xs font-medium">{patient.name}</p>
            <p className="text-[10px] font-medium">{patient.id}</p>
          </>
        );
      },
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => {
        const provider: Provider = row.getValue("provider");
        return (
          <>
            <p className="text-xs font-medium">{provider.name}</p>
            <p className="text-[10px] font-medium">{provider.npi}</p>
          </>
        );
      },
    },
    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const pharmacy: Pharmacy = row.getValue("pharmacy");
        return (
          <>
            <p className="text-xs font-medium">{pharmacy.name}</p>
            <p className="text-[10px] font-medium">{pharmacy.id}</p>
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        return (
          <>
            <p className="text-xs font-medium">{row.getValue("createdAt")}</p>
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const orderStatus = row.getValue("status");

        console.log("Order Status:", orderStatus);
        return (
          <>
            {orderStatus === "queued" ? (
              <QueuedBadge />
            ) : orderStatus === "transmitted" ? (
              <SuccessBadge />
            ) : orderStatus === "pending" ? (
              <PendingBadge />
            ) : orderStatus === "failed" ? (
              <FailedBadge />
            ) : null}
          </>
        );
        // switch (orderStatus) {
        //   case "queued":
        //     return <QueuedBadge />;
        //   case "transmitted":
        //     return <SuccessBadge />;
        //   case "pending":
        //     return <PendingBadge />;
        //   case "failed":
        //     return <FailedBadge />;
        //   default:
        //     return null;
        // }
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Link
            to={"#"}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
