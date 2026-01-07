import { DataTable } from "@/components/data-table/data-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { useViewShippingQuery } from "@/redux/services/shipping";
import { shippingColumn } from "@/components/data-table/columns/shipping-column";
import CreateShippingDialog from "@/components/common/CreateShippingDialog/CreateShippingDialog";
import GlobalShippingDialog from "@/components/common/GlobalShippingDialog/GlobalShippingDialog";

export default function ShippingConfiguration() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { data, isLoading, isError } = useViewShippingQuery({
    page,
    perPage,
    q: "",
  });

  const handleEdit = (id: string) => {
    setProfileId(id);
    setOpen(true);
  };

  const columns = useMemo(() => shippingColumn({ onEdit: handleEdit }), []);

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    pageCount: data?.meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className=" lg:p-3.5">
          <h1 className="text-2xl font-bold">Shipping Configuration</h1>
          <h6 className="font-normal text-sm text text-slate">
            Manage shipping classes and global settings
          </h6>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setOpenGlobalModal(true)}
            className="rounded-[50px] px-[20px] py-[5px] min-h-[40px] text-white font-semibold text-[12px] bg-black hover:bg-black cursor-pointer"
          >
            Global Settings
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
              setProfileId(undefined);
            }}
            className="rounded-[50px] px-[20px] py-[5px] min-h-[40px] text-white font-semibold text-[12px] bg-primary cursor-pointer"
          >
            Create Shipping Class
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
      {open && (
        <CreateShippingDialog
          open={open}
          onOpenChange={setOpen}
          profileId={profileId ?? undefined}
          setProfileId={setProfileId}
        />
      )}
      {openGlobalModal && (
        <GlobalShippingDialog
          open={openGlobalModal}
          onOpenChange={setOpenGlobalModal}
        />
      )}
    </>
  );
}
