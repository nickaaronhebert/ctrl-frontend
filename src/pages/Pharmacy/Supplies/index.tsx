import { DataTable } from "@/components/data-table/data-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { useViewAllSuppliesQuery } from "@/redux/services/supplies";
import { suppliesColumns } from "@/components/data-table/columns/supplies";
import AddSupply from "@/components/common/AddSupply/AddSupply";

export default function PharmacySupplies() {
  const [searchParams] = useSearchParams();
  const [openCatalogueModal, setOpenCatalogueModal] = useState<boolean>(false);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { data, isLoading, isError } = useViewAllSuppliesQuery({
    page,
    perPage,
    q: "",
  });
  const columns = useMemo(() => suppliesColumns(), []);

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    pageCount: data?.meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className=" lg:p-3.5">
          <h1 className="text-2xl font-bold">Supplies Catalogue</h1>
          <h6 className="font-normal text-sm text text-slate">
            Manage pharmacy supplies inventory and pricing
          </h6>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setOpenCatalogueModal(true)}
            className="rounded-[50px] px-[20px] py-[5px] min-h-[40px] text-white font-semibold text-[12px] bg-primary cursor-pointer"
          >
            Add Supply
          </Button>
        </div>
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-2xl ">
        {isLoading && (
          <div className="flex justify-center items-center h-[30vh]">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && !isError && (
          <div>
            <DataTable table={table} headerClass={true} />
            <div className="py-2 px-3">
              <DataTablePagination table={table} />
            </div>
          </div>
        )}
      </div>

      {openCatalogueModal && (
        <AddSupply
          open={openCatalogueModal}
          onOpenChange={setOpenCatalogueModal}
        />
      )}
    </>
  );
}
