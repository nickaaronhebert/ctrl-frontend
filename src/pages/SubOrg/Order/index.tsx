import SubOrgSelect from "@/components/common/SubOrganizations/select";
import {
  // organizationOrderColumns,
  type OrderDetails,
} from "@/components/data-table/columns/order";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useViewAllOrdersQuery } from "@/redux/services/order";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";
import { subOrgOrderColumns } from "@/components/data-table/columns/sub-org-order";

export default function SubOrgOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const [value, setValue] = useState<string>("");
  const orderId = searchParams.get("orderId") ?? "";
  const { data: orderData, meta } = useViewAllOrdersQuery(
    { page, perPage, q: orderId, subOrganization: value },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    },
  );

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
    },
  );

  console.log("Value", value);

  const columns = useMemo(() => subOrgOrderColumns(), []);
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

          <div className="flex gap-5 items-center">
            <DataTableToolbar
              table={table}
              filterFields={filterFields}
              className="mb-0"
            />
            <SubOrgSelect
              value={value}
              setValue={setValue}
              data={subOrgData}
              table={table}
              placeholder="All Sub Organizations"
            />
            <Button
              className="px-[20px] py-[5px] min-h-[40px] hover:bg-primary-foreground cursor-pointer rounded-[50px] bg-primary-foreground text-white  font-semibold text-[12px] leading-[16px] "
              onClick={() => navigate("/org/create-order")}
            >
              Create Order
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
