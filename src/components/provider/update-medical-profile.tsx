import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputElement from "@/components/Form/input-element";
import SelectElement from "@/components/Form/select-element";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMedicalLicenseSchema } from "@/schemas/medical-credentials-verification";
import { Form } from "@/components/ui/form";
import ClearSVG from "@/assets/icons/Clear";
import InsertIconSVG from "@/assets/icons/Insert";
import { stateOptions } from "./medical-credentials/verification-step1";
import { cn } from "@/lib/utils";
import type z from "zod";
import { useAcceptProviderMedicalCredentialsMutation } from "@/redux/services/provider";

interface AddMedicalLicenseDialogProps {
  openAddLicenseModal: boolean;
  setOpenLicenseModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddMedicalLicenseDialog({
  openAddLicenseModal,
  setOpenLicenseModal,
}: AddMedicalLicenseDialogProps) {
  const [acceptMedicalCredentials, { isLoading }] =
    useAcceptProviderMedicalCredentialsMutation();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(addMedicalLicenseSchema),

    defaultValues: {
      medicalLicense: [
        {
          state: "",
          licenseNumber: "",
        },
      ],

      deaLicense: [
        {
          state: "",
          registrationNumber: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "medicalLicense",
    control: form.control,
  });

  const {
    fields: deaFields,
    append: deaAppend,
    remove: deaRemove,
  } = useFieldArray({
    name: "deaLicense",
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof addMedicalLicenseSchema>) {
    console.log("Form Data:", data);
    const { deaLicense, medicalLicense } = form.getValues();
    const payload = {
      medicalLicenses: medicalLicense,
      deaNumbers: deaLicense,
    };
    await acceptMedicalCredentials(payload)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        form.reset();
        setOpenLicenseModal(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <Dialog open={openAddLicenseModal} onOpenChange={setOpenLicenseModal}>
      <DialogContent className="min-w-[600px]">
        <DialogHeader className="py-4 px-5 border-b border-card-border">
          <DialogTitle className="text-xl font-semibold text-black ">
            Medical Verification
          </DialogTitle>
          {/* <X className="cursor-pointer" onClick={onCancel} /> */}
        </DialogHeader>
        <div className="pb-6.5 px-7.5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-6 "
            >
              <div className="flex flex-col items-center max-h-[300px] overflow-y-auto">
                <div className="flex justify-between items-center w-[540px] pb-2">
                  <h6 className="font-semibold text-base">Medical License</h6>
                  <Button
                    type="button"
                    className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black mr-3"
                    onClick={() =>
                      append({
                        state: "",
                        licenseNumber: "",
                      })
                    }
                  >
                    <InsertIconSVG />
                    ADD LICENSE
                  </Button>
                </div>
                <div className=" flex flex-col gap-2">
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="bg-secondary relative flex w-[540px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                        key={field.id}
                      >
                        <SelectElement
                          name={`medicalLicense.${index}.state`}
                          options={stateOptions}
                          label="State"
                          placeholder="Select State"
                          triggerClassName="w-full min-h-[50px]"
                          className="w-[240px]"
                        />

                        <InputElement
                          name={`medicalLicense.${index}.licenseNumber`}
                          className="w-[240px]"
                          label="License Number"
                          messageClassName="text-right"
                          placeholder="Enter license number"
                          inputClassName="bg-white"
                        />

                        <button
                          className={cn(
                            "absolute right-2.5 top-2.5 cursor-pointer",
                            index === 0 && "hidden"
                          )}
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <ClearSVG />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center max-h-[300px] overflow-y-auto">
                <div className="flex justify-between items-center w-[540px] pb-2">
                  <h6 className="font-semibold text-base">DEA Number</h6>
                  <Button
                    type="button"
                    className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black mr-3"
                    onClick={() =>
                      deaAppend({
                        state: "",
                        registrationNumber: "",
                      })
                    }
                  >
                    <InsertIconSVG />
                    ADD NUMBER
                  </Button>
                </div>
                <div className=" flex flex-col gap-2">
                  {deaFields.map((field, index) => {
                    return (
                      <div
                        className="bg-secondary relative flex w-[540px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                        key={field.id}
                      >
                        <SelectElement
                          name={`deaLicense.${index}.state`}
                          options={stateOptions}
                          label="State"
                          placeholder="Select State"
                          triggerClassName="w-full min-h-[50px]"
                          className="w-[270px]"
                        />

                        <InputElement
                          name={`deaLicense.${index}.registrationNumber`}
                          className="w-[270px]"
                          label="License Number"
                          messageClassName="text-right"
                          placeholder="Enter license number"
                          inputClassName="bg-white"
                        />

                        <button
                          className={cn(
                            "absolute right-2.5 top-2.5 cursor-pointer",
                            index === 0 && "hidden"
                          )}
                          type="button"
                          onClick={() => deaRemove(index)}
                        >
                          <ClearSVG />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant={"transparent"}
                      size={"xl"}
                      className="min-w-[150px] "
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>

                <Button
                  type="submit"
                  variant={"ctrl"}
                  size={"xl"}
                  className="min-w-[150px]"
                  disabled={isLoading}
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// className="min-w-[520px] w-[520px] min-h-[446px] rounded-[15px] "
// className="flex px-[20px] py-[16px] justify-between items-center border border-b-gray-200 border-t-0 border-l-0 border-r-0"
