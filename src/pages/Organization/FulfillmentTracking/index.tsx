// import TripleToggleSwitch from "@/components/common/TripleToggleSwitch";
import {
  useViewAllTransmissionFulfillmentsQuery,
  useViewAllTransmissionFulfillmentStatsQuery,
} from "@/redux/services/transmission";
import { useSearchParams } from "react-router-dom";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useMemo, useState } from "react";
import { transmissionFulfillmentColumns } from "@/components/data-table/columns/transmission-fulfillment";
import StatusCard from "@/components/common/StatusCard";
import CubeSVG from "@/assets/icons/Cube";
import { FileCheck, Truck } from "lucide-react";
import { PackageCheck } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { CircleX } from "lucide-react";
import type { IFulfillmentTracking } from "@/types/responses/IViewTransmissionFulfillments";
import ConnectedPharmacyListing from "@/components/dropdown/pharmacyListing";
import SubOrganizationListing from "@/components/dropdown/orgListing";
import { ShieldBan } from "lucide-react";
import { FulfillmentTrackingDialog } from "@/components/common/FulfillmentTrackingDialog/FulfillmentTrackingDialog";

export default function FulfillmentTracking() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const transmissionId = searchParams.get("transmissionId") ?? "";
  const pharmacyStatus = searchParams.get("pharmacyStatus") ?? "";
  const [pharmacyValue, setPharmacyValue] = useState<undefined | string>(
    undefined
  );
  const [subOrgValue, setSubOrgValue] = useState<undefined | string>(undefined);

  const handleTrackClick = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };
  const { data: statsData } = useViewAllTransmissionFulfillmentStatsQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const { data, meta } = useViewAllTransmissionFulfillmentsQuery(
    {
      page,
      perPage,
      transmissionId,
      pharmacyStatus,
      pharmacy: pharmacyValue,
      subOrganization: subOrgValue,
    },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(
    () => transmissionFulfillmentColumns(handleTrackClick),
    [handleTrackClick]
  );
  const filterFields: DataTableFilterField<IFulfillmentTracking>[] = [
    {
      label: "Name",
      value: "transmissionId",
      placeholder: "Search by transmission ID",
    },
    {
      label: "Pharmacy Status",
      value: "pharmacyStatus",
      placeholder: "Filter by All Statuses",
      options: [
        {
          label: "Processed",
          value: "PROCESSING",
        },
        {
          label: "In Shipping",
          value: "IN_SHIPPING",
        },
        {
          label: "Shipped",
          value: "SHIPPED",
        },
        {
          label: "Delivered",
          value: "PICKED_UP",
        },
        {
          label: "Cancelled",
          value: "CANCELLED",
        },
        {
          label: "Exception",
          value: "EXCEPTION",
        },
      ],
    },
  ];

  const { table } = useDataTable({
    data: data || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Fulfillment Tracking</h1>
            <p className="font-normal text-sm text-[#3E4D61]">
              Monitor pharmacy actions and fulfillment progress on transmitted
              orders
            </p>
          </div>

          {/* <div>
          <TripleToggleSwitch
          // labels={}
          />
        </div> */}
        </div>

        <div className="grid grid-cols-1 md:lg-grid-cols-3 lg:grid-cols-4 gap-2.5 my-4">
          <StatusCard
            title="Total"
            value={statsData?.total || "-"}
            description={"Last 7 Days"}
            descriptionColor="text-[#5456AD]"
            icon={CubeSVG}
            iconWrapperClassName="bg-purple-100 p-2 rounded-[10px]"
            // className="max-w-[206px]"
          />

          <StatusCard
            title="Processed"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "PROCESSING"
              )?.[0]?.count || 0
            }
            description={"Pharmacy filling"}
            descriptionColor="text-[#9C27B0]"
            iconWrapperClassName="bg-red-100 p-2 rounded-[10px]"
            icon={FileCheck}
            iconClassName="size-[20px] text-[#9C27B0]"
            // className="max-w-[206px]"
          />

          <StatusCard
            title="Ready to Ship"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "IN_SHIPPING"
              )?.[0]?.count || 0
            }
            description={"Awaiting pickup"}
            descriptionColor="text-[#FF9800]"
            iconWrapperClassName="bg-[#FFF4E5] p-2 rounded-[10px]"
            icon={PackageCheck}
            iconClassName="size-[22px] text-[#FF9800]"
            // className="max-w-[206px]"
          />

          <StatusCard
            title="Shipped"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "SHIPPED"
              )?.[0]?.count || 0
            }
            description={"In Transit"}
            descriptionColor="text-[#1C99E7]"
            iconWrapperClassName="bg-blue-100 p-2 rounded-[10px]"
            icon={Truck}
            iconClassName="size-[20px] text-[#1C99E7]"
            // className="max-w-[206px]"
          />

          <StatusCard
            title="Delivered"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "PICKED_UP"
              )?.[0]?.count || 0
            }
            description={"Completed"}
            descriptionColor="text-[#00B87C]"
            iconWrapperClassName="bg-green-100 p-2 rounded-[10px]"
            icon={CircleCheckBig}
            iconClassName="size-[20px] text-[#00B87C]"
            // className="max-w-[206px]"
          />

          <StatusCard
            title="Cancelled"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "CANCELLED"
              )?.[0]?.count || 0
            }
            description={"Cancelled"}
            descriptionColor="text-destructive"
            iconWrapperClassName="bg-red-100 p-2 rounded-[10px]"
            icon={CircleX}
            iconClassName="size-[20px] text-destructive"
          />

          <StatusCard
            title="Exception"
            value={
              statsData?.stats?.filter(
                (item: any) => item.status === "EXCEPTION"
              )?.[0]?.count || 0
            }
            description={"Exception"}
            descriptionColor="text-black"
            iconWrapperClassName="bg-gray-100 p-2 rounded-[10px]"
            icon={ShieldBan}
            iconClassName="size-[20px] text-black"
          />
        </div>

        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">Recent Activity</p>
          <DataTableToolbar
            inputClassName="!border-[#9EA5AB] !border"
            facetedClassName={"!border-[#9EA5AB]"}
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />
          <div className="flex gap-2">
            <ConnectedPharmacyListing
              pharmacyValue={pharmacyValue}
              setPharmacyValue={setPharmacyValue}
            />
            <SubOrganizationListing
              subOrgValue={subOrgValue}
              setSubOrgValue={setSubOrgValue}
            />
          </div>
        </div>

        <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
      <FulfillmentTrackingDialog
        open={open}
        onOpenChange={setOpen}
        id={selectedId as string}
      />
    </>
  );
}
