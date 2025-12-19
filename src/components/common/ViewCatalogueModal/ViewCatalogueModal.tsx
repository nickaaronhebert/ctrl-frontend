import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPharmacyCatalogueQuery } from "@/redux/services/pharmacy";
// import { MedicationCatalogueCard } from "@/components/common/Card/medication-catalogue-card";
import { useSearchParams } from "react-router-dom";
import { PaginationWithLinks } from "@/components/common/PaginationLink/PaginationLink";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { OrgMedicationCatalogueCard } from "../OrgMedicationCatalogueCard/OrgMedicationCatalogueCard";
// import { ScrollArea } from "@/components/ui/scroll-area";

export function ViewCatalogueModal({ pharmacy, open, setOpen }: any) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);

  const { data, error, isLoading, isFetching } = useGetPharmacyCatalogueQuery(
    {
      page,
      perPage,
      pharmacy,
    },
    {
      skip: !open,
    }
  );

  // Avoid rendering content if still loading/fetching
  if (isLoading || isFetching) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-6xl p-5 max-h-[80vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Catalogue</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center h-[80vh]">
            <LoadingSpinner />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return <div>Error loading pharmacy catalogue.</div>;
  }

  const hasItems = data?.data?.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`min-w-6xl p-5 max-h-[80vh] overflow-y-auto flex flex-col transition-all duration-300 ${
          !hasItems ? "h-[250px]" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>Catalogue</DialogTitle>
        </DialogHeader>

        {/* Conditionally render content based on data */}
        <div className="mt-5 min-h-0 flex-1">
          {hasItems ? (
            <>
              <OrgMedicationCatalogueCard data={data} />
              <div className="pb-[10px] flex-shrink-0">
                <PaginationWithLinks
                  page={page}
                  pageSize={perPage}
                  totalCount={data?.meta?.itemCount}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-2xl text-gray-500">
              No catalogues available for this pharmacy.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
