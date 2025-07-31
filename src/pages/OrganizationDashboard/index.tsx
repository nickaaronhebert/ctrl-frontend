import Failed from "@/assets/icons/Failed";
import Pending from "@/assets/icons/Pending";
import Queued from "@/assets/icons/Queued";
import Transmitted from "@/assets/icons/Transmitted";
import StatusCard from "@/components/common/StatusCard";
import TripleToggleSwitch from "@/components/common/TripleToggleSwitch";
import useAuthentication from "@/hooks/use-authentication";
import { useCallback, useState } from "react";

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

  console.log("Selected Time Period:", selectedPeriod);

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
    </div>
  );
};

export default OrganisationDashboard;
