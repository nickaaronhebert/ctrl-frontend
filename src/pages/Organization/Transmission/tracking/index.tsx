import StatusCard from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { cn, labels } from "@/lib/utils";
import { useCallback, useState } from "react";
import TrackedTransmissions from "./tracked-transmission";
import PendingTransmissions from "./pending-transmission";
import TripleToggleSwitch from "@/components/common/TripleToggleSwitch";
import type { Period } from "@/types/global/commonTypes";
import CubeSVG from "@/assets/icons/Cube";
import Processed from "@/assets/icons/Processed";
import ShippingReady from "@/assets/icons/ShippingReady";
import Shipped from "@/assets/icons/Shipped";
import Delivered from "@/assets/icons/Delivered";

const TransmissionTracking = () => {
  const [_, setSelectedPeriod] = useState<Period>(labels.left.value! as Period);
  const [activeStatus, setActiveStatus] = useState<"tracked" | "pending">(
    "tracked"
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
  return (
    <>
      <div className="mb-5 bg-background">
        <div className="flex justify-between items-start py-3 px-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[24px] leading-[30px] text-[#000000]">
              Fulfillment Tracking
            </h1>
            <p className="font-normal text-[14px] leading-[18px] text-[#3E4D61]">
              Monitor pharmacy actions and fulfillment progress on transmitted
              orders
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <span>Time Period:</span>
            <TripleToggleSwitch labels={labels} onChange={onChange} />
          </div>
        </div>
        <div className="flex gap-2.5 my-2 px-4">
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "tracked"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("tracked")}
          >
            <span className="font-medium text-base mx-2.5">Being Tracked</span>
          </Button>

          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "pending"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("pending")}
          >
            Pending Action
          </Button>
        </div>
        {activeStatus === "tracked" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mx-4 mb-4">
            <StatusCard
              title="Total"
              value={12}
              description={
                <>
                  <span className="text-[#5456AD] font-normal text-[12px] leading-[12px]">
                    Today
                  </span>
                </>
              }
              icon={CubeSVG}
              iconWrapperClassName="p-2 bg-[#F0F1FF] rounded-lg flex items-center justify-center"
            />
            <StatusCard
              title="Processed"
              value={2}
              description={
                <>
                  <span className="text-[#A133B4] font-normal text-[12px] leading-[12px]">
                    Pharmacy filling
                  </span>
                </>
              }
              icon={Processed}
            />
            <StatusCard
              title="Ready to Ship"
              value={3}
              description={
                <>
                  <span className="text-[#FF9800] font-normal text-[12px] leading-[12px]">
                    Shipped
                  </span>
                </>
              }
              icon={ShippingReady}
            />
            <StatusCard
              title="Shipped"
              value={3}
              description={
                <>
                  <span className="text-[#1C99E7] font-normal text-[12px] leading-[12px]">
                    In Transit
                  </span>
                </>
              }
              icon={Shipped}
            />
            <StatusCard
              title="Delivered"
              value={4}
              description={
                <>
                  <span className="text-[#00B87C] font-normal text-[12px] leading-[12px]">
                    Completed
                  </span>
                </>
              }
              icon={Delivered}
            />
          </div>
        )}
        <div className="px-4">
          <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] p-3.5">
            {activeStatus === "tracked" ? (
              <TrackedTransmissions />
            ) : (
              <PendingTransmissions />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransmissionTracking;
