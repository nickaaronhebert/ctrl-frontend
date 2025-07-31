import Failed from "@/assets/icons/Failed";
import Pending from "@/assets/icons/Pending";
import Queued from "@/assets/icons/Queued";
import Transmitted from "@/assets/icons/Transmitted";
import { PharmacyPerformance } from "@/components/common/PharmacyPerformance";
import StatusCard from "@/components/common/StatusCard";
import TripleToggleSwitch from "@/components/common/TripleToggleSwitch";
import useAuthentication from "@/hooks/use-authentication";
import { useCallback, useState, useMemo } from "react";
import {
  recentTransmissionColumns,
  type Transmission,
} from "@/components/data-table/columns/recentTransmissions";
import { DataTable } from "@/components/data-table/data-table";
import { transmissionData } from "@/constants";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { statusCardData } from "@/constants";

const OrganisationDashboard = () => {
  const { user } = useAuthentication();
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

  type Period = "24h" | "7d" | "1m";
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(
    labels.left.value as Period
  );

  const onChange = useCallback((position: string) => {
    let selectedValue: Period = labels.left.value as Period;
    if (position === "left") {
      selectedValue = labels.left.value as Period;
    } else if (position === "center") {
      selectedValue = labels.center.value as Period;
    } else if (position === "right") {
      selectedValue = labels.right.value as Period;
    }
    setSelectedPeriod(selectedValue);
  }, []);

  console.log("Selected Period:", selectedPeriod);

  const columns = useMemo(() => recentTransmissionColumns(), []);

  const table = useReactTable<Transmission>({
    data: transmissionData[selectedPeriod],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentStatus = statusCardData[selectedPeriod];
  console.log("currentStatus:", currentStatus);

  return (
    <>
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
            value={currentStatus.transmitted}
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
            value={currentStatus.queued}
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
            value={currentStatus.pending}
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
            value={currentStatus.failed}
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
            <div className="w-full bg-white p-5 rounded-lg shadow-sm">
              <DataTable table={table} className="p-5 bg-white" />
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-semibold text-dashboard-title mb-6">
              Pharmacy Performance
            </h2>
            <PharmacyPerformance selectedPeriod={selectedPeriod} />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-right">
        © 2025 CTRL. All Rights Reserved. Made with love by
        <span className="font-bold "> Telegra!</span>
      </p>
    </>
  );
};

export default OrganisationDashboard;
