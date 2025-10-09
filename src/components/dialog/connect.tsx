import { Button } from "@/components/ui/button";
import Connect from "@/assets/images/connect.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSendConnectionInviteMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";

interface PharmacyConnectDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function PharmacyConnectDialog({
  id,
  open,
  setOpen,
}: PharmacyConnectDialogProps) {
  const [sendConnectionInvite] = useSendConnectionInviteMutation();
  async function handleSendInvite() {
    await sendConnectionInvite({ pharmacyId: id })
      .unwrap()
      .then(() => {
        toast.success("Invitation sent successfully", {
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
      <DialogContent className="p-9 max-w-96">
        <DialogTitle className="flex justify-center ">
          <div className="rounded-full bg-fuchsia-50 p-8  ">
            <img src={Connect} alt="PC" />
          </div>
        </DialogTitle>

        <DialogDescription className="text-center font-semibold text-2xl text-black">
          Are you sure you want to send connection request?
        </DialogDescription>

        <DialogFooter className="!justify-center">
          <DialogClose asChild>
            <Button variant={"transparent"} size={"xl"} className="min-w-40">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"ctrl"}
            size={"xl"}
            className="min-w-40"
            onClick={handleSendInvite}
          >
            {" "}
            Yes, Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
