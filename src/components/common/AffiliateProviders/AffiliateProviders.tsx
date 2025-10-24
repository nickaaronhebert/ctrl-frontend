import { cn } from "@/lib/utils";
import type { AffiliatedProviders as Affiliate } from "@/types/responses/provider";

interface AffiliatedProvidersProps {
  data: Affiliate[] | undefined;
}

export const AffiliatedProviders = ({ data }: AffiliatedProvidersProps) => {
  return (
    <div className="px-5 pt-4">
      <div className="border border-[#DFDFDF] rounded-[16px]">
        {data?.map((provider, index) => (
          <div
            key={provider.id}
            className={cn(
              "flex justify-between p-3 border-[#D9D9D9]",
              index === data?.length - 1 ? "" : "border-b"
            )}
          >
            <div className="w-[48%] text-sm font-semibold">
              {`${provider?.firstName} ${provider?.lastName}`}
            </div>
            <div className="w-[48%] text-sm font-normal text-end">
              {provider?.npi}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
