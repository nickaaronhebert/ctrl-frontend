import { type FulfillmentData } from "@/types/global/commonTypes";
import { StatusBadge } from "../StatusBadge/StatusBadge";

interface FulfillmentHeaderProps {
  data: FulfillmentData;
}

export function FulfillmentHeader({ data }: FulfillmentHeaderProps) {
  return (
    <div>
      <div className="p-3 bg-[#F7F1FD] text-black rounded-[6px] space-y-3">
        <div className="flex justify-between">
          <p className="text-sm font-normal">Transmission Id</p>
          <p className="text-sm font-medium">{data?.transmissionId}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Pharmacy</p>
          <p className="text-sm font-medium">{data?.pharmacy?.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Patient</p>
          <p className="text-sm font-medium">{data?.patient?.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Status</p>
          <StatusBadge status={data?.status as string} />
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Prescriptions</p>
          <p className="text-sm font-medium">{data?.prescriptionCount}</p>
        </div>
      </div>
    </div>
  );
}
