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
import type {
  InvoiceRow,
  PharmacyTransmissionRow,
} from "@/types/global/commonTypes";
import type {
  Medication,
  Pharmacy,
} from "@/components/data-table/columns/medication-library";
import Invoices from "@/assets/icons/Invoices";
// import { type MedicationAssignment } from "@/components/data-table/columns/access-control";

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
  { title: "Patients", url: "/org/patients", icon: Provider },
  { title: "Transactions", url: "/org/transactions", icon: Transactions },
  {
    title: "Medication Library",
    url: "/org/medications",
    icon: MedicationLibrary,
  },
  {
    title: "Pharmacies",
    url: "/org/pharmacies",
    icon: Pharmacies,
  },
  { title: "Activity Log", url: "/org/activity-log", icon: ActivityLog },
  { title: "Settings", url: "/org/settings", icon: SettingsMain },
  {
    title: "Pharmacy Assignment",
    url: "/org/access-control",
    icon: SettingsMain,
  },
];

//// For future score /////
// export const nestedOrgItems = [
//   { title: "Providers", url: "/org/providers", icon: Provider },
//   {
//     title: "Pharmacies",
//     url: "/org/pharmacies",
//     icon: Pharmacies,
//   },
//   {
//     title: "Medication Library",
//     url: "/org/medications",
//     icon: MedicationLibrary,
//   },
//   {
//     title: "Pharmacy Assignment",
//     url: "/org/access-control",
//     icon: SettingsMain,
//   },
//   { title: "Activity Log", url: "/org/activity-log", icon: ActivityLog },
//   { title: "Settings", url: "/org/settings", icon: SettingsMain },
// ];

export const pharmacyAdminItems = [
  {
    title: "Transmissions",
    url: "/pharmacy/transmissions",
    icon: Transmission,
  },
  { title: "Invoices", url: "/pharmacy/invoices", icon: Invoices },
  {
    title: "Medication Library",
    url: "/pharmacy/medications",
    icon: MedicationLibrary,
  },
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

export const dummyMedicationData: Medication[] = [
  {
    id: "1",
    drugName: "Liraglutide",
    productVariants: [
      {
        id: "1",
        strength: "2.5mg/mL",
        containerQuantity: 1,
        quantityType: "Bottle",
      },
      {
        id: "2",
        strength: "5.0mg/mL",
        containerQuantity: 10,
        quantityType: "Bottle",
      },
      {
        id: "3",
        strength: "7.5mg/mL",
        containerQuantity: 1,
        quantityType: "Bottle",
      },
    ],
    category: "Weight Management",
    availablePharmacies: 5,
    dosageForm: "Injection",
    compound: "Custom Formulation",
    instructions:
      "Compounded tirzepatide injectable solution for weight management and diabetes control. A dual GIP/GLP-1 receptor agonist that helps regulate blood sugar and promotes weight loss.",
    administrationNotes:
      "Refrigerated storage required. Must be used within 14 days of reconstitution. Administer subcutaneously once weekly.",
  },
  {
    id: "2",
    drugName: "Semaglutide",
    productVariants: [
      {
        id: "1",
        strength: "1mg/mL",
        containerQuantity: 1,
        quantityType: "Vial",
      },
      {
        id: "2",
        strength: "2mg/mL",
        containerQuantity: 2,
        quantityType: "Vial",
      },
    ],
    category: "Diabetes Management",
    availablePharmacies: 8,
    dosageForm: "Injection",
    compound: "Custom Formulation",
    instructions:
      "GLP-1 receptor agonist for improving glycemic control in adults with type 2 diabetes.",
    administrationNotes:
      "Store in refrigerator. Administer subcutaneously once weekly, same day each week.",
  },
  {
    id: "3",
    drugName: "Hydroxyprogesterone Caproate",
    productVariants: [
      {
        id: "1",
        strength: "250mg/mL",
        containerQuantity: 5,
        quantityType: "Vial",
      },
    ],
    category: "Hormone Therapy",
    availablePharmacies: 3,
    dosageForm: "Injection",
    compound: "Custom Formulation",
    instructions:
      "Used to reduce the risk of preterm birth in women with a singleton pregnancy who have a history of spontaneous preterm birth.",
    administrationNotes:
      "Administer intramuscularly once weekly. Store at controlled room temperature.",
  },
  {
    id: "4",
    drugName: "Vitamin B12",
    productVariants: [
      {
        id: "1",
        strength: "1000mcg/mL",
        containerQuantity: 10,
        quantityType: "Ampoule",
      },
      {
        id: "2",
        strength: "5000mcg/mL",
        containerQuantity: 5,
        quantityType: "Ampoule",
      },
    ],
    category: "Nutritional Supplement",
    availablePharmacies: 10,
    dosageForm: "Injection",
    compound: "Standard",
    instructions:
      "Used to treat or prevent vitamin B12 deficiency. Important for red blood cell formation and neurological function.",
    administrationNotes:
      "Administer intramuscularly or subcutaneously. Store at room temperature away from light.",
  },
  {
    id: "5",
    drugName: "Ketamine",
    productVariants: [
      {
        id: "1",
        strength: "50mg/mL",
        containerQuantity: 1,
        quantityType: "Vial",
      },
      {
        id: "2",
        strength: "100mg/mL",
        containerQuantity: 1,
        quantityType: "Vial",
      },
    ],
    category: "Mental Health",
    availablePharmacies: 2,
    dosageForm: "Injection",
    compound: "Custom Formulation",
    instructions:
      "Used off-label for treatment-resistant depression and certain chronic pain conditions.",
    administrationNotes:
      "Administer via slow IV infusion under supervision. Monitor vital signs during and after administration. Store in a secure location.",
  },
];

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
export const dummyPatients = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    phoneNumber: "5531634902",
    email: "sarah.johnson@company.com",
    gender: "Female",
    dob: "1988-01-15",
  },
  {
    id: "2",
    fullName: "Michael Smith",
    phoneNumber: "4422998421",
    email: "michael.smith@company.com",
    gender: "Male",
    dob: "1990-06-20",
  },
  {
    id: "3",
    fullName: "Emily Davis",
    phoneNumber: "3335127789",
    email: "emily.davis@company.com",
    gender: "Female",
    dob: "1985-11-05",
  },
  {
    id: "4",
    fullName: "David Thompson",
    phoneNumber: "6174829301",
    email: "david.thompson@company.com",
    gender: "Male",
    dob: "1992-03-12",
  },
  {
    id: "5",
    fullName: "Olivia Martinez",
    phoneNumber: "7256194830",
    email: "olivia.martinez@company.com",
    gender: "Female",
    dob: "1987-08-29",
  },
];

export const pharmacies = [
  { id: "1", name: "Greenwood Pharmacy", number: "#1234" },
  { id: "2", name: "Riverside Pharmacy", number: "#5678" },
  { id: "3", name: "Central Pharmacy", number: "#9012" },
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

export default US_STATES;

// Pharmacy module below //

export const dummyPharmacyTransmissions: PharmacyTransmissionRow[] = [
  {
    id: "1",
    transmissionId: "TMS_1101",
    status: "Transmitted",
    provider: {
      firstName: "James",
      lastName: "Wilson",
      email: "james.wilson@example.com",
      npi: "5566778899",
      phoneNumber: "555-123-4567",
      id: "prov_001",
      medicalLicense: [
        {
          state: "CA",
          licenseNumber: "CA1234567",
          _id: "ml_001",
        },
      ],
    },
    patient: {
      firstName: "Emma",
      lastName: "Smith",
      dob: "1985-06-15",
      state: "CA",
      zipcode: "90001",
      gender: "female",
      phoneNumber: "555-234-5678",
      email: "emma.smith@example.com",
      id: "pat_001",
    },
    productVariants: [
      {
        id: "pv_001",
        strength: "50 mcg",
        containerQuantity: 60,
        quantityType: "each",
        medicationCatalogue: {
          id: "med_001",
          drugName: "Levothyroxine",
          dosageForm: "oral",
          isCompound: false,
        },
      },
      {
        id: "pv_002",
        strength: "81 mg",
        containerQuantity: 30,
        quantityType: "tablets",
        medicationCatalogue: {
          id: "med_002",
          drugName: "Aspirin",
          dosageForm: "oral",
          isCompound: false,
        },
      },
    ],
    amount: 120.0,
  },
  {
    id: "2",
    transmissionId: "TMS_1102",
    status: "Queued",
    provider: {
      firstName: "Sophia",
      lastName: "Lee",
      email: "sophia.lee@example.com",
      npi: "9988776655",
      phoneNumber: "555-678-9012",
      id: "prov_002",
      medicalLicense: [
        {
          state: "NY",
          licenseNumber: "NY4567890",
          _id: "ml_002",
        },
      ],
    },
    patient: {
      firstName: "Liam",
      lastName: "Johnson",
      dob: "1992-11-30",
      state: "NY",
      zipcode: "10001",
      gender: "male",
      phoneNumber: "555-345-6789",
      email: "liam.johnson@example.com",
      id: "pat_002",
    },
    productVariants: [
      {
        id: "pv_003",
        strength: "500 mg",
        containerQuantity: 90,
        quantityType: "tablets",
        medicationCatalogue: {
          id: "med_003",
          drugName: "Metformin",
          dosageForm: "oral",
          isCompound: false,
        },
      },
      {
        id: "pv_004",
        strength: "10 mg",
        containerQuantity: 30,
        quantityType: "capsules",
        medicationCatalogue: {
          id: "med_004",
          drugName: "Lisinopril",
          dosageForm: "oral",
          isCompound: false,
        },
      },
      {
        id: "pv_005",
        strength: "20 mg",
        containerQuantity: 60,
        quantityType: "tablets",
        medicationCatalogue: {
          id: "med_005",
          drugName: "Atorvastatin",
          dosageForm: "oral",
          isCompound: false,
        },
      },
    ],
    amount: 75.5,
  },
  {
    id: "3",
    transmissionId: "TMS_1103",
    status: "Created",
    provider: {
      firstName: "David",
      lastName: "Nguyen",
      email: "david.nguyen@example.com",
      npi: "1122334455",
      phoneNumber: "555-789-0123",
      id: "prov_003",
      medicalLicense: [
        {
          state: "TX",
          licenseNumber: "TX7890123",
          _id: "ml_003",
        },
      ],
    },
    patient: {
      firstName: "Olivia",
      lastName: "Brown",
      dob: "1978-03-22",
      state: "TX",
      zipcode: "73301",
      gender: "female",
      phoneNumber: "555-456-7890",
      email: "olivia.brown@example.com",
      id: "pat_003",
    },
    productVariants: [
      {
        id: "pv_006",
        strength: "20 mg",
        containerQuantity: 30,
        quantityType: "capsules",
        medicationCatalogue: {
          id: "med_006",
          drugName: "Omeprazole",
          dosageForm: "oral",
          isCompound: false,
        },
      },
    ],
    amount: 40,
  },
  {
    id: "4",
    transmissionId: "TMS_1104",
    status: "Failed",
    provider: {
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@example.com",
      npi: "2233445566",
      phoneNumber: "555-890-1234",
      id: "prov_004",
      medicalLicense: [
        {
          state: "FL",
          licenseNumber: "FL8901234",
          _id: "ml_004",
        },
      ],
    },
    patient: {
      firstName: "Noah",
      lastName: "Davis",
      dob: "2000-09-10",
      state: "FL",
      zipcode: "33101",
      gender: "male",
      phoneNumber: "555-567-8901",
      email: "noah.davis@example.com",
      id: "pat_004",
    },
    productVariants: [
      {
        id: "pv_007",
        strength: "100 units/mL",
        containerQuantity: 3,
        quantityType: "vials",
        medicationCatalogue: {
          id: "med_007",
          drugName: "Insulin Glargine",
          dosageForm: "Injectable",
          isCompound: false,
        },
      },
      {
        id: "pv_008",
        strength: "1 mg/mL",
        containerQuantity: 1,
        quantityType: "kit",
        medicationCatalogue: {
          id: "med_008",
          drugName: "Glucagon",
          dosageForm: "Injectable",
          isCompound: true,
        },
      },
    ],
    amount: 200.25,
  },
  {
    id: "5",
    transmissionId: "TMS_1105",
    status: "Transmitted",
    provider: {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@example.com",
      npi: "3344556677",
      phoneNumber: "555-901-2345",
      id: "prov_005",
      medicalLicense: [
        {
          state: "WA",
          licenseNumber: "WA1239876",
          _id: "ml_005",
        },
      ],
    },
    patient: {
      firstName: "Ava",
      lastName: "Martinez",
      dob: "1990-12-05",
      state: "WA",
      zipcode: "98101",
      gender: "female",
      phoneNumber: "555-678-9012",
      email: "ava.martinez@example.com",
      id: "pat_005",
    },
    productVariants: [
      {
        id: "pv_009",
        strength: "500 mg",
        containerQuantity: 21,
        quantityType: "capsules",
        medicationCatalogue: {
          id: "med_009",
          drugName: "Amoxicillin",
          dosageForm: "oral",
          isCompound: false,
        },
      },
      {
        id: "pv_010",
        strength: "200 mg",
        containerQuantity: 30,
        quantityType: "tablets",
        medicationCatalogue: {
          id: "med_010",
          drugName: "Ibuprofen",
          dosageForm: "oral",
          isCompound: false,
        },
      },
      {
        id: "pv_011",
        strength: "0.3 mg",
        containerQuantity: 2,
        quantityType: "auto-injectors",
        medicationCatalogue: {
          id: "med_011",
          drugName: "Epinephrine",
          dosageForm: "Injectable",
          isCompound: false,
        },
      },
    ],
    amount: 155.75,
  },
];

export const dummyInvoices: InvoiceRow[] = [
  {
    transmissionId: "TMS_001234",
    date: new Date("2025-08-28"),
    amount: 1350.0,
    affiliate: {
      name: "John Smith",
      id: "AFF001",
    },
  },
  {
    transmissionId: "TMS_001233",
    date: new Date("2025-08-26"),
    amount: 950.0,
    affiliate: {
      name: "Sarah Johnson",
      id: "AFF002",
    },
  },
  {
    transmissionId: "TMS_001237",
    date: new Date("2025-08-14"),
    amount: 2200.0,
    affiliate: {
      name: "Daniel Kim",
      id: "AFF003",
    },
  },
  {
    transmissionId: "TMS_001239",
    date: new Date("2025-08-10"),
    amount: 450.0,
    affiliate: {
      name: "Michael Lee",
      id: "AFF004",
    },
  },
  {
    transmissionId: "TMS_001223",
    date: new Date("2025-08-05"),
    amount: 3000.0,
    affiliate: {
      name: "David Martinez",
      id: "AFF005",
    },
  },
  {
    transmissionId: "TMS_001221",
    date: new Date("2025-08-01"),
    amount: 800.0,
    affiliate: {
      name: "Emily Brown",
      id: "AFF006",
    },
  },
  {
    transmissionId: "TMS_001219",
    date: new Date("2025-07-28"),
    amount: 1250.0,
    affiliate: {
      name: "Olivia Wilson",
      id: "AFF007",
    },
  },
];
