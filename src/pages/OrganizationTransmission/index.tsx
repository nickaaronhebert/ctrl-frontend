import { organizationTransmissionColumns } from "@/components/data-table/columns/transmission";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { useViewAllTransmissionsQuery } from "@/redux/services/transmission";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function OrganizationTransmission() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);

  const { data, meta } = useViewAllTransmissionsQuery(
    { page, perPage },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  // console.log("Transmission Data:", data);
  // console.log("Meta Data:", meta);

  const [activeStatus, setActiveStatus] = useState<
    "transmitted" | "queued" | "pending" | "failed"
  >("transmitted");
  const columns = useMemo(() => organizationTransmissionColumns(), []);

  // const data =
  //   activeStatus === "transmitted"
  //     ? transmissionData
  //     : activeStatus === "queued"
  //     ? queuedData
  //     : activeStatus === "pending"
  //     ? pendingData
  //     : failedData;

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <div className=" lg:p-3.5">
      <h1 className="text-2xl font-bold">Transmissions</h1>
      <h6 className="font-normal text-sm text text-slate">
        Recent transmission volume and statistics
      </h6>
      <div className="mt-3.5 ">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "transmitted"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("transmitted")}
          >
            <span className=" font-medium text-base mx-2.5">Transmitted</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white mr-2.5 text-secondary-foreground">
              42
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "queued"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("queued")}
          >
            <span className=" font-medium text-base mx-2.5">Queued</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              42
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "pending"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("pending")}
          >
            <span className=" font-medium text-base mx-2.5">Pending</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              22
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "failed"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("failed")}
          >
            <span className=" font-medium text-base mx-2.5">Failed</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              50
            </span>
          </Button>
        </div> */}
        <div className="p-5 bg-white shadow-[0px_2px_40px_0px_#00000014]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
      {/* Add your components and logic here */}
    </div>
  );
}
