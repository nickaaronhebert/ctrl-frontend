import {
  organizationTransmissionColumns,
  type Transmission,
} from "@/components/data-table/columns/transmission";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const transmissionData: Transmission[] = [
  {
    id: "728ed52f",
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    amount: "240",
    status: "transmitted",
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
    id: "91af44c1",
    provider: { name: "Dr. Emily Stone", npi: "4567891230" },
    pharmacy: { name: "HealthPlus", id: "PH_0002" },
    amount: "180",
    status: "transmitted",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ba73d191",
    provider: { name: "Dr. Alan Grant", npi: "9988776655" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    amount: "320",
    status: "transmitted",
    medication: [
      {
        name: "Metformin 500mg",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "3cfc21b5",
    provider: { name: "Dr. Rachel Green", npi: "3216549870" },
    pharmacy: { name: "PharmaDirect", id: "PH_0004" },
    amount: "400",
    status: "transmitted",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "20",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ee77f3d9",
    provider: { name: "Dr. Kevin Hart", npi: "1122112211" },
    pharmacy: { name: "MediQuick", id: "PH_0005" },
    amount: "290",
    status: "transmitted",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "30",
        quantityType: "capsule",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "f44bb298",
    provider: { name: "Dr. Lisa Monroe", npi: "4455667788" },
    pharmacy: { name: "ExpressRx", id: "PH_0006" },
    amount: "150",
    status: "transmitted",
    medication: [
      {
        name: "Multivitamin Tablets",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "6d9a9f1e",
    provider: { name: "Dr. Olivia Ray", npi: "7788990011" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0007" },
    amount: "360",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
];

const queuedData: Transmission[] = [
  {
    id: "728ed52f",
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    amount: "240",
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
    id: "91af44c1",
    provider: { name: "Dr. Emily Stone", npi: "4567891230" },
    pharmacy: { name: "HealthPlus", id: "PH_0002" },
    amount: "180",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ba73d191",
    provider: { name: "Dr. Alan Grant", npi: "9988776655" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    amount: "320",
    status: "queued",
    medication: [
      {
        name: "Metformin 500mg",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "3cfc21b5",
    provider: { name: "Dr. Rachel Green", npi: "3216549870" },
    pharmacy: { name: "PharmaDirect", id: "PH_0004" },
    amount: "400",
    status: "queued",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "20",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ee77f3d9",
    provider: { name: "Dr. Kevin Hart", npi: "1122112211" },
    pharmacy: { name: "MediQuick", id: "PH_0005" },
    amount: "290",
    status: "queued",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "30",
        quantityType: "capsule",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "f44bb298",
    provider: { name: "Dr. Lisa Monroe", npi: "4455667788" },
    pharmacy: { name: "ExpressRx", id: "PH_0006" },
    amount: "150",
    status: "queued",
    medication: [
      {
        name: "Multivitamin Tablets",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "6d9a9f1e",
    provider: { name: "Dr. Olivia Ray", npi: "7788990011" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0007" },
    amount: "360",
    status: "queued",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
];

const pendingData: Transmission[] = [
  {
    id: "728ed52f",
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    amount: "240",
    status: "pending",
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
    id: "91af44c1",
    provider: { name: "Dr. Emily Stone", npi: "4567891230" },
    pharmacy: { name: "HealthPlus", id: "PH_0002" },
    amount: "180",
    status: "pending",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ba73d191",
    provider: { name: "Dr. Alan Grant", npi: "9988776655" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    amount: "320",
    status: "pending",
    medication: [
      {
        name: "Metformin 500mg",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "3cfc21b5",
    provider: { name: "Dr. Rachel Green", npi: "3216549870" },
    pharmacy: { name: "PharmaDirect", id: "PH_0004" },
    amount: "400",
    status: "pending",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "20",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ee77f3d9",
    provider: { name: "Dr. Kevin Hart", npi: "1122112211" },
    pharmacy: { name: "MediQuick", id: "PH_0005" },
    amount: "290",
    status: "pending",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "30",
        quantityType: "capsule",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "f44bb298",
    provider: { name: "Dr. Lisa Monroe", npi: "4455667788" },
    pharmacy: { name: "ExpressRx", id: "PH_0006" },
    amount: "150",
    status: "pending",
    medication: [
      {
        name: "Multivitamin Tablets",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "6d9a9f1e",
    provider: { name: "Dr. Olivia Ray", npi: "7788990011" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0007" },
    amount: "360",
    status: "pending",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
];

const failedData: Transmission[] = [
  {
    id: "728ed52f",
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    amount: "240",
    status: "failed",
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
    id: "91af44c1",
    provider: { name: "Dr. Emily Stone", npi: "4567891230" },
    pharmacy: { name: "HealthPlus", id: "PH_0002" },
    amount: "180",
    status: "failed",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ba73d191",
    provider: { name: "Dr. Alan Grant", npi: "9988776655" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    amount: "320",
    status: "failed",
    medication: [
      {
        name: "Metformin 500mg",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "3cfc21b5",
    provider: { name: "Dr. Rachel Green", npi: "3216549870" },
    pharmacy: { name: "PharmaDirect", id: "PH_0004" },
    amount: "400",
    status: "failed",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "20",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "ee77f3d9",
    provider: { name: "Dr. Kevin Hart", npi: "1122112211" },
    pharmacy: { name: "MediQuick", id: "PH_0005" },
    amount: "290",
    status: "failed",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "30",
        quantityType: "capsule",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "f44bb298",
    provider: { name: "Dr. Lisa Monroe", npi: "4455667788" },
    pharmacy: { name: "ExpressRx", id: "PH_0006" },
    amount: "150",
    status: "failed",
    medication: [
      {
        name: "Multivitamin Tablets",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "6d9a9f1e",
    provider: { name: "Dr. Olivia Ray", npi: "7788990011" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0007" },
    amount: "360",
    status: "failed",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
];

export default function OrganizationTransmission() {
  const [activeStatus, setActiveStatus] = useState<
    "transmitted" | "queued" | "pending" | "failed"
  >("transmitted");
  const columns = useMemo(() => organizationTransmissionColumns(), []);
  const data =
    activeStatus === "transmitted"
      ? transmissionData
      : activeStatus === "queued"
      ? queuedData
      : activeStatus === "pending"
      ? pendingData
      : failedData;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log("Active Status:", activeStatus);
  return (
    <div className=" lg:p-3.5">
      <h1 className="text-2xl font-bold">Transmissions</h1>
      <h6 className="font-normal text-sm text text-slate">
        Recent transmission volume and statistics
      </h6>
      <div className="mt-3.5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "transmitted"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("transmitted")}
          >
            <span className=" font-medium text-base mx-2.5">Transmitted</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white mr-2.5 text-secondary-foreground">
              42
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "queued"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("queued")}
          >
            <span className=" font-medium text-base mx-2.5">Queued</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              42
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "pending"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("pending")}
          >
            <span className=" font-medium text-base mx-2.5">Pending</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              22
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "failed"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("failed")}
          >
            <span className=" font-medium text-base mx-2.5">Failed</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              50
            </span>
          </Button>
        </div>
        <div className="p-5 bg-white">
          <DataTable table={table} />
        </div>
      </div>
      {/* Add your components and logic here */}
    </div>
  );
}
