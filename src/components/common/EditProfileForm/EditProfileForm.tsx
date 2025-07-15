import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import {
  editProfileSchema,
  type EditProfile,
} from "@/schemas/editProfileSchema";
import InputField from "../InputField/InputField";
import type { UserDetails } from "@/types/responses/user-details";
import { useEditProfileMutation } from "@/redux/services/authApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface EditProfileDialogProps {
  user: UserDetails;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
  user,
}: EditProfileDialogProps) {
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
  });

  const [editProfile, { isSuccess, isError }] = useEditProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Updated Successfully");
      onOpenChange?.(false);
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError]);

  async function onSubmit(values: EditProfile) {
    const { email, ...payload } = values;
    try {
      await editProfile(payload).unwrap();
    } catch (err) {
      console.error("Update error:", err);
    }
  }
  function onCancel() {
    form.reset();
    onOpenChange?.(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[520px] w-[520px] min-h-[446px] rounded-[15px] ">
        <DialogHeader className="flex px-[20px] py-[16px] justify-between items-center border border-b-gray-200 border-t-0 border-l-0 border-r-0">
          <DialogTitle className="text-lg font-medium">
            Edit Profile
          </DialogTitle>
          <X className="cursor-pointer" onClick={onCancel} />
        </DialogHeader>

        <div className="px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      name="firstName"
                      label="First Name"
                      type="text"
                      className="border border-gray-200 h-[52px]"
                      placeholder="Enter your firstname"
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      name="lastName"
                      label="Last Name"
                      type="text"
                      className="border border-gray-200 h-[52px]"
                      placeholder="Enter your lastname"
                      required
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <InputField
                    {...field}
                    name="phone"
                    label="Phone"
                    type="text"
                    className="border border-gray-200 h-[52px]"
                    placeholder="Enter your lastname"
                    required
                  />
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputField
                    {...field}
                    disabled
                    name="email"
                    label="Email"
                    type="email"
                    className="border border-gray-200 h-[52px]"
                    placeholder="Enter your email"
                    required
                  />
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="min-w-[150px] min-h-[52px] rounded-[50px] border border-black px-[30px] py-[10px] "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="min-w-[150px] min-h-[52px] rounded-[50px] border border-primary px-[30px] py-[10px] bg-primary text-white"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
