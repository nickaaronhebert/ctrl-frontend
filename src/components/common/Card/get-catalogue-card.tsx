import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import BottomPopup from "@/components/common/BottomPopup/BottomPopup";
import { useNavigate } from "react-router-dom";
import { useGetPharmacyCatalogueQuery } from "@/redux/services/pharmacy";
import CatalogueSelector from "../CatalogueSelector/CatalogueSelector";
import { PaginationWithLinks } from "../PaginationLink/PaginationLink";
import { useParams } from "react-router-dom";

const GetAllCatalogues = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const plan = searchParams.get("plan");
  const q = searchParams.get("q") || "";
  const { id } = useParams();
  const { data, isLoading } = useGetPharmacyCatalogueQuery({
    page,
    perPage,
    q,
  });
  const { setCatalogues } = useMedication();

  useEffect(() => {
    if (data?.data) {
      setCatalogues(data?.data);
    }
  }, [data, setCatalogues]);

  const handleCreateCatalogueFromPopup = () => {
    navigate(`/pharmacy/medications/selected-catalogues/${id}?plan=${plan}`);
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
          to={"/pharmacy/medications/catalogues"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Medications"}
        </Link>
        <h1 className="text-2xl font-bold mt-1">
          {plan?.charAt(0).toUpperCase() + "" + plan?.slice(1)} - Add
          Medications
        </h1>
      </div>
      {!isLoading && data?.data?.length === 0 && !q ? (
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
      <PaginationWithLinks
        page={page}
        pageSize={perPage}
        totalCount={data?.meta?.itemCount}
      />
    </div>
  );
};

export default GetAllCatalogues;
