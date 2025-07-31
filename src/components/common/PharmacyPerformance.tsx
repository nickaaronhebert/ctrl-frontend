import React from "react";
import { MultiProgressBar, type ProgressSegment } from "./MultiProgressBar";

interface PharmacyData {
  id: string;
  name: string;
  icon: string;
  segments: ProgressSegment[];
  total: number;
  values: number[];
}

interface PharmacyPerformanceProps {
  data?: PharmacyData[];
}

// Sample data - this will be replaced with API data later
const defaultData: PharmacyData[] = [
  {
    id: "1",
    name: "CVS Pharmacy",
    icon: "🏥",
    segments: [
      { value: 422, color: "transmitted", label: "Transmitted" },
      { value: 156, color: "queued", label: "Queued" },
      { value: 61, color: "pending", label: "Pending" },
      { value: 17, color: "failed", label: "Failed" },
    ],
    total: 656,
    values: [422, 156, 61, 17],
  },
  {
    id: "2",
    name: "Walgreens",
    icon: "🏥",
    segments: [
      { value: 140, color: "transmitted", label: "Transmitted" },
      { value: 50, color: "queued", label: "Queued" },
      { value: 18, color: "pending", label: "Pending" },
      { value: 5, color: "failed", label: "Failed" },
    ],
    total: 213,
    values: [140, 50, 18, 5],
  },
  {
    id: "3",
    name: "Costco Pharmacy",
    icon: "🏥",
    segments: [
      { value: 67, color: "transmitted", label: "Transmitted" },
      { value: 8, color: "queued", label: "Queued" },
      { value: 6, color: "pending", label: "Pending" },
      { value: 4, color: "failed", label: "Failed" },
    ],
    total: 85,
    values: [67, 8, 6, 4],
  },
];

export const PharmacyPerformance: React.FC<PharmacyPerformanceProps> = ({
  data = defaultData,
}) => {
  return (
    <div className="w-full max-w-2xl bg-white  rounded-[15px] shadow-sm p-6">
      <div className="space-y-6">
        {data.map((pharmacy) => (
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
                Total: {pharmacy.total}
              </span>
            </div>

            <MultiProgressBar
              segments={pharmacy.segments}
              total={pharmacy.total}
            />

            <div className="flex items-center gap-4 text-sm text-dashboard-subtitle">
              {pharmacy.values.map((value, index) => (
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
        ))}
      </div>
    </div>
  );
};
