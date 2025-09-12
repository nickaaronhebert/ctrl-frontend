import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetMedicationCatalogueQuery } from "@/redux/services/medication";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import MedicationSelector from "@/components/common/MedicationSelector/MedicationSelector";
import BottomPopup from "@/components/common/BottomPopup/BottomPopup";
import { useNavigate } from "react-router-dom";

const PharmacyMedicationsContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 100);
  const q = searchParams.get("q") || "";
  const { data, isLoading } = useGetMedicationCatalogueQuery({
    page,
    perPage,
    q: q,
  });
  const { setMedications } = useMedication();

  useEffect(() => {
    if (data?.data) {
      setMedications(data.data || []);
    }
  }, [data, setMedications]);

  const handleCreateCatalogueFromPopup = () => {
    navigate("/pharmacy/medications/selected-medications");
    console.log("Hello");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <LoadingSpinner />
        <span className="text-lg text-black font-semibold mt-2">
          Loading Medications
        </span>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/pharmacy/catalogue-creation"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Medication Catalogue"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Select Your Medications</h1>
      </div>
      {data?.data && (
        <div className="mt-5">
          <MedicationSelector
            searchParam={q}
            setSearchParams={setSearchParams}
          />
          <BottomPopup onCreateCatalogue={handleCreateCatalogueFromPopup} />
        </div>
      )}
    </div>
  );
};

export default PharmacyMedicationsContent;
