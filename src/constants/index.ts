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
  { title: "Transactions", url: "/org/transactions", icon: Transactions },
  { title: "Patients", url: "/org/patients", icon: PatientIcon },
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
