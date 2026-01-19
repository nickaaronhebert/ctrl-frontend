import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { PaginationWithLinks } from "@/components/common/PaginationLink/PaginationLink";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetCataloguePlanQuery } from "@/redux/services/pharmacy";
import { useParams } from "react-router-dom";
import { PlanCatalogueCard } from "@/components/common/Card/plan-catalogue-card";
import { useEffect, useMemo } from "react";
import { type Variant } from "@/types/global/commonTypes";
import type { PharmacyCatalogue } from "@/types/responses/medication";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";

const PharmacyCatalogueDetails = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { id } = useParams();
  const navigate = useNavigate();
  const { clearAll, setPrices } = useMedication();

  useEffect(() => {
    clearAll();
    setPrices({});
  }, []);

  const {
    data: cataloguePlan,
    isLoading: isCataloguePlanLoading,
    error,
  } = useGetCataloguePlanQuery(
    {
      phmCatalogueVariantId: id!,
      q: "",
    },
    {
      skip: !id,
    }
  );

  const sortedCatalogue = useMemo(() => {
    if (!cataloguePlan?.data) return [];

    return cataloguePlan?.data
      .slice()
      .map((item: PharmacyCatalogue) => ({
        ...item,
        productVariant: item.productVariant
          ?.slice()
          ?.sort((a: Variant, b: Variant) => {
            return a?.productVariant?.name!?.localeCompare(
              b?.productVariant?.name!,
              undefined,
              {
                numeric: true,
                sensitivity: "base",
              }
            );
          }),
      }))
      .sort((a: Variant, b: Variant) =>
        a?.medicationCatalogue?.drugName?.localeCompare(
          b?.medicationCatalogue?.drugName!,
          undefined,
          { sensitivity: "base" }
        )
      );
  }, [cataloguePlan?.data]);

  if (isCataloguePlanLoading) {
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
              onClick={() =>
                navigate(`/pharmacy/medications/modify-plan-prices/${id}`)
              }
              className="w-[143px] min-w-[110px] min-h-[40px] rouned-[50px] bg-black px-[20px] py-[5px] text-white hover:bg-black cursor-pointer"
            >
              Modify Pricing
            </Button>
            <Button
              onClick={() =>
                navigate(`/pharmacy/medications/configure-catalogues/${id}`)
              }
              className="w-[143px] min-w-[110px] min-h-[40px] rouned-[50px] bg-primary px-[20px] py-[5px] text-white hover:bg-primary cursor-pointer"
            >
              Add Medications
            </Button>
          </div>
        </div>
      </div>
      {cataloguePlan?.data?.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] mt-10 max-w-[500px] mx-auto">
          <p className="text-center text-gray-500 text-lg">
            No medications available in the pharmacy catalogue at the moment.
            Please add medications or check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <PlanCatalogueCard
              data={{ ...cataloguePlan, data: sortedCatalogue }}
              id={id}
            />
          </div>
          <PaginationWithLinks
            page={page}
            pageSize={perPage}
            totalCount={cataloguePlan?.meta?.itemCount}
          />
        </>
      )}
    </div>
  );
};

export default PharmacyCatalogueDetails;
