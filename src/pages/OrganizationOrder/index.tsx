import {
  organizationOrderColumns,
  type OrderDetails,
} from "@/components/data-table/columns/order";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useViewAllOrdersQuery } from "@/redux/services/order";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function OrganizationOrder() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const orderId = searchParams.get("orderId") ?? "";
  const { data: orderData, meta } = useViewAllOrdersQuery(
    { page, perPage, q: orderId },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );
  // console.log("ordersData", orderData);
  // console.log("meta", meta);
  const columns = useMemo(() => organizationOrderColumns(), []);
  const filterFields: DataTableFilterField<OrderDetails>[] = [
    {
      label: "Name",
      value: "orderId",
      placeholder: "Search By Order ID",
    },
  ];
  const { table } = useDataTable({
    data: orderData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className=" lg:p-3.5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <h6 className="font-normal text-sm text text-slate">
              Patient prescription orders and their transmission status
            </h6>
          </div>

          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />
        </div>
      </div>
      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
