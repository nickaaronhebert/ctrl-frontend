import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyPharmacyTransmissions } from "@/constants";
import { pharmacyTransmissionColumns } from "@/components/data-table/columns/pharmacyTransmission";

export default function PharmacyTransmission() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const columns = useMemo(() => pharmacyTransmissionColumns(), []);

  const { table } = useDataTable({
    data: dummyPharmacyTransmissions || [],
    columns,
    pageCount: -1,
  });

  return (
    <div className=" lg:p-3.5">
      <h1 className="text-2xl font-bold">Transmissions</h1>
      <h6 className="font-normal text-sm text text-slate">
        Recent transmission volume and statistics
      </h6>
      <div className="mt-3.5 ">
        <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
