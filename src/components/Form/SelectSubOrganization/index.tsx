import { useDebounce } from "@/hooks/use-debounce";
import { useCallback, useState } from "react";
import SelectElement from "../select-element";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";

export function SelectSubOrganization() {
  //   const form = useFormContext();
  const [subOrgQuery, setSubOrgQuery] = useState("");
  const debouncedSubOrgQuery = useDebounce(subOrgQuery, 400);
  const { data: subOrgOptions } = useViewAllSubOrganizationQuery(
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

  const handleSubOrganization = useCallback((value: string) => {
    setSubOrgQuery(value);
  }, []);

  return (
    <div className="">
      <SelectElement
        name="subOrganization"
        options={subOrgOptions}
        label="Sub-Organization"
        isRequired={true}
        className="w-full min-h-[56px]"
        placeholder="Select an Sub-Organization"
        onSearch={handleSubOrganization}
        searchValue={subOrgQuery}
        errorClassName="text-right"
        labelClassName="text-sm font-semibold"
      />
    </div>
  );
}
