import { useDebounce } from "@/hooks/use-debounce";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SubOrganizationListingProps {
  subOrgValue: string | undefined;
  setSubOrgValue: (val: string) => void;
}

export default function SubOrganizationListing({
  subOrgValue,
  setSubOrgValue,
}: SubOrganizationListingProps) {
  const [subOrgQuery, setSubOrgQuery] = useState("");
  const debouncedSubOrgQuery = useDebounce(subOrgQuery, 400);

  const { data } = useViewAllSubOrganizationQuery(
    { page: 1, perPage: 400, q: debouncedSubOrgQuery },
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
      value={subOrgValue}
      onValueChange={(value) => {
        setSubOrgValue(value);
      }}
    >
      <SelectTrigger className="w-[180px] min-h-[48px] mb-2 border border-[#9EA5AB] bg-white">
        <SelectValue placeholder="All Organizations" />
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
              onChange={(e) => setSubOrgQuery(e.target.value)}
              value={subOrgQuery}
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
