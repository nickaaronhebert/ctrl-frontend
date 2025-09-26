import React from "react";
import { MultiProgressBar } from "./MultiProgressBar";

export const PharmacyPerformance: React.FC<{
  data: {
    id: string;
    name: string;
    icon?: string;
    stats: {
      total: number;
      segments: number[];
      values: string[];
    };
  }[];
}> = ({ data = [] }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-[15px] shadow-sm p-6">
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
                Total: {pharmacy.stats.total}
              </span>
            </div>

            <MultiProgressBar
              segments={pharmacy.stats.segments as any}
              total={pharmacy.stats.total}
            />

            <div className="flex items-center gap-4 text-sm text-dashboard-subtitle">
              {pharmacy.stats.values.map((value, index) => {
                const status = value.split(":")[0].trim();
                console.log("value>>>>>>>>>>", value);
                return (
                  <span key={index} className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-sm ${
                        status === "Created"
                          ? "bg-pending"
                          : status === "Queued"
                          ? "bg-queued"
                          : status === "Transmitted"
                          ? "bg-progress"
                          : "bg-failed"
                      }`}
                    />
                    {value}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
