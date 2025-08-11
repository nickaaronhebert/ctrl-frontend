import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
// import { useSearchParams } from "react-router-dom";
import {
  medicationLibraryColumns,
  type Medication,
} from "@/components/data-table/columns/medication-library";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { dummyMedicationData } from "@/constants";
import CategorySelect from "@/components/common/CategorySelect/CategorySelect";

const Medications = () => {
  const [category, setCategory] = useState("");
  const columns = useMemo(() => medicationLibraryColumns(), []);

  const filterFields: DataTableFilterField<Medication>[] = [
    {
      label: "Name",
      value: "drugName",
      placeholder: "Search By Medication Name",
    },
  ];

  const { table } = useDataTable({
    data: dummyMedicationData || [],
    columns,
    filterFields,
    pageCount: -1,
  });
  return (
    <>
      <div className="lg:p-3.5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Medication Library</h1>
            <h6 className="font-normal text-sm text text-slate">
              Browse standardized medication definitions
            </h6>
          </div>

          <div className="flex gap-1 items-center">
            <DataTableToolbar
              table={table}
              filterFields={filterFields}
              searchIcon={<Search className="w-5 h-5" />}
              className=" h-full"
            />
            <CategorySelect
              categories={["Type 2 Diabetes", "Weight Management", "Obesity"]}
              selected={category}
              setSelected={setCategory}
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
};

export default Medications;
