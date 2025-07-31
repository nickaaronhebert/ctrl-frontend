import User from "@/assets/icons/User";
import Licence from "@/assets/icons/Licence";
import Affiliation from "@/assets/icons/Affiliation";
import Dashboard from "@/assets/icons/Dashboard";
import Transmission from "@/assets/icons/Transmission";
import Orders from "@/assets/icons/Orders";
import Provider from "@/assets/icons/Provider";
import Transactions from "@/assets/icons/Transactions";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import Pharmacies from "@/assets/icons/Pharmacies";
import ActivityLog from "@/assets/icons/ActivityLog";
import SettingsMain from "@/assets/icons/SettingsMain";

export const tabsConfig = [
  { id: "personal", label: "Personal Details", icon: User },
  { id: "medical", label: "Medical License", icon: Licence },
  { id: "affiliation", label: "Affiliation Status", icon: Affiliation },
] as const;

export const organisationAdminItems = [
  { title: "Dashboard", url: "/org/dashboard", icon: Dashboard },
  { title: "Transmissions", url: "/org/transmissions", icon: Transmission },
  { title: "Orders", url: "/org/orders", icon: Orders },
  { title: "Providers", url: "/org/providers", icon: Provider },
  { title: "Transactions", url: "/org/transactions", icon: Transactions },
  {
    title: "Medication Library",
    url: "/org/medications",
    icon: MedicationLibrary,
  },
  { title: "Pharmacies", url: "/org/pharmacies", icon: Pharmacies },
  { title: "Activity Log", url: "/org/activity-log", icon: ActivityLog },
  { title: "Settings", url: "/org/settings", icon: SettingsMain },
];
