import Failed from "@/assets/icons/Failed";
import Pending from "@/assets/icons/Pending";
import Queued from "@/assets/icons/Queued";
import Transmitted from "@/assets/icons/Transmitted";
import { PharmacyPerformance } from "@/components/common/PharmacyPerformance";
import StatusCard from "@/components/common/StatusCard";
import TripleToggleSwitch from "@/components/common/TripleToggleSwitch";
import useAuthentication from "@/hooks/use-authentication";
import { useCallback, useState, useMemo } from "react";
import { recentTransmissionColumns } from "@/components/data-table/columns/recentTransmissions";
import { DataTable } from "@/components/data-table/data-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const OrganisationDashboard = () => {
  const labels = {
    left: {
      title: "24h",
      value: "24h",
    },
    right: {
      title: "7d",
      value: "7d",
    },
    center: {
      title: "1m",
      value: "1m",
    },
  };

  const transmissionData = [
    {
      id: "a1b2c3d4",
      provider: { name: "Dr. Adams", npi: "9876543210" },
      pharmacy: { name: "Pharmacy B", id: "PH_0002" },
      amount: "180",
      status: "queued",
      medication: [
        {
          name: "Metformin 500mg",
          quantity: "60",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "e5f6g7h8",
      provider: { name: "Dr. Blake", npi: "1122334455" },
      pharmacy: { name: "Pharmacy C", id: "PH_0003" },
      amount: "95",
      status: "queued",
      medication: [
        {
          name: "Lisinopril 10mg",
          quantity: "30",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "i9j0k1l2",
      provider: { name: "Dr. Chen", npi: "2233445566" },
      pharmacy: { name: "Pharmacy D", id: "PH_0004" },
      amount: "75",
      status: "queued",
      medication: [
        {
          name: "Atorvastatin 20mg",
          quantity: "90",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "m3n4o5p6",
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
      id: "q7r8s9t0",
      provider: { name: "Dr. Patel", npi: "3344556677" },
      pharmacy: { name: "Pharmacy E", id: "PH_0005" },
      amount: "210",
      status: "transmitted",
      medication: [
        {
          name: "Semaglutide 1mg/mL",
          quantity: "4",
          quantityType: "pen",
          injectible: "injectable",
        },
      ],
    },
  ];

  const { user } = useAuthentication();
  const [selectedPeriod, setSelectedPeriod] = useState(labels.left.value);

  const onChange = useCallback((position: string) => {
    let selectedValue = "";
    if (position === "left") {
      selectedValue = labels.left.value;
    } else if (position === "center") {
      selectedValue = labels.center.value;
    } else if (position === "right") {
      selectedValue = labels.right.value;
    }
    setSelectedPeriod(selectedValue);
  }, []);

  const columns = useMemo(() => recentTransmissionColumns(), []);

  const table = useReactTable({
    data: transmissionData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="h-screen bg-background">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-[26px] leading-[30px] text-black">
          Back in your zone, {user?.firstName}!
        </h1>

        <div className="flex gap-2 items-center">
          <span>Time Period:</span>
          <TripleToggleSwitch labels={labels} onChange={onChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        <StatusCard
          title="Transmitted"
          value={31}
          description={
            <>
              <span className="text-green-600">Successfully</span>{" "}
              <span className="text-gray-500">delivered</span>
            </>
          }
          icon={Transmitted}
        />

        <StatusCard
          title="Queued"
          value={17}
          description={
            <>
              <span className="text-queued">Waiting</span>{" "}
              <span className="text-gray-500">for processing</span>
            </>
          }
          icon={Queued}
        />

        <StatusCard
          title="Pending"
          value={10}
          description={
            <>
              <span className="text-pending">Awaiting</span>{" "}
              <span className="text-gray-500">Manual Review</span>
            </>
          }
          icon={Pending}
        />
        <StatusCard
          title="Failed"
          value={5}
          description={
            <>
              <span className="text-failed">Requires</span>{" "}
              <span className="text-gray-500">Attention</span>
            </>
          }
          icon={Failed}
        />
      </div>

      {/* Pharmacy Layout  */}
      <div className="mt-10 flex gap-10">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-dashboard-title mb-6">
            Recent Transmissions
          </h2>
          <DataTable table={table} className="p-5 bg-white" />
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-dashboard-title mb-6">
            Pharmacy Performance
          </h2>
          <PharmacyPerformance />
        </div>
      </div>
    </div>
  );
};

export default OrganisationDashboard;
