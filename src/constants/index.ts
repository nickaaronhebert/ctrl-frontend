import User from "@/assets/icons/User";
import Licence from "@/assets/icons/Licence";
import Affiliation from "@/assets/icons/Affiliation";
import Dashboard from "@/assets/icons/Dashboard";
import Transmission from "@/assets/icons/Transmission";
import Orders from "@/assets/icons/Orders";
import Transactions from "@/assets/icons/Transactions";
import SettingsMain from "@/assets/icons/SettingsMain";
import type { Transmission as MyTransmission } from "@/components/data-table/columns/recentTransmissions";
import type { IconSVG } from "@/types/global/icon";
import type { InvoiceRow } from "@/types/global/commonTypes";
import type { Pharmacy } from "@/components/data-table/columns/medication-library";
import InvoicesMain from "@/assets/icons/InvoicesMain";
import PatientIcon from "@/assets/icons/PatientIcon";

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<IconSVG>;
}

export const tabsConfig: TabConfig[] = [
  { id: "personal", label: "Personal Details", icon: User },
  { id: "medical", label: "Medical License", icon: Licence },
  { id: "affiliation", label: "Affiliation Status", icon: Affiliation },
] as const;

export const organisationAdminItems = [
  { title: "Dashboard", url: "/org/dashboard", icon: Dashboard },
  { title: "Orders", url: "/org/orders", icon: Orders },
  { title: "Transmissions", url: "/org/transmissions", icon: Transmission },
  { title: "Transactions", url: "/org/transactions", icon: Transactions },
  { title: "Patients", url: "/org/patients", icon: PatientIcon },
  // { title: "Providers", url: "/org/providers", icon: Provider },
  { title: "Settings", url: "/org/settings", icon: SettingsMain },
  // {
  //   title: "Medication Library",
  //   url: "/org/medications",
  //   icon: MedicationLibrary,
  // },
  // {
  //   title: "Pharmacies",
  //   url: "/org/pharmacies",
  //   icon: MedicationLibrary,
  // },
  // { title: "Activity Log", url: "/org/activity-log", icon: ActivityLog },
  // { title: "Settings", url: "/org/settings", icon: SettingsMain },
  // {
  //   title: "Pharmacy Assignment",
  //   url: "/org/access-control",
  //   icon: SettingsMain,
  // },
];

// export const sidebarIcons = [
//   { title: "Dashboard", url: "/org/dashboard", icon: Dashboard },
//   { title: "Transmissions", url: "/org/transmissions", icon: Transmission },
//   { title: "Orders", url: "/org/orders", icon: Orders },
//   { title: "Providers", url: "/org/providers", icon: Provider },
//   { title: "Patients", url: "/org/patients", icon: PatientIcon },
//   { title: "Transactions", url: "/org/transactions", icon: Transactions },
//   {
//     title: "Medication Library",
//     url: "/org/medications",
//     icon: MedicationLibrary,
//   },
//   {
//     title: "Pharmacies",
//     url: "/org/pharmacies",
//     icon: MedicationLibrary,
//   },
//   { title: "Activity Log", url: "/org/activity-log", icon: ActivityLog },
//   { title: "Settings", url: "/org/settings", icon: SettingsMain },
//   {
//     title: "Pharmacy Assignment",
//     url: "/org/access-control",
//     icon: SettingsMain,
//   },
// ];

//// For future score /////
export const nestedOrgItems = [
  { title: "Providers", url: "/org/providers" },
  {
    title: "Pharmacies",
    url: "/org/pharmacies",
  },
  {
    title: "Medication Library",
    url: "/org/medications",
  },
  {
    title: "Pharmacy Assignment",
    url: "/org/access-control",
  },
  { title: "Activity Log", url: "/org/activity-log" },
  { title: "My Settings", url: "/org/settings" },
];

export const nestedPharmacyItems = [
  {
    title: "Medication Library",
    url: "/pharmacy/medications/view-catalogue",
  },
  { title: "Settings", url: "/pharmacy/settings" },
];

export const pharmacyAdminItems = [
  {
    title: "Transmissions",
    url: "/pharmacy/transmissions",
    icon: Transmission,
  },
  { title: "Invoices", url: "/pharmacy/invoices", icon: InvoicesMain },
  { title: "Settings", url: "/pharmacy/settings", icon: SettingsMain },
];

// static/sidebar.ts

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

export const dummyPharmacies: Pharmacy[] = [
  {
    id: "1",
    name: "CVS Pharmacy #1234",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    variants: [
      {
        strength: "2.5mg/mL",
        price: 199.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "5.0mg/mL",
        price: 380.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "7.5mg/mL",
        price: 465.0,
        container: "1 vial + Injection",
        stockStatus: "Limited",
      },
    ],
  },
  {
    id: "2",
    name: "Walgreens #5678",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Boston",
    state: "MA",
    zip: "02101",
    variants: [
      {
        strength: "2.5mg/mL",
        price: 199.0,
        container: "1 vial + Injection",
        stockStatus: "Limited",
      },
      {
        strength: "5.0mg/mL",
        price: 380.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
    ],
  },
  {
    id: "3",
    name: "Rite Aid #9012",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    variants: [
      {
        strength: "2.5mg/mL",
        price: 199.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "5.0mg/mL",
        price: 380.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "7.5mg/mL",
        price: 465.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
    ],
  },
  {
    id: "4",
    name: "Costco Pharmacy #456",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    variants: [
      {
        strength: "2.5mg/mL",
        price: 199.0,
        container: "1 vial + Injection",
        stockStatus: "Limited",
      },
      {
        strength: "5.0mg/mL",
        price: 380.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "7.5mg/mL",
        price: 465.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
    ],
  },
  {
    id: "5",
    name: "Independent Pharmacy #213",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    variants: [
      {
        strength: "5.0mg/mL",
        price: 380.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
      {
        strength: "7.5mg/mL",
        price: 465.0,
        container: "1 vial + Injection",
        stockStatus: "In Stock",
      },
    ],
  },
];

export const pharmacies = [
  { id: 1, name: "HealthPlus Pharmacy" },
  { id: 2, name: "WellCare Pharmacy" },
  { id: 3, name: "MediCare Drugstore" },
  { id: 4, name: "PharmaMax" },
  { id: 5, name: "Greenleaf Pharmacy" },
  { id: 6, name: "Pharma Central" },
  { id: 7, name: "City Health Pharmacy" },
  { id: 8, name: "Nature’s Pharmacy" },
  { id: 9, name: "QuickRx Pharmacy" },
  { id: 10, name: "Total Health Pharmacy" },
];

export const US_STATES = [
  { name: "Alabama", shortCode: "AL" },
  { name: "Alaska", shortCode: "AK" },
  { name: "Arizona", shortCode: "AZ" },
  { name: "Arkansas", shortCode: "AR" },
  { name: "California", shortCode: "CA" },
  { name: "Colorado", shortCode: "CO" },
  { name: "Connecticut", shortCode: "CT" },
  { name: "Delaware", shortCode: "DE" },
  { name: "Florida", shortCode: "FL" },
  { name: "Georgia", shortCode: "GA" },
  { name: "Hawaii", shortCode: "HI" },
  { name: "Idaho", shortCode: "ID" },
  { name: "Illinois", shortCode: "IL" },
  { name: "Indiana", shortCode: "IN" },
  { name: "Iowa", shortCode: "IA" },
  { name: "Kansas", shortCode: "KS" },
  { name: "Kentucky", shortCode: "KY" },
  { name: "Louisiana", shortCode: "LA" },
  { name: "Maine", shortCode: "ME" },
  { name: "Maryland", shortCode: "MD" },
  { name: "Massachusetts", shortCode: "MA" },
  { name: "Michigan", shortCode: "MI" },
  { name: "Minnesota", shortCode: "MN" },
  { name: "Mississippi", shortCode: "MS" },
  { name: "Missouri", shortCode: "MO" },
  { name: "Montana", shortCode: "MT" },
  { name: "Nebraska", shortCode: "NE" },
  { name: "Nevada", shortCode: "NV" },
  { name: "New Hampshire", shortCode: "NH" },
  { name: "New Jersey", shortCode: "NJ" },
  { name: "New Mexico", shortCode: "NM" },
  { name: "New York", shortCode: "NY" },
  { name: "North Carolina", shortCode: "NC" },
  { name: "North Dakota", shortCode: "ND" },
  { name: "Ohio", shortCode: "OH" },
  { name: "Oklahoma", shortCode: "OK" },
  { name: "Oregon", shortCode: "OR" },
  { name: "Pennsylvania", shortCode: "PA" },
  { name: "Rhode Island", shortCode: "RI" },
  { name: "South Carolina", shortCode: "SC" },
  { name: "South Dakota", shortCode: "SD" },
  { name: "Tennessee", shortCode: "TN" },
  { name: "Texas", shortCode: "TX" },
  { name: "Utah", shortCode: "UT" },
  { name: "Vermont", shortCode: "VT" },
  { name: "Virginia", shortCode: "VA" },
  { name: "Washington", shortCode: "WA" },
  { name: "West Virginia", shortCode: "WV" },
  { name: "Wisconsin", shortCode: "WI" },
  { name: "Wyoming", shortCode: "WY" },

  // Optional: Include District of Columbia
  { name: "District of Columbia", shortCode: "DC" },
];

export const USA_STATES = [
  { label: "Alabama", value: "Alabama" },
  { label: "Alaska", value: "Alaska" },
  { label: "Arizona", value: "Arizona" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "California", value: "California" },
  { label: "Colorado", value: "Colorado" },
  { label: "Connecticut", value: "Connecticut" },
  { label: "Delaware", value: "Delaware" },
  { label: "Florida", value: "Florida" },
  { label: "Georgia", value: "Georgia" },
  { label: "Hawaii", value: "Hawaii" },
  { label: "Idaho", value: "Idaho" },
  { label: "Illinois", value: "Illinois" },
  { label: "Indiana", value: "Indiana" },
  { label: "Iowa", value: "Iowa" },
  { label: "Kansas", value: "Kansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Louisiana", value: "Louisiana" },
  { label: "Maine", value: "Maine" },
  { label: "Maryland", value: "Maryland" },
  { label: "Massachusetts", value: "Massachusetts" },
  { label: "Michigan", value: "Michigan" },
  { label: "Minnesota", value: "Minnesota" },
  { label: "Mississippi", value: "Mississippi" },
  { label: "Missouri", value: "Missouri" },
  { label: "Montana", value: "Montana" },
  { label: "Nebraska", value: "Nebraska" },
  { label: "Nevada", value: "Nevada" },
  { label: "New Hampshire", value: "New Hampshire" },
  { label: "New Jersey", value: "New Jersey" },
  { label: "New Mexico", value: "New Mexico" },
  { label: "New York", value: "New York" },
  { label: "North Carolina", value: "North Carolina" },
  { label: "North Dakota", value: "North Dakota" },
  { label: "Ohio", value: "Ohio" },
  { label: "Oklahoma", value: "Oklahoma" },
  { label: "Oregon", value: "Oregon" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Rhode Island", value: "Rhode Island" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "South Dakota", value: "South Dakota" },
  { label: "Tennessee", value: "Tennessee" },
  { label: "Texas", value: "Texas" },
  { label: "Utah", value: "Utah" },
  { label: "Vermont", value: "Vermont" },
  { label: "Virginia", value: "Virginia" },
  { label: "Washington", value: "Washington" },
  { label: "West Virginia", value: "West Virginia" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "Wyoming", value: "Wyoming" },
];

export default US_STATES;

export const dummyInvoices: InvoiceRow[] = [
  {
    transmissionId: "TMS_001234",
    date: new Date("2025-08-28"),
    amount: 1350.0,
    affiliate: {
      firstName: "John",
      lastName: "Smith",
      id: "AFF001",
    },
  },
  {
    transmissionId: "TMS_001233",
    date: new Date("2025-08-26"),
    amount: 950.0,
    affiliate: {
      firstName: "Sarah",
      lastName: "Johnson",
      id: "AFF002",
    },
  },
  {
    transmissionId: "TMS_001237",
    date: new Date("2025-08-14"),
    amount: 2200.0,
    affiliate: {
      firstName: "Daniel",
      lastName: "Kim",
      id: "AFF003",
    },
  },
  {
    transmissionId: "TMS_001239",
    date: new Date("2025-08-10"),
    amount: 450.0,
    affiliate: {
      firstName: "Michael",
      lastName: "Lee",
      id: "AFF004",
    },
  },
  {
    transmissionId: "TMS_001223",
    date: new Date("2025-08-05"),
    amount: 3000.0,
    affiliate: {
      firstName: "David",
      lastName: "Martinez",
      id: "AFF005",
    },
  },
  {
    transmissionId: "TMS_001221",
    date: new Date("2025-08-01"),
    amount: 800.0,
    affiliate: {
      firstName: "Emily",
      lastName: "Brown",
      id: "AFF006",
    },
  },
  {
    transmissionId: "TMS_001219",
    date: new Date("2025-07-28"),
    amount: 1250.0,
    affiliate: {
      firstName: "Olivia",
      lastName: "Wilson",
      id: "AFF007",
    },
  },
];
