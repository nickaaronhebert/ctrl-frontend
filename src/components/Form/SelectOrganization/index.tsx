import { useDebounce } from "@/hooks/use-debounce";
import { useCallback, useState } from "react";
import SelectElement from "../select-element";
import { useViewAllOrganizationQuery } from "@/redux/services/admin";

export function SelectOrganization() {
  const [orgQuery, setOrgQuery] = useState("");
  const debouncedSubOrgQuery = useDebounce(orgQuery, 400);
  const { data: orgOptions } = useViewAllOrganizationQuery(
    { page: 1, perPage: 100, q: debouncedSubOrgQuery },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: `${item.id}`,
            label: `${item.name}`,
          })) ?? [],
      }),
    }
  );

  const handleOrganization = useCallback((value: string) => {
    setOrgQuery(value);
  }, []);

  return (
    <div className="">
      <SelectElement
        name="organization"
        options={orgOptions}
        label="Organization"
        isRequired={true}
        className="w-full min-h-[56px] border-[#9EA5AB]"
        placeholder="Select Organization"
        onSearch={handleOrganization}
        searchValue={orgQuery}
        errorClassName="text-right"
        labelClassName="font-semibold text-sm"
      />
    </div>
  );
}
