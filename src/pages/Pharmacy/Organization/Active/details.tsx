import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetLinkedOrganizationQuery } from "@/redux/services/pharmacy";
import { useParams } from "react-router-dom";
import PharmacyOrgAffiliateProviders from "./providers";
import ViewPharmacySubOrganization from "./sub-organizations";
import { CreateOrganizationCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateOrganizationCredentialsModal";
import type { BillingFrequency } from "@/components/dialog/action";
import { OrgInvoiceFrequencyDialog } from "@/components/common/InvoiceFrequencyDialog/OrgInvoiceFrequencyDialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetCatalogueListQuery } from "@/redux/services/pharmacy";
import { useSearchParams } from "react-router-dom";
import { useAssignPharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";
import { CatalogueOrganizationSelector } from "@/components/common/CatalogueOrganizationSelector/CatalogueOrganizationSelector";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ActiveOrgDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const [assignPharmacyCatalogue, { isLoading: isAssigning }] =
    useAssignPharmacyCatalogueMutation();

  const { data, isLoading } = useGetLinkedOrganizationQuery(id ?? "", {
    skip: !id,
  });

  const { data: catalogueList } = useGetCatalogueListQuery({
    page,
    perPage,
  });

  const [activeStatus, setActiveStatus] = useState<
    "affiliates" | "sharedSubOrgs" | "independentsubOrgs"
  >("affiliates");
  const [openCredentialsForm, setOpenCredentialsForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [openBillingModal, setOpenBillingModal] = useState<boolean>(false);
  const [openCatalogueModal, setOpenCatalogueModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<BillingFrequency>(
    (data?.data?.invoiceFrequency as BillingFrequency) || "daily"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);

  useEffect(() => {
    if (data?.data?.invoiceFrequency) {
      setSelected(data?.data?.invoiceFrequency as BillingFrequency);
    }
    // if (data?.data?.catalogueVariant?.name) {
    //   setSelectedPlan(data?.data?.catalogueVariant?.id);
    // }
  }, [data?.data]);

  const handleCatalogueChange = async (plan: string) => {
    setSelectedPlan(plan);
    try {
      await assignPharmacyCatalogue({
        organization: id as string,
        pharmacyCatalogueVariant: plan || "",
      }).unwrap();

      toast.success("Catalogue Plan Updated Successfully", {
        duration: 1500,
      });

      setOpenCatalogueModal(false);
    } catch (error) {
      console.error("Error updating catalogue plan:", error);
      const err = error as { data?: { message?: string } };
      const message =
        err?.data?.message ||
        "Failed to update pharmacy catalogue. Please try again.";
      toast.error(message, {
        duration: 1500,
      });
    }
  };

  const nonStandardCataloguesCount =
    catalogueList?.data?.filter((c) => c.name !== "Standard Catalogue")
      .length ?? 0;

  const dialogMinHeight =
    nonStandardCataloguesCount > 0 ? "min-h-[400px]" : "min-h-[100px]";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12 flex justify-between items-end">
        <div>
          <Link
            to={"/pharmacy/organizations"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Organizations"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">{data?.data?.name}</h1>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setOpenCredentialsForm(true)}
            className="bg-primary-foreground hover:bg-primary-foreground cursor-pointer rounded-full text-white py-2.5 px-7 h-12"
          >
            Modify Credential
          </Button>
          <Button
            onClick={() => {
              setOpenBillingModal(true);
              setIsEditing(true);
            }}
            className="bg-primary text-white rounded-full hover:bg-primary cursor-pointer py-2.5 px-7 h-12"
          >
            Manage Status & Billing
          </Button>
        </div>
      </div>

      <div className="bg-white py-4 px-2 rounded-lg shadow-lg mt-10">
        <p className="text-base text-black font-semibold px-5 mb-4">
          Organization Information
        </p>

        <div className="px-5">
          <div className="p-3 bg-[#F7F1FD] text-black rounded-[6px] space-y-3">
            <div className="flex justify-between">
              <p className="text-sm font-normal">Name</p>
              <p className="text-sm font-medium">{data?.data?.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Email</p>
              <p className="text-sm font-medium">{data?.data?.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Phone</p>
              <p className="text-sm font-medium">{data?.data?.phoneNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Status</p>
              <StatusBadge status={data?.data?.status as string} />
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Billing Cycle</p>
              <p className="text-sm font-medium">
                {data?.data?.invoiceFrequency?.toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Assigned Catalogue</p>
              <div className="flex gap-2 items-center">
                <p className="text-sm font-semibold  underline">
                  {data?.data?.catalogueVariant?.name}
                </p>
                <SquarePen
                  onClick={() => setOpenCatalogueModal(true)}
                  color="grey"
                  className="cursor-pointer"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 my-3 p-3">
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "affiliates"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("affiliates")}
          >
            <span className=" font-medium text-base mx-2.5">
              Affiliate Providers
            </span>
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"xxl"}
                variant={"tabs"}
                className={cn(
                  activeStatus === "sharedSubOrgs"
                    ? "bg-primary text-white"
                    : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
                  "p-[30px]"
                )}
                onClick={() => setActiveStatus("sharedSubOrgs")}
              >
                Shared Sub Organizations
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                Shared organizations utlilize the settings of the parent
                organization
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"xxl"}
                variant={"tabs"}
                className={cn(
                  activeStatus === "independentsubOrgs"
                    ? "bg-primary text-white"
                    : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
                  "p-[30px]"
                )}
                onClick={() => setActiveStatus("independentsubOrgs")}
              >
                Independent Sub Organizations
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Configured and managed independently.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="pb-[12px] px-3.5">
          {activeStatus === "affiliates" ? (
            <PharmacyOrgAffiliateProviders organization={id as string} />
          ) : (
            <ViewPharmacySubOrganization
              organization={id as string}
              invitation={data?.data?.invitation as string}
              activeStatus={activeStatus}
              // data={data?.data}
              // setSelected={setSelected}
            />
          )}
        </div>
      </div>

      {openCredentialsForm && (
        <CreateOrganizationCredentialsModal
          open={openCredentialsForm}
          setOpen={setOpenCredentialsForm}
          id={data?.data?.id}
          invitation={data?.data?.invitation}
          update={true}
        />
      )}

      {openBillingModal && (
        <OrgInvoiceFrequencyDialog
          open={openBillingModal}
          setOpen={setOpenBillingModal}
          selected={selected}
          setSelected={setSelected}
          organization={data?.data?.id as string}
          isEditing={isEditing}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      {openCatalogueModal && (
        <Dialog open={openCatalogueModal} onOpenChange={setOpenCatalogueModal}>
          <DialogContent
            className={cn("sm:max-w-[600px] p-4", dialogMinHeight)}
          >
            <DialogHeader>
              <DialogTitle>Manage Catalogue</DialogTitle>
            </DialogHeader>
            <CatalogueOrganizationSelector
              data={catalogueList!}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={isAssigning}
                onClick={() => handleCatalogueChange(selectedPlan)}
                className="text-white cursor-pointer"
                type="submit"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ActiveOrgDetails;
