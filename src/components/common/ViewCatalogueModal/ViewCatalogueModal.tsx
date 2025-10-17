import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetPharmacyCatalogueQuery } from "@/redux/services/pharmacy";
// import { MedicationCatalogueCard } from "@/components/common/Card/medication-catalogue-card";
import { useSearchParams } from "react-router-dom";
import { PaginationWithLinks } from "@/components/common/PaginationLink/PaginationLink";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrgMedicationCatalogueCard } from "../OrgMedicationCatalogueCard/OrgMedicationCatalogueCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ViewCatalogueModal({ pharmacy }: any) {
  const [open, setOpen] = useState(false);
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

  console.log("data>>", data);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="h-8 w-8 p-0 hover:bg-blue-50"
          >
            <Eye className="h-6 w-6 text-gray-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View pharmacy catalogues</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-6xl p-5 max-h-[80vh] overflow-y-scroll flex flex-col">
          <DialogHeader>
            <DialogTitle>Catalogue</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 mt-5 min-h-0">
            {data?.data?.length === 0 ? (
              <div className="flex justify-center items-center h-full text-2xl text-gray-500">
                No catalogues available for this pharmacy.
              </div>
            ) : (
              <OrgMedicationCatalogueCard data={data} />
            )}
          </ScrollArea>

          <div className="mt-4 flex-shrink-0">
            <PaginationWithLinks
              page={page}
              pageSize={perPage}
              totalCount={data?.meta?.itemCount}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
