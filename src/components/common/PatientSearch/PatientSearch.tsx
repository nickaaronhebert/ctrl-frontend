import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPatientDetailsQuery } from "@/redux/services/patientApi";
import { type Patient } from "@/types/global/commonTypes";

interface PatientSearchProps {
  selectedPatient?: Patient | null;
  onSelect: (patient: Patient | null) => void;
}

export function PatientSearch({
  selectedPatient,
  onSelect,
}: PatientSearchProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedPatient) {
      setSearch(
        `${selectedPatient.firstName} ${selectedPatient.lastName}, ${selectedPatient.phoneNumber}, ${selectedPatient?.email}`
      );
    } else {
      setSearch("");
    }
  }, [selectedPatient]);

  const { data, isFetching } = useGetPatientDetailsQuery(
    {
      page: 1,
      perPage: 10,
      q: search,
    },
    {
      skip: search.trim().length === 0,
    }
  );

  const handleClearSearch = () => {
    setSearch("");
    onSelect(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search ? (
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
          ) : data?.data?.length ? (
            data?.data?.map((patient: any) => (
              <li
                key={patient.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(patient);
                  // setSearch("");
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
