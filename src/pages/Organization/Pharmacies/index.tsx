import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import ActiveOrgPharmaciesTransmission from "./Active";
import GlobalOrgPharmacies from "./Global";

export default function OrgPharmaciesTransmission() {
  const [activeStatus, setActiveStatus] = useState<"Active" | "Global">(
    "Active"
  );

  return (
    <div className="p-5">
      <div>
        <div>
          <div className="flex gap-1.5 items-center">
            <h6 className="text-2xl font-semibold">Settings</h6>
            <ArrowRight />
            <h6 className="text-2xl font-semibold">Pharmacies</h6>
          </div>
          <p className="text-sm font-normal text-[#3E4D61]">
            Manage pharmacy connections and monitor performance
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 mt-4">
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
            Active Pharmacies
          </span>
        </Button>

        <Button
          size={"xxl"}
          variant={"tabs"}
          className={cn(
            activeStatus === "Global"
              ? "bg-primary text-white"
              : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
            "p-[30px]"
          )}
          onClick={() => setActiveStatus("Global")}
        >
          <span className=" font-medium text-base mx-2.5">
            Global Pharmacies
          </span>
        </Button>
      </div>
      <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] px-3.5">
        {activeStatus === "Active" ? (
          <ActiveOrgPharmaciesTransmission />
        ) : (
          <GlobalOrgPharmacies />
        )}
      </div>
    </div>
  );
}
