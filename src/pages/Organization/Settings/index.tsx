import { cn } from "@/lib/utils";
import { useState } from "react";
import OrgStripeAccount from "./StripeAccount";
import OrgAdminProfileSettings from "./Profile";
import OrgAdminPasswordSettings from "./ConfigurePassword";

const settingsMenu: {
  name: "Profile" | "Change Password" | "Payment Method";
}[] = [
  {
    name: "Profile",
  },
  {
    name: "Change Password",
  },
  {
    name: "Payment Method",
  },
];
export default function OrganizationSettings() {
  const [activeTab, setActiveTab] = useState<
    "Profile" | "Change Password" | "Payment Method"
  >("Profile");
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
      <div className="bg-white">
        {activeTab === "Profile" && <OrgAdminProfileSettings />}
        {activeTab === "Change Password" && <OrgAdminPasswordSettings />}
        {activeTab === "Payment Method" && <OrgStripeAccount />}
      </div>
    </div>
  );
}
