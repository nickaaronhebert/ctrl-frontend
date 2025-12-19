import { cn } from "@/lib/utils";
import type { SubOrganization } from "@/types/responses/IGetAllSuborganization";

interface SubOrgProps {
  data: SubOrganization[] | undefined;
}

export const SubOrganizations = ({ data }: SubOrgProps) => {
  return (
    <div className={`px-5 pt-4  `}>
      {data?.length! > 0 ? (
        <div
          className={`border border-[#DFDFDF] rounded-[16px] max-h-[400px] ${
            data && data.length >= 10 ? "overflow-y-auto" : ""
          }`}
        >
          <div className="flex justify-between p-3 border-[#D9D9D9]">
            <p className="font-medium text-[11px] leading-[18px] text-[#3E4D61]">
              SUB ORGANIZATION NAME
            </p>
            <p className="font-medium text-[11px] leading-[18px] text-[#3E4D61]">
              EMAIL
            </p>
          </div>
          {data?.map((org, index) => (
            <div
              key={org.id}
              className={cn(
                "flex justify-between p-3 border-[#D9D9D9] ",
                index === data?.length - 1 ? "" : "border-b"
              )}
            >
              <div className="w-[48%] text-sm font-semibold">{`${org.name}`}</div>
              <div className="w-[48%] text-sm font-normal text-end">
                {org.email}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[120px] text-sm text-[#6B7280]">
          No suborganizations found
        </div>
      )}
    </div>
  );
};
