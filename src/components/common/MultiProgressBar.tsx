import React from "react";

export interface ProgressSegment {
  value: number;
  color: "transmitted" | "queued" | "pending" | "failed";
  label?: string;
}

interface MultiProgressBarProps {
  segments: ProgressSegment[];
  total: number;
  height?: string;
}

const colorClasses = {
  transmitted: "bg-progress",
  queued: "bg-queued",
  pending: "bg-pending",
  failed: "bg-failed",
};

export const MultiProgressBar: React.FC<MultiProgressBarProps> = ({
  segments,
  total,
  height = "h-5",
}) => {
  return (
    <div
      className={`w-full ${height} bg-progress-bg rounded-lg overflow-hidden flex`}
    >
      {segments.map((segment, index) => {
        const percentage = (segment.value / total) * 100;
        return (
          <div
            key={index}
            className={`${
              colorClasses[segment.color]
            } transition-all duration-300 hover:opacity-80`}
            style={{ width: `${percentage}%` }}
            title={
              segment.label
                ? `${segment.label}: ${segment.value}`
                : `${segment.value}`
            }
          />
        );
      })}
    </div>
  );
};
