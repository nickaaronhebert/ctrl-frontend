import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPatientDetailsQuery } from "@/redux/services/patientApi";

import type { PatientDetails } from "@/types/responses/patient";
import { useDebounce } from "@/hooks/use-debounce";

interface PatientSearchProps {
  selectedPatient?: PatientDetails | null;
  onSelect: (patient: PatientDetails | null) => void;
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
      setDisplayValue(
        `${selectedPatient.firstName} ${selectedPatient.lastName}, ${selectedPatient.phoneNumber}, ${selectedPatient?.email}`
      );
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
    onSelect(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
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
        <ul className="border rounded-md divide-y">
          {isFetching ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : data?.length ? (
            data?.map((patient: PatientDetails) => (
              <li
                key={patient.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(patient);
                  setDisplayValue(
                    `${patient.firstName} ${patient.lastName}, ${patient.phoneNumber}, ${patient.email}`
                  );
                  setSearch(""); // clear search query so API doesn’t re-run
                }}
              >
                {patient.firstName} {patient.lastName} , {patient.phoneNumber},
                {patient.email}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No patients found</li>
          )}
        </ul>
      )}
    </div>
  );
}
