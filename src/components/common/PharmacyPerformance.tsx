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
    <>
      <div className="w-full min-h-[660px] bg-white rounded-[15px] shadow-sm p-6 flex-col justify-center items-center">
        {data.length === 0 ? (
          <div className="flex flex-col items-center h-full min-h-[600px] justify-center gap-2 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-muted-foreground/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-18-9V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V7.5m-9 4.5l3-3m0 0l3 3m-3-3v12"
              />
            </svg>
            <p className="text-lg font-medium">No matching records</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};
