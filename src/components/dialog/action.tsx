import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";
import {
  useAcceptConnectionInviteMutation,
  useRejectConnectionInviteMutation,
} from "@/redux/services/pharmacy";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AffiliatedProviders } from "../common/AffiliateProviders/AffiliateProviders";
import { BillingFrequencySelector } from "../common/BillingFrequencySelector/BillingFrequencySelector";
import { CreateOrganizationCredentialsModal } from "../common/CreateOrganizationCredentialsModal/CreateOrganizationCredentialsModal";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";
import { SubOrganizations } from "../common/SubOrganizations/SubOrganizations";

interface PharmacyConnectDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  email: string;
  phoneNumber: string;
  invitationId: string;
  status: string;
  isAffiliationActive: boolean;
}

export type BillingFrequency = "daily" | "weekly" | "monthly";

export default function OrganizationConnectActionDialog({
  id,
  invitationId,
  name,
  email,
  phoneNumber,
  open,
  setOpen,
  status,
  isAffiliationActive,
}: PharmacyConnectDialogProps) {
  const [rejectInvitation] = useRejectConnectionInviteMutation();
  const [acceptInvitation] = useAcceptConnectionInviteMutation();
  const [selected, setSelected] = useState<BillingFrequency>("daily");
  const [checked, setChecked] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "affiliatedProviders" | "billing" | "subOrgs"
  >("billing");
  const [showCredentialsModal, setShowCredentailsModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (open && status === "accepted" && !isAffiliationActive) {
      setOpen(false);
      setShowCredentailsModal(true);
    }
  }, [open, status, isAffiliationActive, setOpen]);

  async function handleAcceptInvitation() {
    await acceptInvitation({
      invitation: invitationId,
      invoiceFrequency: selected,
      generateExternalInvoice: checked,
    })
      .unwrap()
      .then(() => {
        toast.success("Invitation accepted successfully", {
          duration: 1500,
        });
        setOpen(false);
        setShowCredentailsModal(true);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 1500,
        });
      });
  }

  async function handleRejectInvitation() {
    await rejectInvitation(invitationId)
      .unwrap()
      .then(() => {
        toast.error("Invitation rejected", {
          duration: 1500,
        });
        setOpen(false);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 1500,
        });
      });
  }
  const { data } = useViewAffiliateProvidersQuery(
    { page: 1, perPage: 100, organization: id },
    {
      skip: !open,
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const { data: subOrgData } = useViewAllSubOrganizationQuery(
    {
      page: 1,
      perPage: 100,
      q: "",
      parentOrganization: id,
    },
    {
      skip: !open || !id,
      selectFromResult: ({ data, isLoading }) => ({
        data: data?.data,
        isLoading,
      }),
    }
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[700px] ">
          <DialogTitle className="pt-4 pb-2 px-5 border-b  ">
            Request Details
          </DialogTitle>

          <DialogDescription className="text-base text-black font-semibold px-5">
            Organization Information
          </DialogDescription>

          <div className="px-5">
            <div className="p-2 bg-fuchsia-100 text-black rounded-[6px] space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-normal">Name</p>
                <p className="text-sm font-medium">{name}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-normal">Email</p>
                <p className="text-sm font-medium">{email}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-normal">Phone</p>
                <p className="text-sm font-medium">{phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full px-5  mb-4 items-center">
            <Button
              size={"xxl"}
              variant={"tabs"}
              className={cn(
                activeTab === "billing"
                  ? "bg-primary text-white"
                  : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
                "p-[30px] w-[33%]"
              )}
              onClick={() => setActiveTab("billing")}
            >
              <span className=" font-medium text-base mx-2.5">
                Billing Cycle
              </span>
            </Button>
            <Button
              size={"xxl"}
              variant={"tabs"}
              className={cn(
                activeTab === "affiliatedProviders"
                  ? "bg-primary text-white"
                  : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
                "p-[30px] w-[33%]"
              )}
              onClick={() => setActiveTab("affiliatedProviders")}
            >
              <span className=" font-medium text-base mx-2.5">
                Affiliate Providers
              </span>
            </Button>
            <Button
              size={"xxl"}
              variant={"tabs"}
              className={cn(
                activeTab === "subOrgs"
                  ? "bg-primary text-white"
                  : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
                "p-[30px] w-[33%]"
              )}
              onClick={() => setActiveTab("subOrgs")}
            >
              <span className=" font-medium text-base mx-2.5">
                Sub-Organizations
              </span>
            </Button>
          </div>

          {activeTab === "affiliatedProviders" && (
            <AffiliatedProviders data={data} />
          )}
          {activeTab === "billing" && (
            <BillingFrequencySelector
              selected={selected}
              setSelected={setSelected}
              checked={checked}
              setChecked={setChecked}
            />
          )}

          {activeTab === "subOrgs" && <SubOrganizations data={subOrgData} />}

          <DialogFooter className="p-5">
            <Button
              variant={"ctrl"}
              size={"lg"}
              className="min-w-40 bg-[#21BB72] text-white rounded-[18px]"
              onClick={handleAcceptInvitation}
            >
              {" "}
              Accept
            </Button>

            <Button
              variant={"transparent"}
              size={"lg"}
              onClick={handleRejectInvitation}
              className="min-w-40 text-[#E31010] border-[#E31010] bg-white rounded-[18px]"
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CreateOrganizationCredentialsModal
        open={showCredentialsModal}
        setOpen={setShowCredentailsModal}
        organizationName={name}
        id={id}
        invitation={invitationId}
      />
    </>
  );
}
// phm::bb68a627-ce0f-477d-866f-8106a8aeb928
