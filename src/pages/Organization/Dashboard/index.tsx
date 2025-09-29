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
import { useOrganizationStatsQuery } from "@/redux/services/admin";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const OrganisationDashboard = () => {
  const { data: orgStats, isLoading } = useOrganizationStatsQuery({});
  const { user } = useAuthentication();

  const transmissionStats = orgStats?.data?.transmissionsStats || [];

  console.log("Org stats", orgStats);

  const statusCounts = {
    transmitted: transmissionStats?.find((s: any) => s.status === "Transmitted")
      ?.count,
    queued:
      transmissionStats.find((s: any) => s.status === "Queued")?.count || 0,
    created:
      transmissionStats.find((s: any) => s.status === "Created")?.count || 0,
    failed:
      transmissionStats.find((s: any) => s.status === "Failed")?.count || 0,
  };

  const labels = {
    left: {
      title: "Day",
      value: "day",
    },
    right: {
      title: "Month",
      value: "month",
    },
    center: {
      title: "Week",
      value: "week",
    },
  };

  type Period = "day" | "week" | "month";

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

  const columns = useMemo(() => recentTransmissionColumns(), []);

  const { table } = useDataTable({
    data: orgStats?.data?.last5transmissions || [],
    columns,
    pageCount: -1,
  });

  const pharmaciesData =
    orgStats?.data?.performantPharmacies?.map((p: any) => {
      const segments = p.statusCounts.map((s: any) => ({
        value: s.count,
        color:
          s.status === "Transmitted"
            ? "transmitted"
            : s.status === "Queued"
            ? "queued"
            : s.status === "Created"
            ? "pending"
            : "failed",
        label: s.status,
      }));
      const values = p.statusCounts.map((s: any) => `${s.status}: ${s.count}`);

      return {
        id: p.pharmacy.id,
        name: p.pharmacy.name,
        icon: "🏥",
        stats: {
          total: p.totalCount,
          segments,
          values,
        },
      };
    }) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  console.log("selectedPeriod:: ", selectedPeriod);

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
            title="Created"
            value={statusCounts?.created}
            description={
              <>
                <span className="text-pending">Created</span>{" "}
                {/* <span className="text-gray-500">Attention</span> */}
              </>
            }
            icon={Pending}
          />

          <StatusCard
            title="Queued"
            value={statusCounts.queued}
            description={
              <>
                <span className="text-queued">Waiting</span>{" "}
                <span className="text-gray-500">for processing</span>
              </>
            }
            icon={Queued}
          />

          <StatusCard
            title="Transmitted"
            value={statusCounts?.transmitted}
            description={
              <>
                <span className="text-green-600">Successfully</span>{" "}
                <span className="text-gray-500">delivered</span>
              </>
            }
            icon={Transmitted}
          />

          <StatusCard
            title="Failed"
            value={statusCounts?.failed}
            description={
              <>
                <span className="text-red-600">Failed</span>{" "}
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
            <PharmacyPerformance data={pharmaciesData} />
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
