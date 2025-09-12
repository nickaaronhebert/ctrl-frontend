import type { TransmissionsStats } from "@/types/responses/IViewOrgPharmaciesTranmissions.";
import type { ColumnDef } from "@tanstack/react-table";

const colorClasses = {
  Created: "bg-progress",
  Transmitted: "bg-queued",
  Queued: "bg-pending",
  Failed: "bg-failed",
};

export function orgPharmaciesTransmissionColumns(): ColumnDef<TransmissionsStats>[] {
  return [
    {
      accessorKey: "name", // just for sorting/filtering on firstName
      header: "Pharmacy Name",
      cell: ({ row }) => {
        const { name } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{name}</p>
          </>
        );
      },
    },

    {
      accessorKey: "email", // just for sorting/filtering on firstName
      header: "Email",
      cell: ({ row }) => {
        const { email } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{email}</p>
          </>
        );
      },
    },

    {
      accessorKey: "statusCounts", // just for sorting/filtering on firstName
      header: "Transmissions",
      cell: ({ row }) => {
        const { statusCounts, name } = row.original;
        const total = statusCounts.reduce((sum, item) => sum + item.count, 0);
        return (
          <div className="w-fit">
            <div
              className={`min-w-[450px] max-w-[450px] h-5 bg-progress-bg rounded-lg overflow-hidden flex`}
            >
              {statusCounts.map((segment, index) => {
                const percentage = (segment.count / total) * 100;
                return (
                  <div
                    key={index}
                    className={`${
                      colorClasses[segment.status]
                    } transition-all duration-300 hover:opacity-80`}
                    style={{ width: `${percentage}%` }}
                    title={
                      segment.status
                        ? `${segment.status}: ${segment.count}`
                        : `${segment.count}`
                    }
                  />
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-3 text-sm text-dashboard-subtitle">
                {statusCounts.map((item, index) => (
                  <span
                    key={`${name}${index}${item.status}`}
                    className="flex items-center gap-1"
                  >
                    <div
                      className={`w-[8px] h-[8px] rounded-sm text-[10px] font-normal ${
                        item.status === "Created"
                          ? "bg-progress"
                          : item.status === "Transmitted"
                          ? "bg-queued"
                          : item.status === "Queued"
                          ? "bg-pending"
                          : "bg-failed"
                      }`}
                    />
                    {` ${item.count} ${item.status}`}
                  </span>
                ))}
              </div>
              <div className="text-xs font-semibold ">{`Total: ${total}`}</div>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "phoneNumber", // just for sorting/filtering on firstName
      header: "Phone Number",
      cell: ({ row }) => {
        const { phoneNumber } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{phoneNumber}</p>
          </>
        );
      },
    },
  ];
}
