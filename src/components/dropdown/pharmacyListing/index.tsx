import { useViewOrgPharmaciesTransmissionsV2Query } from "@/redux/services/transmission";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";

interface ConnectedPharmacyListing {
  pharmacyValue: string | undefined;
  setPharmacyValue: (val: string) => void;
}
export default function ConnectedPharmacyListing({
  pharmacyValue,
  setPharmacyValue,
}: ConnectedPharmacyListing) {
  const [pharmacyQuery, setPharmacyQuery] = useState("");
  const debouncedPharmacyQuery = useDebounce(pharmacyQuery, 400);
  const { data } = useViewOrgPharmaciesTransmissionsV2Query(
    {
      page: 1,
      perPage: 100,
      q: debouncedPharmacyQuery,
      connectionStatus: "connected",
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

  return (
    <Select
      value={pharmacyValue}
      onValueChange={(value) => {
        setPharmacyValue(value);
      }}
    >
      <SelectTrigger className="w-[180px] min-h-[48px] mb-2 border border-[#9EA5AB] bg-white">
        <SelectValue placeholder="All Pharmacies" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>All Pharmacies</SelectLabel> */}
          <div className="flex items-center px-2 border-b border-gray-200">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-full text-sm outline-none border-0 focus:outline-none placeholder:text-gray-400"
              onKeyDown={(e) => e.stopPropagation()} // prevent Radix Select hijacking keys
              onChange={(e) => setPharmacyQuery(e.target.value)}
              value={pharmacyQuery}
            />
          </div>
          {data?.map((item) => {
            return <SelectItem value={item?.id}>{item?.name}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
