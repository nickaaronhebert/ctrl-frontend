import { encounterColumns } from "@/components/data-table/columns/encounter/index";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useGetAllEncounterQuery } from "@/redux/services/encounter";
import type { Encounter } from "@/types/responses/IGetAllEncounter";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateEncounter } from "./Create";
// import { useNavigate } from "react-router-dom";

export default function ViewAllEncounter() {
  // const navigate = useNavigate();
  const [openEncounterModal, setOpenEncounterModal] = useState(false);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const patient = searchParams.get("patient") ?? "";
  const status = searchParams.get("status") ?? "";
  const { data: encounterData, meta } = useGetAllEncounterQuery(
    { page, perPage, q: patient, status },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => encounterColumns(), []);
  const filterFields: DataTableFilterField<Encounter>[] = [
    {
      label: "Status",
      value: "status",
      placeholder: "Filter By Status",
      options: [
        { label: "Started", value: "started" },
        { label: "In Review", value: "in_review" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },

    {
      label: "Name",
      value: "patient",
      placeholder: "Search By Patient",
    },
  ];

  const { table } = useDataTable({
    data: encounterData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className=" lg:p-3.5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Encounters</h1>
            {/* <h6 className="font-normal text-sm text text-slate">
              Patient prescription orders and their transmission status
            </h6> */}
          </div>

          <div className="flex gap-5 items-center">
            <DataTableToolbar
              inputClassName="!border-[#9EA5AB] !border"
              facetedClassName={"!border-[#9EA5AB]"}
              table={table}
              filterFields={filterFields}
              className="mb-2"
            />
            <CreateEncounter
              open={openEncounterModal}
              onOpenChange={setOpenEncounterModal}
            />
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
