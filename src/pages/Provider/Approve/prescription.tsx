import { Pagination } from "@/components/common/Pagination";
import { formatDateMMDDYYYY } from "@/lib/utils";
import { useViewAllPrescriptionsQuery } from "@/redux/services/provider";
import type { PrescriptionDetails } from "@/types/responses/IViewAllPrescriptions";

import { Dot } from "lucide-react";
import { useState } from "react";
function PrescriptionDetailView({ data }: { data: PrescriptionDetails }) {
  return (
    <div className="shadow-[0px_2px_6px_0px_#00000014]">
      <div className="pr-5 py-3 bg-secondary rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-between">
        <div>
          <p className="text-base font-semibold pl-3.5">{`${data?.productVariant?.medicationCatalogue?.drugName} ${data?.productVariant?.strength} ${data?.productVariant?.quantityType}`}</p>
          <div className="flex pl-1">
            <p className="text-xs text-muted-foreground font-normal flex items-center">
              <Dot /> Patient ID {data?.patient?.patientId}
            </p>
            <p className="text-xs text-muted-foreground font-normal flex items-center">
              <Dot /> Created on {formatDateMMDDYYYY(data?.createdAt ?? "")}
            </p>
          </div>
        </div>
        {/* @ts-ignore */}
        <prescription-viewer-btn prescription-id={data?.id}>
          {/* @ts-ignore */}
        </prescription-viewer-btn>
      </div>
      <div>
        {/* @ts-ignore */}

        <detail-prescription-viewer prescription-id={data?.id}>
          {/* @ts-ignore */}
        </detail-prescription-viewer>
      </div>
    </div>
  );
}

export default function Prescriptions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // You can make this dynamic if needed
  const { data } = useViewAllPrescriptionsQuery({ page: currentPage, perPage });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (data?.meta?.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.meta?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const meta = data?.meta;

  return (
    <div className="p-2.5">
      <h4 className="text-3xl font-semibold ">Prescriptions</h4>
      <p className="text-sm font-normal text-muted-foreground">
        Review and manage prescription transmission requests
      </p>
      <div className="w-full p-7">
        <div className=" bg-white p-6 border border-[#E8ECEF] rounded-bl-[10px] rounded-br-[10px] space-y-7">
          {data?.data?.map((item: PrescriptionDetails) => {
            return <PrescriptionDetailView data={item} key={item.id} />;
          })}
        </div>
      </div>

      <div>
        {/* Pagination Component */}
        {meta && meta.pageCount > 1 && (
          <Pagination
            currentPage={meta.page}
            totalPages={meta.pageCount}
            onPageChange={handlePageChange}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            canPreviousPage={meta.hasPreviousPage}
            canNextPage={meta.hasNextPage}
          />
        )}
      </div>
    </div>
  );
}
