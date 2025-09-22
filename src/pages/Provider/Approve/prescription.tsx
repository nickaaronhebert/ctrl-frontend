import { formatDateMMDDYYYY } from "@/lib/utils";
import { useViewAllPrescriptionsQuery } from "@/redux/services/provider";
import type { PrescriptionDetails } from "@/types/responses/IViewAllPrescriptions";

import { Dot } from "lucide-react";
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
        <prescription-viewer-btn
          prescription-id={data?.id}
        ></prescription-viewer-btn>
      </div>
      <div>
        <detail-prescription-viewer
          prescription-id={data?.id}
        ></detail-prescription-viewer>
      </div>
    </div>
  );
}

export default function Prescriptions() {
  const { data } = useViewAllPrescriptionsQuery({ page: 1, perPage: 10 });

  return (
    <div className="p-2.5">
      <h4 className="text-3xl font-semibold ">Prescriptions</h4>
      <p className="text-sm font-normal text-muted-foreground">
        Review and manage prescription transmission requests
      </p>
      <div className="w-full p-7">
        <div className=" bg-white p-6 border border-[#E8ECEF] rounded-bl-[10px] rounded-br-[10px] space-y-7">
          {data?.data?.map((item: PrescriptionDetails) => {
            return <PrescriptionDetailView data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
