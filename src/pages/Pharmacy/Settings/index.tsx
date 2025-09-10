import { cn } from "@/lib/utils";
import { useState } from "react";
import SwitchForm from "./ServiceStates";
import PharmacyProfileSettings from "./Profile";
import Payout from "./Payouts";

const settingsMenu: {
  name: "General" | "Service States" | "Payouts";
}[] = [
  {
    name: "General",
  },
  {
    name: "Service States",
  },
  {
    name: "Payouts",
  },
];
export default function PharmacySettings() {
  const [activeTab, setActiveTab] = useState<
    "General" | "Service States" | "Payouts"
  >("General");
  return (
    <div className="p-5">
      <div>
        <h6 className="text-2xl font-semibold">My Settings</h6>
        <p className="text-sm font-normal text-[#3E4D61]">
          Manage profile, payment method and admin users
        </p>
      </div>

      <div className="flex gap-1.5 mt-4">
        {settingsMenu.map((item) => (
          <div
            key={item.name}
            className={cn(
              "w-[33.33%] rounded-tl-[10px] rounded-tr-[10px] py-3.5 px-4 cursor-pointer ",
              item.name === activeTab
                ? "bg-primary text-white"
                : "bg-[#BEC9D53D]"
            )}
            onClick={() => setActiveTab(item.name)}
          >
            <h6 className="text-lg font-medium text-center">{item.name}</h6>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-bl-2xl rounded-br-2xl">
        {activeTab === "General" && <PharmacyProfileSettings />}
        {activeTab === "Service States" && <SwitchForm />}
        {activeTab === "Payouts" && <Payout />}
      </div>
    </div>
  );
}
