import { useDebounce } from "@/hooks/use-debounce";
import { useCallback, useState } from "react";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";
import SelectElement from "../select-element";

export function SelectProvider() {
  //   const form = useFormContext();
  const [providerQuery, setProviderQuery] = useState("");
  const debouncedProviderQuery = useDebounce(providerQuery, 400);
  const { data: providerOptions } = useViewAffiliateProvidersQuery(
    { page: 1, perPage: 20, q: debouncedProviderQuery },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: `${item.id}`,
            label: `${item.firstName} ${item.lastName}`,
          })) ?? [],
      }),
    }
  );

  const handleSearchProvider = useCallback((value: string) => {
    setProviderQuery(value);
  }, []);

  return (
    <div className="">
      <SelectElement
        name="selectProvider"
        options={providerOptions}
        label="Select Provider"
        isRequired={true}
        className="w-full min-h-[56px]"
        placeholder="Select the option"
        onSearch={handleSearchProvider}
        searchValue={providerQuery}
        errorClassName="text-right"
      />
    </div>
  );
}
