import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useMemo } from "react";
import { useDataTable } from "@/hooks/use-data-table";
// import { useSearchParams } from "react-router-dom";
import { pendingTransmissions } from "@/constants";
import { pendingTransmissionColumns } from "@/components/data-table/columns/pending-transmission";

export default function PendingTransmissions() {
  //   const [searchParams] = useSearchParams();
  //   const page = parseInt(searchParams.get("page") || "1", 10);
  //   const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  //   const name = searchParams.get("organization") ?? "";

  const columns = useMemo(() => pendingTransmissionColumns(), []);

  const { table } = useDataTable({
    data: pendingTransmissions || [],
    columns,
    pageCount: -1,
  });

  return (
    <>
      <DataTable table={table} scrollClass={true} />
      <DataTablePagination table={table} />
    </>
  );
}
