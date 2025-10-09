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

interface PharmacyConnectDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  email: string;
  phoneNumber: string;
  invitationId: string;
}

export default function OrganizationConnectActionDialog({
  id,
  invitationId,
  name,
  email,
  phoneNumber,
  open,
  setOpen,
}: PharmacyConnectDialogProps) {
  const [rejectInvitation] = useRejectConnectionInviteMutation();
  const [acceptInvitation] = useAcceptConnectionInviteMutation();

  async function handleAcceptInvitation() {
    await acceptInvitation(invitationId)
      .unwrap()
      .then(() => {
        toast.success("Invitation accepted successfully", {
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
    { page: 1, perPage: 10, organization: id },
    {
      skip: !open,
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button
          variant={"transparent"}
          size={"lg"}
          className="min-w-24 rounded-[18px]"
        >
          Connect
        </Button>
      </DialogTrigger> */}
      <DialogContent className=" max-w-96 ">
        {/* <Separator className="my-3" /> */}
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

        <div className="px-5 pt-4">
          <div className="text-base font-semibold mb-4">
            Affiliates Provider
          </div>
          <div className="border  border-[#DFDFDF] rounded-[16px]">
            {data?.map((provider, index) => {
              return (
                <div
                  className={cn(
                    "flex justify-between  p-3  border-[#D9D9D9]",
                    index === data?.length - 1 ? "" : "border-b"
                  )}
                  key={provider.id}
                >
                  <div className=" w-[48%] text-sm font-semibold">{`${provider?.firstName} ${provider?.lastName}`}</div>
                  <div className={cn("w-[48%] text-sm font-normal text-end")}>
                    {provider?.npi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="p-5">
          <Button
            variant={"ctrl"}
            size={"lg"}
            className="min-w-40 bg-[#21BB72] text-white rounded-[18px]"
            // onClick={handleSendInvite}
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
  );
}
