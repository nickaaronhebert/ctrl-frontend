import { Button } from "@/components/ui/button";
import { useGetPharmacyCatalogueQuery } from "@/redux/services/pharmacy";
import { MedicationCatalogueCard } from "@/components/common/Card/medication-catalogue-card";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { PaginationWithLinks } from "@/components/common/PaginationLink/PaginationLink";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const PharmacyDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const navigate = useNavigate();

  const {
    data: defaultCatalogue,
    error,
    isLoading,
    isFetching,
  } = useGetPharmacyCatalogueQuery({
    page,
    perPage,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading pharmacy catalogue.</div>;
  }

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-[24px] leading-[30px] text-black">
              Medication Catalogue
            </h1>
            <span className="text-[14px] leading-[18px] text-gray-400 font-normal mt-1">
              Manage your default pricing catalogue
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => navigate("/pharmacy/medications/modify-prices")}
              className="w-[143px] min-w-[110px] min-h-[40px] rouned-[50px] bg-black px-[20px] py-[5px] text-white hover:bg-black cursor-pointer"
            >
              Modify Pricing
            </Button>
            <Button
              onClick={() => navigate("/pharmacy/medications/configure")}
              className="w-[143px] min-w-[110px] min-h-[40px] rouned-[50px] bg-primary px-[20px] py-[5px] text-white hover:bg-primary cursor-pointer"
            >
              Add Medications
            </Button>
          </div>
        </div>
      </div>
      {defaultCatalogue?.data?.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] mt-10 max-w-[500px] mx-auto">
          <p className="text-center text-gray-500 text-lg">
            No medications available in the pharmacy catalogue at the moment.
            Please add medications or check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <MedicationCatalogueCard data={defaultCatalogue} />
          </div>
          <PaginationWithLinks
            page={page}
            pageSize={perPage}
            totalCount={defaultCatalogue?.meta?.itemCount}
          />
        </>
      )}
    </div>
  );
};

export default PharmacyDetailsPage;
