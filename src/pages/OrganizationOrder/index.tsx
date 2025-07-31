import {
  organizationOrderColumns,
  type Order,
} from "@/components/data-table/columns/order";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const data: Order[] = [
  {
    id: "728ed52f",
    patient: {
      name: "John Doe",
      id: "PT_0001",
    },
    provider: {
      name: "Dr. Smith",
      npi: "1234567890",
    },
    pharmacy: {
      name: "Pharmacy A",
      id: "PH_0001",
    },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: {
      name: "Dave Smith",
      id: "PT_0002",
    },
    provider: {
      name: "Dr. Jane Doe",
      npi: "0987654321",
    },
    pharmacy: {
      name: "CVA Pharmacy",
      id: "PH_0002",
    },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },

      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "728ed52f",
    patient: { name: "John Doe", id: "PT_0001" },
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: { name: "Dave Smith", id: "PT_0002" },
    provider: { name: "Dr. Jane Doe", npi: "0987654321" },
    pharmacy: { name: "CVA Pharmacy", id: "PH_0002" },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "a1b2c3d4",
    patient: { name: "Emily Johnson", id: "PT_0003" },
    provider: { name: "Dr. Alan Grant", npi: "1122334455" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    createdAt: "2/10/2024",
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
    patient: { name: "Sarah Lee", id: "PT_0004" },
    provider: { name: "Dr. Emily Stone", npi: "6677889900" },
    pharmacy: { name: "HealthPlus Pharmacy", id: "PH_0004" },
    createdAt: "2/12/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "90",
        quantityType: "softgel",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "i9j0k1l2",
    patient: { name: "Michael Chen", id: "PT_0005" },
    provider: { name: "Dr. Olivia Ray", npi: "5566778899" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0005" },
    createdAt: "2/14/2024",
    status: "transmitted",
    medication: [
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "m3n4o5p6",
    patient: { name: "Ava Brown", id: "PT_0006" },
    provider: { name: "Dr. Robert Miles", npi: "4433221100" },
    pharmacy: { name: "CareFirst Pharmacy", id: "PH_0006" },
    createdAt: "2/18/2024",
    status: "failed",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "q7r8s9t0",
    patient: { name: "Daniel White", id: "PT_0007" },
    provider: { name: "Dr. Lisa Monroe", npi: "9988776655" },
    pharmacy: { name: "ExpressRx", id: "PH_0007" },
    createdAt: "2/20/2024",
    status: "queued",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Multivitamin Tablets",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "u1v2w3x4",
    patient: { name: "Olivia Martin", id: "PT_0008" },
    provider: { name: "Dr. Kevin Hart", npi: "1029384756" },
    pharmacy: { name: "MediQuick", id: "PH_0008" },
    createdAt: "2/22/2024",
    status: "queued",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "20",
        quantityType: "capsule",
        injectible: "oral",
      },
    ],
  },
  {
    id: "y5z6a7b8",
    patient: { name: "Chris Evans", id: "PT_0009" },
    provider: { name: "Dr. Rachel Green", npi: "1231231231" },
    pharmacy: { name: "PharmaDirect", id: "PH_0009" },
    createdAt: "2/25/2024",
    status: "transmitted",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "15",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "c9d0e1f2",
    patient: { name: "Laura Bennett", id: "PT_0010" },
    provider: { name: "Dr. Henry Ford", npi: "7894561230" },
    pharmacy: { name: "TrustMeds", id: "PH_0010" },
    createdAt: "3/01/2024",
    status: "queued",
    medication: [
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "2",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "g3h4i5j6",
    patient: { name: "Steven Clark", id: "PT_0011" },
    provider: { name: "Dr. Megan Hunt", npi: "3216549870" },
    pharmacy: { name: "CareOne", id: "PH_0011" },
    createdAt: "3/04/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "k7l8m9n0",
    patient: { name: "Rachel Adams", id: "PT_0012" },
    provider: { name: "Dr. William Blake", npi: "8529637410" },
    pharmacy: { name: "PrimePharma", id: "PH_0012" },
    createdAt: "3/06/2024",
    status: "failed",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "o1p2q3r4",
    patient: { name: "James Brown", id: "PT_0013" },
    provider: { name: "Dr. Clara Oswald", npi: "6547893210" },
    pharmacy: { name: "QuickMeds", id: "PH_0013" },
    createdAt: "3/09/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 2000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "s5t6u7v8",
    patient: { name: "Isabella Knight", id: "PT_0014" },
    provider: { name: "Dr. George Lane", npi: "9638527410" },
    pharmacy: { name: "HealthBridge", id: "PH_0014" },
    createdAt: "3/10/2024",
    status: "transmitted",
    medication: [
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "w9x0y1z2",
    patient: { name: "Noah Harris", id: "PT_0015" },
    provider: { name: "Dr. Fiona Wells", npi: "7418529630" },
    pharmacy: { name: "RxFast", id: "PH_0015" },
    createdAt: "3/12/2024",
    status: "queued",
    medication: [
      {
        name: "Levothyroxine 75mcg",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "728ed52f",
    patient: {
      name: "John Doe",
      id: "PT_0001",
    },
    provider: {
      name: "Dr. Smith",
      npi: "1234567890",
    },
    pharmacy: {
      name: "Pharmacy A",
      id: "PH_0001",
    },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: {
      name: "Dave Smith",
      id: "PT_0002",
    },
    provider: {
      name: "Dr. Jane Doe",
      npi: "0987654321",
    },
    pharmacy: {
      name: "CVA Pharmacy",
      id: "PH_0002",
    },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },

      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "728ed52f",
    patient: { name: "John Doe", id: "PT_0001" },
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: { name: "Dave Smith", id: "PT_0002" },
    provider: { name: "Dr. Jane Doe", npi: "0987654321" },
    pharmacy: { name: "CVA Pharmacy", id: "PH_0002" },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "a1b2c3d4",
    patient: { name: "Emily Johnson", id: "PT_0003" },
    provider: { name: "Dr. Alan Grant", npi: "1122334455" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    createdAt: "2/10/2024",
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
    patient: { name: "Sarah Lee", id: "PT_0004" },
    provider: { name: "Dr. Emily Stone", npi: "6677889900" },
    pharmacy: { name: "HealthPlus Pharmacy", id: "PH_0004" },
    createdAt: "2/12/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "90",
        quantityType: "softgel",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "i9j0k1l2",
    patient: { name: "Michael Chen", id: "PT_0005" },
    provider: { name: "Dr. Olivia Ray", npi: "5566778899" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0005" },
    createdAt: "2/14/2024",
    status: "transmitted",
    medication: [
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "m3n4o5p6",
    patient: { name: "Ava Brown", id: "PT_0006" },
    provider: { name: "Dr. Robert Miles", npi: "4433221100" },
    pharmacy: { name: "CareFirst Pharmacy", id: "PH_0006" },
    createdAt: "2/18/2024",
    status: "failed",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "q7r8s9t0",
    patient: { name: "Daniel White", id: "PT_0007" },
    provider: { name: "Dr. Lisa Monroe", npi: "9988776655" },
    pharmacy: { name: "ExpressRx", id: "PH_0007" },
    createdAt: "2/20/2024",
    status: "queued",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Multivitamin Tablets",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "u1v2w3x4",
    patient: { name: "Olivia Martin", id: "PT_0008" },
    provider: { name: "Dr. Kevin Hart", npi: "1029384756" },
    pharmacy: { name: "MediQuick", id: "PH_0008" },
    createdAt: "2/22/2024",
    status: "queued",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "20",
        quantityType: "capsule",
        injectible: "oral",
      },
    ],
  },
  {
    id: "y5z6a7b8",
    patient: { name: "Chris Evans", id: "PT_0009" },
    provider: { name: "Dr. Rachel Green", npi: "1231231231" },
    pharmacy: { name: "PharmaDirect", id: "PH_0009" },
    createdAt: "2/25/2024",
    status: "transmitted",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "15",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "c9d0e1f2",
    patient: { name: "Laura Bennett", id: "PT_0010" },
    provider: { name: "Dr. Henry Ford", npi: "7894561230" },
    pharmacy: { name: "TrustMeds", id: "PH_0010" },
    createdAt: "3/01/2024",
    status: "queued",
    medication: [
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "2",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "g3h4i5j6",
    patient: { name: "Steven Clark", id: "PT_0011" },
    provider: { name: "Dr. Megan Hunt", npi: "3216549870" },
    pharmacy: { name: "CareOne", id: "PH_0011" },
    createdAt: "3/04/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "k7l8m9n0",
    patient: { name: "Rachel Adams", id: "PT_0012" },
    provider: { name: "Dr. William Blake", npi: "8529637410" },
    pharmacy: { name: "PrimePharma", id: "PH_0012" },
    createdAt: "3/06/2024",
    status: "failed",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "o1p2q3r4",
    patient: { name: "James Brown", id: "PT_0013" },
    provider: { name: "Dr. Clara Oswald", npi: "6547893210" },
    pharmacy: { name: "QuickMeds", id: "PH_0013" },
    createdAt: "3/09/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 2000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "s5t6u7v8",
    patient: { name: "Isabella Knight", id: "PT_0014" },
    provider: { name: "Dr. George Lane", npi: "9638527410" },
    pharmacy: { name: "HealthBridge", id: "PH_0014" },
    createdAt: "3/10/2024",
    status: "transmitted",
    medication: [
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "w9x0y1z2",
    patient: { name: "Noah Harris", id: "PT_0015" },
    provider: { name: "Dr. Fiona Wells", npi: "7418529630" },
    pharmacy: { name: "RxFast", id: "PH_0015" },
    createdAt: "3/12/2024",
    status: "queued",
    medication: [
      {
        name: "Levothyroxine 75mcg",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "728ed52f",
    patient: {
      name: "John Doe",
      id: "PT_0001",
    },
    provider: {
      name: "Dr. Smith",
      npi: "1234567890",
    },
    pharmacy: {
      name: "Pharmacy A",
      id: "PH_0001",
    },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: {
      name: "Dave Smith",
      id: "PT_0002",
    },
    provider: {
      name: "Dr. Jane Doe",
      npi: "0987654321",
    },
    pharmacy: {
      name: "CVA Pharmacy",
      id: "PH_0002",
    },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },

      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "728ed52f",
    patient: { name: "John Doe", id: "PT_0001" },
    provider: { name: "Dr. Smith", npi: "1234567890" },
    pharmacy: { name: "Pharmacy A", id: "PH_0001" },
    createdAt: "1/15/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "489e1d42",
    patient: { name: "Dave Smith", id: "PT_0002" },
    provider: { name: "Dr. Jane Doe", npi: "0987654321" },
    pharmacy: { name: "CVA Pharmacy", id: "PH_0002" },
    createdAt: "1/16/2024",
    status: "transmitted",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "oral",
      },
    ],
  },
  {
    id: "a1b2c3d4",
    patient: { name: "Emily Johnson", id: "PT_0003" },
    provider: { name: "Dr. Alan Grant", npi: "1122334455" },
    pharmacy: { name: "WellCare Pharmacy", id: "PH_0003" },
    createdAt: "2/10/2024",
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
    patient: { name: "Sarah Lee", id: "PT_0004" },
    provider: { name: "Dr. Emily Stone", npi: "6677889900" },
    pharmacy: { name: "HealthPlus Pharmacy", id: "PH_0004" },
    createdAt: "2/12/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 1000IU",
        quantity: "90",
        quantityType: "softgel",
        injectible: "oral",
      },
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "i9j0k1l2",
    patient: { name: "Michael Chen", id: "PT_0005" },
    provider: { name: "Dr. Olivia Ray", npi: "5566778899" },
    pharmacy: { name: "Unity Pharmacy", id: "PH_0005" },
    createdAt: "2/14/2024",
    status: "transmitted",
    medication: [
      {
        name: "Levothyroxine 50mcg",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "m3n4o5p6",
    patient: { name: "Ava Brown", id: "PT_0006" },
    provider: { name: "Dr. Robert Miles", npi: "4433221100" },
    pharmacy: { name: "CareFirst Pharmacy", id: "PH_0006" },
    createdAt: "2/18/2024",
    status: "failed",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "q7r8s9t0",
    patient: { name: "Daniel White", id: "PT_0007" },
    provider: { name: "Dr. Lisa Monroe", npi: "9988776655" },
    pharmacy: { name: "ExpressRx", id: "PH_0007" },
    createdAt: "2/20/2024",
    status: "queued",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
      {
        name: "Multivitamin Tablets",
        quantity: "60",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "u1v2w3x4",
    patient: { name: "Olivia Martin", id: "PT_0008" },
    provider: { name: "Dr. Kevin Hart", npi: "1029384756" },
    pharmacy: { name: "MediQuick", id: "PH_0008" },
    createdAt: "2/22/2024",
    status: "queued",
    medication: [
      {
        name: "Amoxicillin 500mg",
        quantity: "20",
        quantityType: "capsule",
        injectible: "oral",
      },
    ],
  },
  {
    id: "y5z6a7b8",
    patient: { name: "Chris Evans", id: "PT_0009" },
    provider: { name: "Dr. Rachel Green", npi: "1231231231" },
    pharmacy: { name: "PharmaDirect", id: "PH_0009" },
    createdAt: "2/25/2024",
    status: "transmitted",
    medication: [
      {
        name: "Prednisone 10mg",
        quantity: "15",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "c9d0e1f2",
    patient: { name: "Laura Bennett", id: "PT_0010" },
    provider: { name: "Dr. Henry Ford", npi: "7894561230" },
    pharmacy: { name: "TrustMeds", id: "PH_0010" },
    createdAt: "3/01/2024",
    status: "queued",
    medication: [
      {
        name: "B12 Injection 1000mcg/mL",
        quantity: "2",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "g3h4i5j6",
    patient: { name: "Steven Clark", id: "PT_0011" },
    provider: { name: "Dr. Megan Hunt", npi: "3216549870" },
    pharmacy: { name: "CareOne", id: "PH_0011" },
    createdAt: "3/04/2024",
    status: "queued",
    medication: [
      {
        name: "Tirzepatide 2.5mg/mL",
        quantity: "30",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
  {
    id: "k7l8m9n0",
    patient: { name: "Rachel Adams", id: "PT_0012" },
    provider: { name: "Dr. William Blake", npi: "8529637410" },
    pharmacy: { name: "PrimePharma", id: "PH_0012" },
    createdAt: "3/06/2024",
    status: "failed",
    medication: [
      {
        name: "HCG 5000IU/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "o1p2q3r4",
    patient: { name: "James Brown", id: "PT_0013" },
    provider: { name: "Dr. Clara Oswald", npi: "6547893210" },
    pharmacy: { name: "QuickMeds", id: "PH_0013" },
    createdAt: "3/09/2024",
    status: "queued",
    medication: [
      {
        name: "Vitamin D3 2000IU",
        quantity: "60",
        quantityType: "softgel",
        injectible: "oral",
      },
    ],
  },
  {
    id: "s5t6u7v8",
    patient: { name: "Isabella Knight", id: "PT_0014" },
    provider: { name: "Dr. George Lane", npi: "9638527410" },
    pharmacy: { name: "HealthBridge", id: "PH_0014" },
    createdAt: "3/10/2024",
    status: "transmitted",
    medication: [
      {
        name: "Insulin Glargine 100U/mL",
        quantity: "1",
        quantityType: "vial",
        injectible: "injectable",
      },
    ],
  },
  {
    id: "w9x0y1z2",
    patient: { name: "Noah Harris", id: "PT_0015" },
    provider: { name: "Dr. Fiona Wells", npi: "7418529630" },
    pharmacy: { name: "RxFast", id: "PH_0015" },
    createdAt: "3/12/2024",
    status: "queued",
    medication: [
      {
        name: "Levothyroxine 75mcg",
        quantity: "90",
        quantityType: "tablet",
        injectible: "oral",
      },
    ],
  },
];
export default function OrganizationOrder() {
  const columns = useMemo(() => organizationOrderColumns(), []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="">
      <DataTable table={table} />

      <DataTablePagination table={table} />
    </div>
  );
}
