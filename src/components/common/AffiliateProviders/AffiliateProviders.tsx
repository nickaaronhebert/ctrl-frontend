import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AffiliatedProviders as Affiliate } from "@/types/responses/provider";

interface AffiliatedProvidersProps {
  data: Affiliate[] | undefined;
}

export const AffiliatedProviders = ({ data }: AffiliatedProvidersProps) => {
  return (
    <div className={`px-5 pt-4  `}>
      {data?.length! > 0 ? (
        <div
          className={`border border-[#DFDFDF] rounded-[16px] max-h-[400px] ${
            data && data.length >= 10 ? "overflow-y-auto" : ""
          }`}
        >
          <div className="flex justify-between items-center p-3 border-[#D9D9D9]">
            <p className="font-medium text-[11px] leading-[18px] text-[#3E4D61]">
              PROVIDER NAME
            </p>
            <p className="font-medium text-[11px] leading-[18px] text-[#3E4D61]">
              NPI
            </p>
            <Button className="bg-black cursor-pointer hover:bg-black text-white min-w-[70px] min-h-[28px] rounded-[4px] px-[10px] py-[5px]">
              DOWNLOAD
            </Button>
          </div>
          {data?.map((provider, index) => (
            <div
              key={provider.id}
              className={cn(
                "flex   p-3 border-[#D9D9D9] ",
                index === data?.length - 1 ? "" : "border-b"
              )}
            >
              <div className="text-sm font-semibold w-[45%]">
                {`${provider?.firstName} ${provider?.lastName}`}
              </div>
              <div className="text-sm font-normal">{provider?.npi}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[120px] text-sm text-[#6B7280]">
          No affiliated providers available
        </div>
      )}
    </div>
  );
};
