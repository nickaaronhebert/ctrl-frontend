import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ConnectedOrganization from "./Active";
import PendingOrganization from "./Request";
import RejectedOrganization from "@/components/common/RejectedOrganization/RejectedOrganization";

export default function PharmacyOrganizationStatus() {
  const [activeStatus, setActiveStatus] = useState<
    "Active" | "Requested" | "Rejected"
  >("Active");

  return (
    <div className="p-5">
      <div>
        <div>
          <div className="flex gap-1.5 items-center">
            <h6 className="text-2xl font-semibold">Settings</h6>
            <ArrowRight />
            <h6 className="text-2xl font-semibold">Organizations</h6>
          </div>
          <p className="text-sm font-normal text-[#3E4D61]">
            Review requests and manage connected organizations
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 my-2">
        <Button
          size={"xxl"}
          variant={"tabs"}
          className={cn(
            activeStatus === "Active"
              ? "bg-primary text-white"
              : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
            "p-[30px]"
          )}
          onClick={() => setActiveStatus("Active")}
        >
          <span className=" font-medium text-base mx-2.5">
            Active Organizations
          </span>
        </Button>

        <Button
          size={"xxl"}
          variant={"tabs"}
          className={cn(
            activeStatus === "Requested"
              ? "bg-primary text-white"
              : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
            "p-[30px]"
          )}
          onClick={() => setActiveStatus("Requested")}
        >
          <span className=" font-medium text-base mx-2.5">Request Status</span>
        </Button>

        <Button
          size={"xxl"}
          variant={"tabs"}
          className={cn(
            activeStatus === "Rejected"
              ? "bg-primary text-white"
              : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
            "p-[30px]"
          )}
          onClick={() => setActiveStatus("Rejected")}
        >
          <span className=" font-medium text-base mx-2.5">
            Rejected Organizations
          </span>
        </Button>
      </div>
      <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] px-3.5">
        {activeStatus === "Active" ? (
          <ConnectedOrganization />
        ) : activeStatus === "Requested" ? (
          <PendingOrganization />
        ) : (
          <RejectedOrganization />
        )}
      </div>
    </div>
  );
}
