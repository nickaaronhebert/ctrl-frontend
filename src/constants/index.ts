import User from "@/assets/icons/User";
import Licence from "@/assets/icons/Licence";
import Affiliation from "@/assets/icons/Affiliation";
import Dashboard from "@/assets/icons/Dashboard";
import Transmission from "@/assets/icons/Transmission";
import Orders from "@/assets/icons/Orders";
import Transactions from "@/assets/icons/Transactions";
import SettingsMain from "@/assets/icons/SettingsMain";
import type { IconSVG } from "@/types/global/icon";
import InvoicesMain from "@/assets/icons/InvoicesMain";
import PatientIcon from "@/assets/icons/PatientIcon";
import { Settings } from "lucide-react";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import Home from "@/assets/icons/Home";

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

export const platformAdminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Dashboard },
  { title: "Organization", url: "/admin/organizations", icon: Affiliation },
  { title: "Pharmacy", url: "/admin/pharmacies", icon: Licence },

  {
    title: "Medication",
    url: "/admin/medications",
    icon: MedicationLibrary,
  },
  {
    title: "Invitation",
    url: "/admin/invitations",
    icon: Transmission,
  },
];
export const organisationAdminItems = [
  { title: "Dashboard", url: "/org/dashboard", icon: Dashboard },
  { title: "Orders", url: "/org/orders", icon: Orders },
  { title: "Transmissions", url: "/org/transmissions", icon: Transmission },
  { title: "Invoices", url: "/org/transactions", icon: Transactions },
  { title: "Patients", url: "/org/patients", icon: PatientIcon },
  { title: "Sub-organizations", url: "/org/sub-orgs", icon: Home },
  // { title: "Providers", url: "/org/providers", icon: Provider },
  { title: "Settings", url: "/org/settings", icon: Settings },
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
  {
    title: "Organization",
    url: "/pharmacy/organizations",
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

export const mockStats = {
  totalOrganizations: 247,
  totalPharmacies: 189,
  pendingInvites: 23,
  activeUsers: 1456,
  monthlyGrowth: 12.5,
  systemUptime: 99.9,
};

export const recentInvites = [
  {
    id: 1,
    email: "admin@healthcorp.com",
    type: "Organization",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: 2,
    email: "manager@rxpharm.com",
    type: "Pharmacy",
    status: "Completed",
    date: "2024-01-14",
  },
  {
    id: 3,
    email: "director@medplus.com",
    type: "Organization",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: 4,
    email: "admin@quickrx.com",
    type: "Pharmacy",
    status: "Completed",
    date: "2024-01-13",
  },
];

export const quickActions = [
  {
    title: "Invite Organization",
    description: "Send invitation to new healthcare organization",
    action: "Send Invite",
    variant: "default" as const,
  },
  {
    title: "Invite Pharmacy",
    description: "Onboard new pharmacy partner",
    action: "Send Invite",
    variant: "outline" as const,
  },
  {
    title: "Generate Report",
    description: "Create system usage and analytics report",
    action: "Generate",
    variant: "outline" as const,
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

export const invoiceData = {
  invoiceId: "INV-2025-012",
  organizationName: "John Smith",
  organizationRef: "#7181",
  periodText: "Oct 1 – Oct 7, 2025",
};

export const totals = {
  amount: 1350,
  currency: "USD",
  collectionStatus: "collected" as const,
  remittanceStatus: "pending" as const,
};

export const transactionData = [
  {
    id: "txn::001",
    transmissions: ["eRx", "Pharmacy Portal"],
    patient: {
      firstName: "Xavier",
      lastName: "Doherty",
      dob: "2001-12-11T18:30:00.000Z",
      gender: "Male",
      phoneNumber: "(234) 234-2342",
      addresses: [
        {
          address1: "test",
          address2: "test",
          city: "test",
          state: "California",
          zipcode: "35004",
          country: "United States",
          isDefault: false,
          _id: "68c156c8132765d309f3c996",
        },
        {
          address1: "1247 Broadway Street",
          address2: "",
          city: "asdasd",
          state: "Texas",
          zipcode: "123123",
          country: "United States",
          isDefault: true,
          _id: "68c156c8132765d309f3c997",
        },
      ],
      patientId: "PAT_000002",
      email: "xav@yopmail.com",
      keywords: ["xavier", "doherty", "xavyopmailcom", "234", "234-2342"],
      height: 120,
      weight: 80,
      medicationAllergies: "lactose ",
      currentMedications: "Metformim",
      createdAt: "2025-09-10T06:23:07.017Z",
      updatedAt: "2025-09-10T10:45:28.596Z",
      id: "pt::f8e9da62-0a55-487b-afe6-33c4b4868386",
    },
    productVariants: [
      {
        medicationCatalogue: {
          drugName: "Fluconor",
          dosageForm: "Capsule",
          category: "Antifungal",
          id: "mc::06e8bb81-5f0f-4373-aa55-8eb4e612c740",
        },
        strength: "200mg",
        quantityType: "mg",
        containerQuantity: 20,
        id: "prv::87e61361-edb3-4b44-b0d6-5c44e1f6b5da",
      },
      {
        medicationCatalogue: {
          drugName: "Ibuprofen",
          dosageForm: "oral",
          category: "NSAID",
          id: "mc::02e8bb81-1f0f-4323-bb65-7eb4e611c721",
        },
        strength: "400mg",
        quantityType: "mg",
        containerQuantity: 60,
        id: "prv::17e61361-edb3-4b44-b0d6-5c44e1f6b9df",
      },
    ],
    amount: 1120,
    createdAt: "2025-10-06T10:45:00.000Z",
  },
  {
    id: "txn::002",
    transmissions: ["Direct"],
    patient: {
      firstName: "Melissa",
      lastName: "Joy",
      dob: "1995-04-15T18:30:00.000Z",
      gender: "Female",
      phoneNumber: "(345) 876-1234",
      addresses: [
        {
          address1: "45 Lakeview Dr",
          address2: "",
          city: "Austin",
          state: "Texas",
          zipcode: "73301",
          country: "United States",
          isDefault: true,
          _id: "68c156c8132765d309f3c998",
        },
      ],
      patientId: "PAT_000003",
      email: "melissa.joy@yopmail.com",
      keywords: ["melissa", "joy", "melissajoy", "345", "876-1234"],
      height: 165,
      weight: 65,
      medicationAllergies: "Penicillin",
      currentMedications: "Losartan",
      createdAt: "2025-09-12T10:00:00.000Z",
      updatedAt: "2025-09-20T15:00:00.000Z",
      id: "pt::77a6e134-5e5a-4c18-98bc-f7c4c292f7b3",
    },
    productVariants: [
      {
        medicationCatalogue: {
          drugName: "Losartan",
          dosageForm: "oral",
          category: "Antihypertensive",
          id: "mc::17e7cb12-4g5b-2233-aa55-7eb4e612d821",
        },
        strength: "50mg",
        quantityType: "mg",
        containerQuantity: 90,
        id: "prv::66e12361-edb3-4b44-b0d6-5c44e1f6c231",
      },
    ],
    amount: 400,
    createdAt: "2025-10-05T11:30:00.000Z",
  },
  {
    id: "txn::003",
    transmissions: ["Fax"],
    patient: {
      firstName: "Joey",
      lastName: "Geller",
      dob: "1988-07-23T18:30:00.000Z",
      gender: "Male",
      phoneNumber: "(456) 999-4567",
      addresses: [
        {
          address1: "678 Central Perk",
          address2: "Apt 5B",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          country: "United States",
          isDefault: true,
          _id: "68c156c8132765d309f3c999",
        },
      ],
      patientId: "PAT_000004",
      email: "joey.geller@yopmail.com",
      keywords: ["joey", "geller", "joeygeller", "456", "999-4567"],
      height: 178,
      weight: 82,
      medicationAllergies: "None",
      currentMedications: "Atorvastatin",
      createdAt: "2025-09-15T08:45:00.000Z",
      updatedAt: "2025-09-25T09:30:00.000Z",
      id: "pt::88b7e134-6e5a-4c28-98bc-a8d4c292f8b4",
    },
    productVariants: [
      {
        medicationCatalogue: {
          drugName: "Atorvastatin",
          dosageForm: "oral",
          category: "Statin",
          id: "mc::27e7cb12-4g5b-2233-aa55-7eb4e612d834",
        },
        strength: "10mg",
        quantityType: "mg",
        containerQuantity: 30,
        id: "prv::77e12361-edb3-4b44-b0d6-5c44e1f6c242",
      },
      {
        medicationCatalogue: {
          drugName: "Metformin",
          dosageForm: "oral",
          category: "Antidiabetic",
          id: "mc::37e7cb12-4g5b-2233-aa55-7eb4e612d845",
        },
        strength: "500mg",
        quantityType: "mg",
        containerQuantity: 60,
        id: "prv::88e12361-edb3-4b44-b0d6-5c44e1f6c253",
      },
    ],
    amount: 590,
    createdAt: "2025-10-05T12:15:00.000Z",
  },
];

export const organizations = [
  { id: "org-1", value: "Acme Corp" },
  { id: "org-2", value: "Globex Corporation" },
  { id: "org-3", value: "Initech" },
  { id: "org-4", value: "Umbrella Corp" },
  { id: "org-5", value: "Hooli" },
  { id: "org-6", value: "Stark Industries" },
  { id: "org-7", value: "Wayne Enterprises" },
  { id: "org-8", value: "Oscorp" },
  { id: "org-9", value: "Redcorp" },
  { id: "org-10", value: "Spectre Enterprises" },
];
