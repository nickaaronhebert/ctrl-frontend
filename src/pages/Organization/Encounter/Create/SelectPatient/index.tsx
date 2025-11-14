import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPatientDetailsQuery } from "@/redux/services/patientApi";

import type { PatientDetails } from "@/types/responses/patient";
import { useDebounce } from "@/hooks/use-debounce";
import type { Address } from "@/types/global/commonTypes";

interface PatientSearchProps {
  selectedPatient?: string | null;
  onSelect: (
    displayText: string | null,
    id: string | null,
    addresses: Address[] | []
  ) => void;
}

export function PatientSearch({
  selectedPatient,
  onSelect,
}: PatientSearchProps) {
  const [search, setSearch] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (selectedPatient) {
      setDisplayValue(selectedPatient);
      setSearch(""); // clear query so API doesn’t run
    } else {
      setDisplayValue("");
      setSearch("");
    }
  }, [selectedPatient]);

  const { data, isFetching } = useGetPatientDetailsQuery(
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
    onSelect("", "", []);
  };

  return (
    <div className="space-y-2 ">
      <div className="relative">
        <Input
          id="patient"
          name="patient"
          className="border-[#9EA5AB] "
          type="text"
          placeholder="Search patient..."
          value={displayValue}
          onChange={(e) => {
            if (!selectedPatient) {
              setDisplayValue(e.target.value);
              setSearch(e.target.value); // only update query if no selection
            }
          }}
          readOnly={!!selectedPatient}
        />

        {search || selectedPatient ? (
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

      {search && !selectedPatient && (
        <ul className="border border-gray-300 rounded-[10px] divide-y p-1">
          {isFetching ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : data?.length ? (
            data?.map((patient: PatientDetails) => {
              return (
                <li
                  key={patient.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer border-0 flex text-sm font-normal gap-0.5"
                  onClick={() => {
                    onSelect(
                      `${patient.firstName} ${patient.lastName}, ${patient.phoneNumber}, ${patient.email}`,
                      patient.id,
                      patient.addresses
                    );
                    setDisplayValue(
                      `${patient.firstName} ${patient.lastName}, ${patient.phoneNumber}, ${patient.email}`
                    );
                    setSearch(""); // clear search query so API doesn’t re-run
                  }}
                >
                  <span className="font-medium text-black">
                    {patient.firstName}
                  </span>
                  <span className="font-medium text-black">
                    {" "}
                    {patient.lastName} ,
                  </span>
                  <span>{patient.phoneNumber} ,</span>
                  <span>{patient.email}</span>
                </li>
              );
            })
          ) : (
            <li className="p-2 text-gray-500 text-sm">No patients found</li>
          )}
        </ul>
      )}
    </div>
  );
}
