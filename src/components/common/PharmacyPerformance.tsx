import React, { type JSX } from "react";
import { MultiProgressBar, type ProgressSegment } from "./MultiProgressBar";
import PharmacyIcon from "@/assets/icons/PharmacyIcon";

type Period = "24h" | "7d" | "1m";

interface PharmacyData {
  id: string;
  name: string;
  icon: JSX.Element;
  stats: {
    [key in Period]: {
      segments: ProgressSegment[];
      total: number;
      values: number[];
    };
  };
}

interface PharmacyPerformanceProps {
  data?: PharmacyData[];
  selectedPeriod: Period;
}

// Sample data - this will be replaced with API data later
const defaultData: PharmacyData[] = [
  {
    id: "1",
    name: "CVS Pharmacy",
    icon: <PharmacyIcon />,
    stats: {
      "24h": {
        segments: [
          { value: 42, color: "transmitted", label: "Transmitted" },
          { value: 16, color: "queued", label: "Queued" },
          { value: 6, color: "pending", label: "Pending" },
          { value: 2, color: "failed", label: "Failed" },
        ],
        total: 66,
        values: [42, 16, 6, 2],
      },
      "7d": {
        segments: [
          { value: 320, color: "transmitted", label: "Transmitted" },
          { value: 110, color: "queued", label: "Queued" },
          { value: 40, color: "pending", label: "Pending" },
          { value: 12, color: "failed", label: "Failed" },
        ],
        total: 482,
        values: [320, 110, 40, 12],
      },
      "1m": {
        segments: [
          { value: 1200, color: "transmitted", label: "Transmitted" },
          { value: 420, color: "queued", label: "Queued" },
          { value: 160, color: "pending", label: "Pending" },
          { value: 50, color: "failed", label: "Failed" },
        ],
        total: 1830,
        values: [1200, 420, 160, 50],
      },
    },
  },
  {
    id: "2",
    name: "Walgreens",
    icon: <PharmacyIcon />,
    stats: {
      "24h": {
        segments: [
          { value: 18, color: "transmitted", label: "Transmitted" },
          { value: 7, color: "queued", label: "Queued" },
          { value: 3, color: "pending", label: "Pending" },
          { value: 1, color: "failed", label: "Failed" },
        ],
        total: 29,
        values: [18, 7, 3, 1],
      },
      "7d": {
        segments: [
          { value: 140, color: "transmitted", label: "Transmitted" },
          { value: 50, color: "queued", label: "Queued" },
          { value: 18, color: "pending", label: "Pending" },
          { value: 5, color: "failed", label: "Failed" },
        ],
        total: 213,
        values: [140, 50, 18, 5],
      },
      "1m": {
        segments: [
          { value: 600, color: "transmitted", label: "Transmitted" },
          { value: 210, color: "queued", label: "Queued" },
          { value: 80, color: "pending", label: "Pending" },
          { value: 20, color: "failed", label: "Failed" },
        ],
        total: 910,
        values: [600, 210, 80, 20],
      },
    },
  },
  {
    id: "3",
    name: "Costco Pharmacy",
    icon: <PharmacyIcon />,
    stats: {
      "24h": {
        segments: [
          { value: 8, color: "transmitted", label: "Transmitted" },
          { value: 2, color: "queued", label: "Queued" },
          { value: 1, color: "pending", label: "Pending" },
          { value: 0, color: "failed", label: "Failed" },
        ],
        total: 11,
        values: [8, 2, 1, 0],
      },
      "7d": {
        segments: [
          { value: 67, color: "transmitted", label: "Transmitted" },
          { value: 8, color: "queued", label: "Queued" },
          { value: 6, color: "pending", label: "Pending" },
          { value: 4, color: "failed", label: "Failed" },
        ],
        total: 85,
        values: [67, 8, 6, 4],
      },
      "1m": {
        segments: [
          { value: 250, color: "transmitted", label: "Transmitted" },
          { value: 40, color: "queued", label: "Queued" },
          { value: 20, color: "pending", label: "Pending" },
          { value: 10, color: "failed", label: "Failed" },
        ],
        total: 320,
        values: [250, 40, 20, 10],
      },
    },
  },
];

export const PharmacyPerformance: React.FC<PharmacyPerformanceProps> = ({
  data = defaultData,
  selectedPeriod,
}) => {
  return (
    <div className="w-full max-w-2xl bg-white  rounded-[15px] shadow-sm p-6">
      <div className="space-y-6">
        {data.map((pharmacy) => {
          const stats = pharmacy.stats[selectedPeriod];
          return (
            <div
              key={pharmacy.id}
              className="space-y-3 border-b border-gray-300 pb-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{pharmacy.icon}</span>
                  <span className="font-medium text-dashboard-title">
                    {pharmacy.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-dashboard-title">
                  Total: {stats.total}
                </span>
              </div>

              <MultiProgressBar segments={stats.segments} total={stats.total} />

              <div className="flex items-center gap-4 text-sm text-dashboard-subtitle">
                {stats.values.map((value, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-sm ${
                        index === 0
                          ? "bg-progress"
                          : index === 1
                          ? "bg-queued"
                          : index === 2
                          ? "bg-pending"
                          : "bg-failed"
                      }`}
                    />
                    {value}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
