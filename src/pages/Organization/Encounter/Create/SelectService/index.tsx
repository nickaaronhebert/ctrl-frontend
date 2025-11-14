import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetEncounteredProductsQuery } from "@/redux/services/encounter";
import type { EncounteredProduct } from "@/types/responses/IGetAllEncounteredProducts";

interface ServiceSearchProps {
  selectedService?: string | null;
  onSelect: (
    displayText: string | null,
    id: string | null,
    output: "ctrl_order_approval" | "pdf_document" | ""
  ) => void;
}

export function ServiceSearch({
  selectedService,
  onSelect,
}: ServiceSearchProps) {
  const [search, setSearch] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (selectedService) {
      setDisplayValue(selectedService);
      setSearch(""); // clear query so API doesn’t run
    } else {
      setDisplayValue("");
      setSearch("");
    }
  }, [selectedService]);

  const { data, isFetching } = useGetEncounteredProductsQuery(
    {
      page: 1,
      perPage: 10,
      q: debouncedSearch,
    },
    {
      skip: debouncedSearch.trim().length === 0,
      selectFromResult: ({ data, isFetching }) => {
        return {
          data: data?.data,
          isFetching: isFetching,
        };
      },
    }
  );

  const handleClearSearch = () => {
    setDisplayValue("");
    setSearch("");
    onSelect("", "", "");
  };

  return (
    <div className="space-y-2 ">
      <div className="relative">
        <Input
          id="service"
          name="service"
          className="border-[#9EA5AB]"
          type="text"
          placeholder="Search service..."
          value={displayValue}
          onChange={(e) => {
            if (!selectedService) {
              setDisplayValue(e.target.value);
              setSearch(e.target.value); // only update query if no selection
            }
          }}
          readOnly={!!selectedService}
        />

        {search || selectedService ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        )}
      </div>

      {search && !selectedService && (
        <ul className="border border-gray-300 rounded-[10px] divide-y p-1">
          {isFetching ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : data?.length ? (
            data?.map((service: EncounteredProduct) => (
              <li
                key={service.id}
                className="p-2 hover:bg-gray-100 cursor-pointer border-0 flex text-sm font-normal gap-0.5"
                onClick={() => {
                  onSelect(`${service.name}`, service.id, service.output);
                  setDisplayValue(`${service.name}`);
                  setSearch(""); // clear search query so API doesn’t re-run
                }}
              >
                <span className="font-medium text-black">{service.name}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 text-sm">
              No Such Service Exists!
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
