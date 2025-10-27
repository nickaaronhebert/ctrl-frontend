import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRevokeCredentialsMutation } from "@/redux/services/admin";

import { Trash } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

export function RevokeCredentialsDialog({ id }: { id: string }) {
  const [revokeCredentials] = useRevokeCredentialsMutation();

  const handleRevokeCredentials = useCallback(async () => {
    await revokeCredentials(id)
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Credentials Revoked Successfully", {
          duration: 1500,
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <Trash size={18} stroke="red" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            credentials.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRevokeCredentials}
            className="bg-destructive text-white hover:bg-destructive"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
