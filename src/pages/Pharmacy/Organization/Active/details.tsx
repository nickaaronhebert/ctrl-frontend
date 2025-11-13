import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetConnectedOrganizationQuery } from "@/redux/services/pharmacy";
import { useParams } from "react-router-dom";
import PharmacyOrgAffiliateProviders from "./providers";
import ViewPharmacySubOrganization from "./sub-organizations";
import { CreateOrganizationCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateOrganizationCredentialsModal";
import type { BillingFrequency } from "@/components/dialog/action";
import { OrgInvoiceFrequencyDialog } from "@/components/common/InvoiceFrequencyDialog/OrgInvoiceFrequencyDialog";

const ActiveOrgDetails = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { id } = useParams();
  const { data, meta } = useGetConnectedOrganizationQuery(
    {
      page,
      perPage,
      status: "accepted",
      q: "",
    },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const singleOrg = data?.find((item) => item.organization?.id === id);
  const [activeStatus, setActiveStatus] = useState<"affiliates" | "subOrgs">(
    "affiliates"
  );
  const [openCredentialsForm, setOpenCredentialsForm] = useState(false);
  const [openBillingModal, setOpenBillingModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<BillingFrequency>(
    (singleOrg?.invoiceFrequency as BillingFrequency) || "daily"
  );

  useEffect(() => {
    if (singleOrg?.invoiceFrequency) {
      setSelected(singleOrg.invoiceFrequency as BillingFrequency);
    }
  }, [singleOrg]);

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

          <h1 className="text-2xl font-bold mt-1">
            {singleOrg?.organization?.name}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setOpenCredentialsForm(true)}
            className="bg-primary-foreground hover:bg-primary-foreground cursor-pointer rounded-full text-white py-2.5 px-7 h-12"
          >
            Modify Credential
          </Button>
          <Button
            onClick={() => setOpenBillingModal(true)}
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
              <p className="text-sm font-medium">
                {singleOrg?.organization?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Email</p>
              <p className="text-sm font-medium">
                {singleOrg?.organization?.email}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Phone</p>
              <p className="text-sm font-medium">
                {singleOrg?.organization?.phoneNumber}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Status</p>
              <StatusBadge status={singleOrg?.status as string} />
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Billing</p>
              <p className="text-sm font-medium">
                {singleOrg?.invoiceFrequency?.toUpperCase()}
              </p>
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

          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "subOrgs"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("subOrgs")}
          >
            Sub-Organizations
          </Button>
        </div>

        <div className="pb-[12px] px-3.5">
          {activeStatus === "affiliates" ? (
            <PharmacyOrgAffiliateProviders organization={id as string} />
          ) : (
            <ViewPharmacySubOrganization organization={id as string} />
          )}
        </div>
      </div>

      {openCredentialsForm && (
        <CreateOrganizationCredentialsModal
          open={openCredentialsForm}
          setOpen={setOpenCredentialsForm}
          id={singleOrg?.organization?.id}
          invitation={singleOrg?.invitation}
          update={true}
        />
      )}

      {openBillingModal && (
        <OrgInvoiceFrequencyDialog
          open={openBillingModal}
          setOpen={setOpenBillingModal}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </>
  );
};

export default ActiveOrgDetails;
