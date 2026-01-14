// import TrackingSquare from "@/assets/icons/TrackingSquare";
import { organizationTransmissionColumns } from "@/components/data-table/columns/transmission";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { useViewAllTransmissionsQuery } from "@/redux/services/transmission";
// import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubOrgSelect from "@/components/common/SubOrganizations/select";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";

export default function OrganizationTransmission() {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const [value, setValue] = useState<string>("");

  const [activeStatus, setActiveStatus] = useState<
    "Created" | "Failed" | "Queued" | "Transmitted"
  >("Created");

  const { data: subOrgData } = useViewAllSubOrganizationQuery(
    {
      page: 1,
      perPage: 100,
      q: "",
    },
    {
      skip: !open,
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data,
        isLoading,
      }),
    }
  );
  const columns = useMemo(() => organizationTransmissionColumns(), []);

  const { data, meta } = useViewAllTransmissionsQuery(
    { page, perPage, activeStatus, subOrganization: value },
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

  const { data: failedData } = useViewAllTransmissionsQuery(
    { page: 1, perPage: 1, activeStatus: "Failed" },
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
      case "Failed":
        return failedData?.itemCount || 0;
      default:
        return 0;
    }
  };

  return (
    <div className=" lg:p-3.5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Transmissions</h1>
          <h6 className="font-normal text-sm text text-slate">
            Recent transmission volume and statistics
          </h6>
        </div>
        <div className="flex gap-4 items-center">
          <SubOrgSelect
            value={value}
            setValue={setValue}
            table={table}
            data={subOrgData}
            placeholder="All SubOrganizations"
          />
          {/* <Button
            onClick={() => navigate("/org/transmission-tracking")}
            className="w-[213px] h-[50px] rounded-[50px] px-[25px] py-[10px] flex gap-4 bg-[#081F3B] hover:bg-[#081F3B] cursor-pointer"
          >
            <TrackingSquare />{" "}
            <span className="text-white">Fulfillment Tracking</span>
          </Button> */}
        </div>
      </div>
      <div className="mt-3.5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-1">
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "Created"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("Created")}
          >
            <span className=" font-medium text-base mx-2.5">Created</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              {getStatusCount("Created")}
            </span>
          </Button>
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "Queued"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("Queued")}
          >
            <span className=" font-medium text-base mx-2.5">Queued</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white text-secondary-foreground mr-2.5">
              {getStatusCount("Queued")}
            </span>
          </Button>
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "Transmitted"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("Transmitted")}
          >
            <span className=" font-medium text-base mx-2.5">Transmitted</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white mr-2.5 text-secondary-foreground">
              {getStatusCount("Transmitted")}
            </span>
          </Button>
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "Failed"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("Failed")}
          >
            <span className=" font-medium text-base mx-2.5">Failed</span>
            <span className="min-h-4 min-w-8 p-1 rounded-[8px] bg-white mr-2.5 text-secondary-foreground">
              {getStatusCount("Failed")}
            </span>
          </Button>
        </div>
        <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
