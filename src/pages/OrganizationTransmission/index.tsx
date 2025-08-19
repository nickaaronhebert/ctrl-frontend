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

  const [activeStatus, setActiveStatus] = useState<
    "Created" | "Processing" | "Queued" | "Transmitted"
  >("Created");
  const columns = useMemo(() => organizationTransmissionColumns(), []);

  const { data, meta } = useViewAllTransmissionsQuery(
    { page, perPage, activeStatus },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const { data: transmittedData } = useViewAllTransmissionsQuery(
    { page: 1, perPage: 1, activeStatus: "Transmitted" },
    {
      selectFromResult: ({ data }) => ({ data: data?.meta }),
    }
  );

  const { data: queuedData } = useViewAllTransmissionsQuery(
    { page: 1, perPage: 1, activeStatus: "Queued" },
    {
      selectFromResult: ({ data }) => ({ data: data?.meta }),
    }
  );

  const { data: createdData } = useViewAllTransmissionsQuery(
    { page: 1, perPage: 1, activeStatus: "Created" },
    {
      selectFromResult: ({ data }) => ({ data: data?.meta }),
    }
  );

  const { data: processingData } = useViewAllTransmissionsQuery(
    { page: 1, perPage: 1, activeStatus: "Processing" },
    {
      selectFromResult: ({ data }) => ({ data: data?.meta }),
    }
  );

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: meta?.pageCount ?? -1,
  });

  const getStatusCount = (status: string) => {
    switch (status) {
      case "Transmitted":
        return transmittedData?.itemCount || 0;
      case "Queued":
        return queuedData?.itemCount || 0;
      case "Created":
        return createdData?.itemCount || 0;
      case "Processing":
        return processingData?.itemCount || 0;
      default:
        return 0;
    }
  };

  return (
    <div className=" lg:p-3.5">
      <h1 className="text-2xl font-bold">Transmissions</h1>
      <h6 className="font-normal text-sm text text-slate">
        Recent transmission volume and statistics
      </h6>
      <div className="mt-3.5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-1">
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "Created"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("Created")}
          >
            <span className=" font-medium text-base mx-2.5">Created</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              {getStatusCount("Created")}
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "Processing"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("Processing")}
          >
            <span className=" font-medium text-base mx-2.5">Processing</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              {getStatusCount("Processing")}
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "Queued"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("Queued")}
          >
            <span className=" font-medium text-base mx-2.5">Queued</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              {getStatusCount("Queued")}
            </span>
          </Button>
          <Button
            variant={"tabs"}
            size={"xxl"}
            className={cn(
              activeStatus === "Transmitted"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground"
            )}
            onClick={() => setActiveStatus("Transmitted")}
          >
            <span className=" font-medium text-base mx-2.5">Transmitted</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white mr-2.5 text-secondary-foreground">
              {getStatusCount("Transmitted")}
            </span>
          </Button>
        </div>
        <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
      {/* Add your components and logic here */}
    </div>
  );
}
