import { StatusBadge } from "../StatusBadge/StatusBadge";
import { type FulfillmentTrackingResponse } from "@/types/responses/IViewTransmissionFullfillmentDetail";

interface FulfillmentHeaderProps {
  data: FulfillmentTrackingResponse | undefined;
}

export function FulfillmentHeader({ data }: FulfillmentHeaderProps) {
  return (
    <div>
      <div className="p-3 bg-[#F7F1FD] text-black rounded-[6px] space-y-3">
        <div className="flex justify-between">
          <p className="text-sm font-normal">Transmission Id</p>
          <p className="text-sm font-medium">{data?.data?.transmissionId}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Pharmacy</p>
          <p className="text-sm font-medium">
            {data?.data?.pharmacy?.name}{" "}
            {data?.data?.pharmacy?.address?.address1}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">
            {data?.data?.subOrganization ? "Sub-Organization" : "Organization"}
          </p>
          <p className="text-sm font-medium">
            {data?.data?.subOrganization
              ? data?.data?.subOrganization?.name
              : data?.data?.organization?.name}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Patient</p>
          <p className="text-sm font-medium">
            {data?.data?.patient?.firstName} {data?.data?.patient?.lastName}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm font-normal">Status</p>
          <StatusBadge status={data?.data?.status as string} />
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-normal">Prescriptions</p>
          <p className="text-sm font-medium">
            {Array.isArray(data?.data?.prescriptions)
              ? data?.data?.prescriptions?.length
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
