import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import BottomPopup from "@/components/common/BottomPopup/BottomPopup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetAvailablePlanCatalogueQuery } from "@/redux/services/pharmacy";
import CatalogueSelector from "@/components/common/CatalogueSelector/CatalogueSelector";

const ConfigureCatalogues = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const q = searchParams.get("q") || "";
  const { data, isLoading } = useGetAvailablePlanCatalogueQuery({
    page,
    perPage,
    q,
    phmCatalogueVariantId: id!,
  });

  const { setCatalogues } = useMedication();

  useEffect(() => {
    if (data?.data) {
      setCatalogues(data?.data);
    }
  }, [data, setCatalogues]);

  const handleCreateCatalogueFromPopup = () => {
    navigate(`/pharmacy/medications/selected-plan-catalogues/${id}`);
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
        <h1 className="text-2xl font-bold mt-1">Select Your Medications</h1>
      </div>
      {data?.data?.length === 0 ? (
        <div className="flex flex-col justify-center h-[80vh] items-center mt-10 text-center px-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Catalogue Already Created
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            You've already added all available medication variants to your
            catalogue. No more medications to add at the moment.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <CatalogueSelector
            searchParam={q}
            setSearchParams={setSearchParams}
          />
          <BottomPopup onCreateCatalogue={handleCreateCatalogueFromPopup} />
        </div>
      )}
    </div>
  );
};

export default ConfigureCatalogues;
