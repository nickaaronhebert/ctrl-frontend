import {
  organizationOrderColumns,
  type Order,
} from "@/components/data-table/columns/order";
import { DataTable } from "@/components/data-table/data-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

export const data: Order[] = [
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
export default function OrganizationOrder() {
  const columns = useMemo(() => organizationOrderColumns(), []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <DataTable table={table} className="rounded-md" />
    </div>
  );
}
