import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

const Medications = () => {
  return (
    <div className="lg:p-3.5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <h6 className="font-normal text-sm text text-slate">
            Patient prescription orders and their transmission status
          </h6>
        </div>

        {/* <DataTableToolbar
                table={table}
                filterFields={filterFields}
                className="mb-2"
              /> */}
      </div>
    </div>
  );
};

export default Medications;
