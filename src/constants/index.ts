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
import type { Transmission as MyTransmission } from "@/components/data-table/columns/recentTransmissions";
import type { Medication } from "@/components/data-table/columns/medication-library";

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const tabsConfig: TabConfig[] = [
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

export const transmissionData: {
  "24h": MyTransmission[];
  "7d": MyTransmission[];
  "1m": MyTransmission[];
} = {
  "24h": [
    {
      id: "a1b2c3d4",
      pharmacy: { name: "Pharmacy B", id: "PH_0002" },
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
      pharmacy: { name: "Pharmacy C", id: "PH_0003" },
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
      pharmacy: { name: "Pharmacy A", id: "PH_0001" },
      status: "queued",
      medication: [
        {
          name: "Simvastatin 20mg",
          quantity: "90",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "m3n4o5p6",
      pharmacy: { name: "Pharmacy D", id: "PH_0004" },
      status: "queued",
      medication: [
        {
          name: "Amlodipine 5mg",
          quantity: "60",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "q7r8s9t0",
      pharmacy: { name: "Pharmacy E", id: "PH_0005" },
      status: "transmitted",
      medication: [
        {
          name: "Atorvastatin 10mg",
          quantity: "30",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
  ],
  "7d": [
    {
      id: "a2b3c4d5",
      pharmacy: { name: "Pharmacy F", id: "PH_0006" },
      status: "transmitted",
      medication: [
        {
          name: "Omeprazole 20mg",
          quantity: "30",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
    {
      id: "b4c5d6e7",
      pharmacy: { name: "Pharmacy G", id: "PH_0007" },
      status: "queued",
      medication: [
        {
          name: "Amlodipine 10mg",
          quantity: "60",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
  ],
  "1m": [
    {
      id: "d1e2f3g4",
      pharmacy: { name: "Pharmacy H", id: "PH_0008" },
      status: "queued",
      medication: [
        {
          name: "Levothyroxine 50mcg",
          quantity: "90",
          quantityType: "tablet",
          injectible: "oral",
        },
      ],
    },
  ],
};

export const statusCardData = {
  "24h": {
    transmitted: 31,
    queued: 17,
    pending: 10,
    failed: 5,
  },
  "7d": {
    transmitted: 210,
    queued: 80,
    pending: 32,
    failed: 18,
  },
  "1m": {
    transmitted: 900,
    queued: 320,
    pending: 120,
    failed: 60,
  },
};

export const dummyMedicationData: Medication[] = [
  {
    id: "1",
    drugName: "Liraglutide",
    variants: ["2.5mg/mL", "5.0mg/mL", "7.5mg/mL"],
    category: "Type 2 Diabetes",
    availablePharmacies: 5,
  },
  {
    id: "2",
    drugName: "Semaglutide",
    variants: ["2.5mg/mL", "5.0mg/mL"],
    category: "Weight Management",
    availablePharmacies: 5,
  },
  {
    id: "3",
    drugName: "Metformin",
    variants: ["5.0mg/mL", "7.5mg/mL"],
    category: "Type 2 Diabetes",
    availablePharmacies: 20,
  },
  {
    id: "4",
    drugName: "Dulaglutide",
    variants: ["7.5mg/mL"],
    category: "Type 2 Diabetes",
    availablePharmacies: 12,
  },
  {
    id: "5",
    drugName: "Canagliflozin",
    variants: ["2.5mg/mL", "5.0mg/mL"],
    category: "Type 2 Diabetes",
    availablePharmacies: 18,
  },
];
